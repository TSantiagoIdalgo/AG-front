import * as libs from '../../libs/landing-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import { Review } from '#src/common/interfaces/review.interface.ts';
import Style from './reviews-section.module.css';
import UserIcon from '#assets/icons/icon-user.svg';


export default function ReviewsSection (): React.JSX.Element {
  const { loading, data, error } = libs.useFetchData<DataResponse<Review>>(REVIEW_ENDPOINT.GET_FIND_ALL, {
    query: { orderByCreatedAt: false, pageNumber: 0, pageSize: 5 }
  });

  const formatDate = (date: Date) => {
    const startDate = new Date(date);
    const currentDate = new Date();
    const differenceMs = currentDate.getTime() - startDate.getTime();

    const day = 24, hour = 60, minute = 60, one = 1, secondInMs = 1000, zero = 0;

    const seconds = Math.floor(differenceMs / secondInMs);
    const minutes = Math.floor(seconds / hour);
    const hours = Math.floor(minutes / minute);
    const days = Math.floor(hours / day);

    if (days > one) return `Hace ${days} dias`;
    else if (days > zero) return "Ayer";
    return `Hace ${hours} horas`;

  };

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: { error.message } </p>;
  return (
    <section className={Style.reviews}>
      {data.body.data?.content.map((review) => (
        <figure key={review.id} className={Style.review}>
          <div className={Style.user}>
            <img src={UserIcon} alt='user'/>
            <div className={Style.info}>
              <div className={Style.stars}></div>
              <a href='#' className={Style.name}>{review.product.name}</a>
            </div>
          </div>
          <div className={Style.text_readable}>
            {review.comment}
          </div>
          <span className={Style.time}>{formatDate(review.createdAt)}</span>
        </figure>
      ))}
    </section>
  );
}