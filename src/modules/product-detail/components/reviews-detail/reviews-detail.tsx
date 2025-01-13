import * as libs from '../../libs/product-detail-libs';
import DislikeIcon from '#assets/icons/icon-dislike.svg';
import LikeIcon from '#assets/icons/icon-like.svg';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from "react";
import { Review } from '#src/common/interfaces/review.interface.ts';
import Style from './reviews-detail.module.css';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import UserIcon from '#assets/icons/icon-user.svg';
import { useSetReaction } from '#modules/product-detail/hooks/use-set-reaction.ts';

export default function ReviewsDetail (): React.JSX.Element {
  const { id } = libs.useParams();
  const [showReview, handleShowReview] = libs.useState(false);
  const { handleLike, isLiked, mutation } = useSetReaction();
  const { loading, data } = libs.useFetchData<Review[]>(REVIEW_ENDPOINT.GET.findByProduct(UUIDBase64.base64ToUuid(id as string)), {
    query: { recommended: true }
  });
  if (data?.status === 'NOT_FOUND') return <></>; 
  if (loading || !data?.body.data) return <p>Loading...</p>;

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  const convertTextToSpans = (text: string) => {
    const lines = text.split(/\r?\n/u);
    return lines.map((line, index) => (
      <span className={Style.readable} key={index}>{line || '\u00A0'}</span>
    ));
  };
  console.log(isLiked, mutation);
  return (
    <section className={Style.reviews_container}>
      <div className={Style.headline}>
        <h2>Reseñas</h2>
      </div>
      <div className={Style.reviews}>
        {data.body.data.map((review) => (
          <figure key={review.id} className={showReview ? Style.review_show : Style.review}>
            <div className={Style.left}>
              <a href={`/ancore/user/${review.user.email}`} className={Style.avatar}>
                <img src={UserIcon} alt={review.user.username}/>
              </a>
              <img src={review.recommended ? LikeIcon : DislikeIcon} className={review.recommended ? Style.like : Style.dislike}/>
            </div>
            <div className={Style.user_bloc}>
              <div className={showReview ? Style.review_text : Style.review_text_hidden} onClick={() => handleShowReview(!showReview)}>
                {convertTextToSpans(review.comment)}
              </div>
            </div>
            <div className={Style.user}>
              <span className={Style.text}>
                <span>{formatDate(review.createdAt.toString())}</span>
              </span>
              <div className={Style.usefull}>
                <div className={Style.ask}>¿Te ha resultado útil?</div>
                <div className={Style.votes}>
                  <a href="#" className={Style.vote} onClick={() => handleLike(review.id, true)}>
                    <img src={LikeIcon} className={Style.like_blank}/>
                    <span className={Style.positive}>0</span>
                  </a>
                  <a href="#" className={Style.vote} onClick={() => handleLike(review.id, false)}>
                    <img src={DislikeIcon} className={Style.like_blank}/>
                  </a>
                </div>
              </div>
            </div>
            
          </figure>
        ))}
      </div>
    </section>
  );
}