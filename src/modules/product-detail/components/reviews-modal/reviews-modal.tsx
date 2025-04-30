/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from 'react';
import Style from './reviews-modal.module.css';
import UserIcon from '#assets/icons/icon-user.svg';
import LikeIcon from '#assets/icons/icon-like.svg';
import DislikeIcon from '#assets/icons/icon-dislike.svg';
import PrimaryButton from '#modules/core/components/button/button.tsx';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { useForm } from 'react-hook-form';
import { reviewSchema, ReviewSchemaType } from '#modules/product-detail/schemas/review-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '#src/hooks/use-mutation-data.ts';
import { Review } from '#src/common/interfaces/review.interface.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import UUIDBase64 from '#src/common/uuid-base64.ts';

interface ReviewsmodalProps {
    handleModal: React.Dispatch<React.SetStateAction<boolean>>
    productId: string;
    userReviewed: boolean
    reviews: Review[],
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>
}

const ReviewsModal: React.FC<ReviewsmodalProps> = ({ handleModal, productId, userReviewed, reviews, setReviews }): React.JSX.Element => {
  const [review, setReview] = useState<Review>();
  const [recommended, setIsRecommended] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const id = UUIDBase64.base64ToUuid(productId);
  const { callMutation: createReview, isPending: isPendingCreate } = useMutation<Review>(REVIEW_ENDPOINT.POST.create(id));
  const { callMutation: updateReview, isPending: isPendingUpdate } = useMutation<Review>(REVIEW_ENDPOINT.PATCH.update(), {
    method: 'PATCH'
  });
  const { callMutation: getUserReview } = useMutation<Review>(REVIEW_ENDPOINT.GET.findUserReviewByProductId(id), {
    method: 'GET'
  });
  const getDefaultValues = async () => {
    const response = await getUserReview<Review>();
    const userReview = response.body.data as Review;
    setReview(userReview);
    if (!userReview) return { description: '', recommended: true , title: '' };
    return { description: userReview?.comment, recommended: userReview.recommended , title: userReview?.title };
  };
  const {register, handleSubmit, formState: {errors, isValid}, setError} = useForm<ReviewSchemaType>({ 
    defaultValues: getDefaultValues,
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    if (review) setIsRecommended(review.recommended);
  }, [review]);

  useOutClickExec(modalRef, () => {
    handleModal(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  });

  const onSaveReview = async (data: ReviewSchemaType) => {
    try {
      const payload = { comment: data.description, recommended, title: data.title };

      if (userReviewed) {
        const res = await updateReview({ body: payload, params: { reviewId: review?.id } });
        const updatedReview = res.body.data as Review;
        const reviewIndex = reviews.findIndex(reviewIteration => reviewIteration.id === updatedReview.id);

        setReviews(prev => {
          const notFoundIndex = -1;
          if (reviewIndex !== notFoundIndex) {
            const updated = structuredClone(prev);
            updated[reviewIndex] = updatedReview;
            return updated;
          }
          return prev;
        });
      } else {
        const res = await createReview({ body: payload });
        const newReview = res.body.data as Review;
        // TODO no hace el concat correctamente
        setReviews([...reviews, newReview]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'INTERNAL_ERROR';
      setError('description', { message: errorMessage });
    } finally {
      handleModal(false);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.modal} ref={modalRef} role='dialog'>
        <form onSubmit={handleSubmit(onSaveReview)}>
          <div className={Style.avatar}>
            <img src={UserIcon} alt="user" />
          </div>
          <h2>Da tu opinion</h2>
          <span>Esta sección te permite opinar sobre el juego después de probarlo. Puedes hablar sobre lo que te ha gustado y que no.</span>
          <div className={Style.likeOrDislike}>
            <div className={Style.button} onClick={() => setIsRecommended(true)}>
              <img src={LikeIcon} alt="like" id={recommended ? Style.active_like : Style.none}/>
            </div>
            <div className={Style.button} onClick={() => setIsRecommended(false)}>
              <img src={DislikeIcon} alt="dislike" id={recommended ? Style.none : Style.active_dislike}/>
            </div>
          </div>
          <div className={Style.title}>
            <input {...register('title')} type='text' className={Style.title_input} placeholder='Titulo de tu reseña'/>
            <span className={Style.title_error}>{errors.title?.message}</span>
          </div>
          <textarea {...register('description')} className={Style.textarea} placeholder='Descripcion...'></textarea>
          {errors.description && <span>{errors.description.message}</span>}
          <PrimaryButton 
            disabled={!isValid || isPendingCreate || isPendingUpdate} 
            text='Enviar reseña' 
            type='submit' 
            style={{width: '100%'}}/>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;