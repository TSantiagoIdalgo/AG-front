import React, { useEffect, useRef, useState } from 'react';
import Style from './reviews-modal.module.css';
import UserIcon from '#assets/icons/icon-user.svg';
import LikeIcon from '#assets/icons/icon-like.svg';
import DislikeIcon from '#assets/icons/icon-dislike.svg';
import PrimaryButton from '#modules/core/components/button/button.tsx';
import { useOutClick } from '#modules/catalogue/hooks/use-out-click.ts';

interface ReviewsmodalProps {
    handleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewsModal: React.FC<ReviewsmodalProps> = ({ handleModal }): React.JSX.Element => {
  const [recommended, setIsRecommended] = useState<boolean>(true);
  const [firstPaint, setFirstPaint] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const outClick = useOutClick(modalRef);
  useEffect(() => {
    if (firstPaint) setFirstPaint(false);
    else handleModal(outClick);
  }, [outClick]);
  return (
    <div className={Style.container}>
      <div className={Style.modal} ref={modalRef}>
        <form>
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
          <input type='text' className={Style.title_input}/>
          <textarea className={Style.textarea}></textarea>
          <PrimaryButton text='Enviar reseña' type='submit' style={{width: '100%'}}/>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;