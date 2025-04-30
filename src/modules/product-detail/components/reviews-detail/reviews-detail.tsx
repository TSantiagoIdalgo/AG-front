 
import * as libs from '../../libs/product-detail-libs';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import { AVGProductReview, Review } from '#src/common/interfaces/review.interface.ts';
import ReviewCard from './review-card/review-card';
import Style from './reviews-detail.module.css';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import { PercentageOfReviews } from '../about-detail/about-detail';
import PrimaryButton from '#modules/core/components/button/button.tsx';

interface ReviewsDetailProps {
  isPurchased: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>
  reviews: Review[]
}

export default function ReviewsDetail ({ isPurchased, handleModal, reviews, setReviews }: ReviewsDetailProps): React.JSX.Element {
  const { id } = libs.useParams();
  const [originalReviews, setOriginalReviews] = libs.useState<Review[]>([]);
  const reviewsChange = JSON.stringify(reviews) !== JSON.stringify(originalReviews);
  const dividePercentage = 10, high = 80, medium = 50, zero = 0;
  const [circleMeter, setCircleMeter] = libs.useState<PercentageOfReviews>({
    circleMeterBar: 0,
    circleMeterBarId: '',
    reviewsRate: ''
  });
  const { data: avg, refetch } = libs.useFetchData<AVGProductReview>(REVIEW_ENDPOINT.GET.avgByProduct(UUIDBase64.base64ToUuid(id as string)));
  const { loading, data: reviewsResponse } = libs.useFetchData<Review[]>(REVIEW_ENDPOINT.GET.findByProduct(UUIDBase64.base64ToUuid(id as string)));

  libs.useEffect(() => {
    if (reviewsResponse?.body.data) {
      setReviews(reviewsResponse.body.data);
      setOriginalReviews(reviewsResponse.body.data);
    }
    if (reviewsChange) refetch();
  }, [reviewsResponse, reviewsChange]);

  libs.useEffect(() => {
    (function getPercentage() {
      if (!avg?.body.data || loading) return;
      else if (avg.body.error) return;
  
      const {percentage} = avg.body.data;
      const barId = percentage >= high && 'high' || percentage >= medium && 'medium' || '';
      setCircleMeter({circleMeterBar: percentage, circleMeterBarId: barId, reviewsRate: barId});
    })();
  }, [avg]);
  

  return (
    <section className={Style.reviews_container}>
      <div className={Style.headline}>
        <h2>Reseñas</h2>
      </div>
      <div className={Style.review} id='reviews'>
        {avg?.body.data
          ? (
            <>
              <div className={Style.rating}>
                <div id='note-container'>
                  <svg viewBox='0 0 36 36'>
                    <g id="circles" strokeWidth="2">
                      <circle r="16" cx="18" cy="18" fill="none" className="circle-meter"></circle>
                      <circle r="16" cx="18" cy="18" fill="none" strokeDasharray={`${circleMeter.circleMeterBar} 100`}
                        className="circle-meter-bar" id={circleMeter.circleMeterBarId}></circle>
                    </g>
                  </svg>
                  <div className="rating-reviews-rate"
                    id={`text-${circleMeter.reviewsRate}`}>{circleMeter.circleMeterBar / dividePercentage}</div>
                </div>
              </div>
              <div className={Style.based}>
                <span>Puntuación media de las reseñas</span>
                <span className={Style.link}>Basada en {avg?.body.data?.totalReviews || zero}  reseñas, todos los idiomas incluidos</span>
              </div>
            </>
          ) : <span>No hay suficientes reseñas para calcular la puntuación</span>}
        {isPurchased ? (<PrimaryButton onClick={() => handleModal(true)} text='¡Valora este juego!' type='button' style={{marginLeft: '40px'}}/>) : null}
      </div>
      <div className={Style.reviews}>
        {reviews.map((review) => <ReviewCard  key={review.id} review={review}/>)}
      </div>
    </section>
  );
}


