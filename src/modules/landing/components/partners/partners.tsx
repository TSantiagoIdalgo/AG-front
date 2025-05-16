import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import ReviewsSection from '../reviews-section/reviews-section';
import Style from './partners.module.css';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';

interface CountResponse {
  count: number
}

export default function Partners (): React.JSX.Element {
  const { loading, data } = useFetchData<CountResponse>(REVIEW_ENDPOINT.GET.count());
  
  return (
    <div className={Style.partners}>
      <section className={Style.container}>
        <figure className={Style.content}>
          <picture>
            <img src="https://www.instant-gaming.com/themes/igv2/modules/feedbackBox/images/partners-avatar2-es.png" loading='lazy' alt="avatar" />
          </picture>
        </figure>
        <div className={Style.text}>
          <img src="https://www.instant-gaming.com/themes/igv2/modules/feedbackBox/images/stars-rating2.svg" alt="stars" />
          <div className={Style.commnent}>
            <b className={Style.comment_b}>Instant Gaming es una plataforma increíble para comprar tus juegos de PC, PlayStation, Xbox y Switch más baratos. ¡Con entrega inmediata 24/7, juega al instante al precio más bajo!</b>
          </div>
          <a href="#" title='Comentarios de usuarios' className={Style.button}>
            <span>{ loading || data ? data?.body.data?.count : '...' }</span>
            <span>reseñas de usuarios</span>
          </a>
        </div>
      </section>
      <ReviewsSection/>
    </div>
  );
}