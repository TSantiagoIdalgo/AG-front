import * as libs from '../../libs/landing-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import NotRecommendedIcon from '#assets/icons/icon-dislike.svg';
import { REVIEW_ENDPOINT } from "#src/config/endpoints.ts";
import React from "react";
import RecommendedIcon from '#assets/icons/icon-like.svg';
import { Review } from '#src/common/interfaces/review.interface.ts';
import Style from "./last-reviews.module.css";
import UserIcon from '#assets/icons/icon-user.svg';
import arowLeft from '#assets/icons/icon-arrow.svg';

export default function LastReveiws(): React.JSX.Element {
  const [onMouseEnter, setOnMouseEnter] = libs.useState(false);
  const { loading, data, error } = libs.useFetchData<DataResponse<Review>>(REVIEW_ENDPOINT.GET_FIND_ALL, {
    query: {  orderByCreatedAt: true, pageNumber: 0, pageSize: 4 }
  });

  const mouseEnter = () => setOnMouseEnter(!onMouseEnter);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: { error.message }</p>;

  return (
    <div className={Style.container}>
      <div className={Style.trends_title}>
        <h2 className={Style.title}>Últimas reseñas</h2>
        <img src={arowLeft} alt='arrow'/>
      </div>
      <section className={Style.last_reviews}>
        {data.body.data?.content.map((review) => (
          <figure key={review.id} className={Style.review}>
            <a href={`/ancore/${review.id}`} className={Style.card_url} onMouseEnter={mouseEnter} onMouseLeave={mouseEnter}>
              <img src={review.product.mainImage} alt={review.product.name} className={Style.card_img}/>
              <video preload='none' loop autoPlay muted playsInline className={Style.card_video}>
                <source src={review.product.trailer} type='video/webm'/>
              </video>
            </a>
            <div className={Style.user_action}>
              <img src={UserIcon} alt="user" className={Style.user}/>
              <img className={review.recommended ? Style.isRecommended : Style.notRecommended} src={review.recommended ? RecommendedIcon : NotRecommendedIcon} alt='likeOrDislike'/>
            </div>
            <p className={Style.review_readable}>{review.comment}</p>
          </figure>
        ))}
      </section>
    </div>
  );
}