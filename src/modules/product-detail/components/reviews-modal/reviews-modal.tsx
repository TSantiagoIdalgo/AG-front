import React, { useRef, useState } from 'react';
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
import { useFindUserReview } from '#modules/product-detail/hooks/use-find-user-review.ts';

interface ReviewsmodalProps {
    handleModal: React.Dispatch<React.SetStateAction<boolean>>
    productId: string;
    userReviewed: boolean
}

const ReviewsModal: React.FC<ReviewsmodalProps> = ({ handleModal, productId, userReviewed }): React.JSX.Element => {
  const [recommended, setIsRecommended] = useState<boolean>(true);
  const userReview = useFindUserReview(productId, userReviewed);
  const { callMutation, isPending } = useMutation<Review>(REVIEW_ENDPOINT.POST.create(UUIDBase64.base64ToUuid(productId)));
  const {register, handleSubmit, formState: {errors, isValid}, setError} = useForm<ReviewSchemaType>({
    defaultValues: userReview,
    resolver: zodResolver(reviewSchema),
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  useOutClickExec(modalRef, () => {
    handleModal(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  });

  const onCreateReveiw = async (data: ReviewSchemaType) => {
    try {
      const payload = { comment: data.description, recommended, title: data.title };
      await callMutation({ body: payload });
      handleModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'INTERNAL_ERROR';
      setError('description', {message: errorMessage});
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.modal} ref={modalRef} role='dialog'>
        <form onSubmit={handleSubmit(onCreateReveiw)}>
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
          <PrimaryButton disabled={!isValid || isPending} text='Enviar reseña' type='submit' style={{width: '100%'}}/>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;