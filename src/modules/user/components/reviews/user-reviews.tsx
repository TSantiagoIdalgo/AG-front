import { Review } from '#src/common/interfaces/review.interface.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import PrimaryButton from '#modules/core/components/button/button.tsx';
import LikeIcon from '#assets/icons/icon-like.svg';
import DislikeIcon from '#assets/icons/icon-dislike.svg';
import Style from './user-reviews.module.css';
import React from 'react';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import { useNavigate } from 'react-router-dom';

const UserReviews = (): React.JSX.Element => {
  const { data, loading } = useFetchData<Review[]>(REVIEW_ENDPOINT.GET.findUserReviews());
  const navigate = useNavigate();
  if (!data?.body || loading) return <p>LOADING...</p>;
  const reviews = data.body.data;
  
  return (
    <section className={Style.container}>
      <h2>{reviews?.length} opiniones publicadas</h2>
      <div className={Style.list_items}>
        {reviews?.map((review) => {
          const base64 = new UUIDBase64(review.product.id);
          return (
            <figure className={Style.item} key={review.id}>
              <a href={`/ancore/${base64.uuidToBase64()}`} className={Style.cover}>
                <picture>
                  <img src={review.product.mainImage} alt={review.title} />
                </picture>
                <video preload='none' autoPlay loop muted playsInline>
                  <source src={review.product.trailer} type='video/webm'/>
                </video>
              </a>
              <div className={Style.info}>
                {review.recommended 
                  ? <img src={LikeIcon} className={Style.note} id={Style.like} alt="note" /> 
                  : <img src={DislikeIcon} className={Style.note} id={Style.dislike} alt="note" />}
                <h2>{review.title}</h2>
                <PrimaryButton text='Cambiar mi reseña' type='button' onClick={() => navigate(`/${base64.uuidToBase64()}#write-review`)}/>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default UserReviews;