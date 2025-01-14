import * as libs from '../../libs/product-detail-libs';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from "react";
import { Review } from '#src/common/interfaces/review.interface.ts';
import ReviewCard from './review-card/review-card';
import Style from './reviews-detail.module.css';
import UUIDBase64 from '#src/common/uuid-base64.ts';

export default function ReviewsDetail (): React.JSX.Element {
  const { id } = libs.useParams();
  const { loading, data } = libs.useFetchData<Review[]>(REVIEW_ENDPOINT.GET.findByProduct(UUIDBase64.base64ToUuid(id as string)), {
    query: { recommended: true }
  });
  if (data?.status === 'NOT_FOUND') return <></>; 
  if (loading || !data?.body.data) return <p>Loading...</p>;
  return (
    <section className={Style.reviews_container}>
      <div className={Style.headline}>
        <h2>Reseñas</h2>
      </div>
      <div className={Style.reviews}>
        {data.body.data.map((review) => <ReviewCard  key={review.id} review={review}/>)}
      </div>
    </section>
  );
}


