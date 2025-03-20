import DislikeIcon from '#assets/icons/icon-dislike.svg';
import LikeIcon from '#assets/icons/icon-like.svg';
import UserIcon from '#assets/icons/icon-user.svg';
import {useSetReaction} from '#modules/product-detail/hooks/use-set-reaction.ts';
import {ReactionType, Review} from '#src/common/interfaces/review.interface.ts';
import {IState} from '#src/state/store.ts';
import React from 'react';
import * as libs from '../../../libs/product-detail-libs';
import Style from './review-card.module.css';

const ReviewCard = ({review}: { review: Review }): React.JSX.Element => {
  const [showReview, handleShowReview] = libs.useState(false);
  const {handleLike, handleDislike, isLiked, reactions, isDisliked} = useSetReaction(review);
  const user = libs.useSelector((state: IState) => state.user);
  const countOfLikes = libs.useMemo(() => reactions.filter((rr) => rr?.reactionType === ReactionType.LIKE).length, [reactions]);
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('es-ES', {day: '2-digit', month: 'long', year: 'numeric'}).format(date);
  };

  const convertTextToSpans = (text: string) => {
    const lines = text.split(/\r?\n/u);
    return lines.map((line, index) => (
      <span className={Style.readable} key={index}>{line || '\u00A0'}</span>
    ));
  };
  return (
    <figure className={showReview ? Style.review_show : Style.review}>
      <div className={Style.left}>
        <a href={`/ancore/user/${review.user.email}`} className={Style.avatar}>
          <img src={UserIcon} alt={review.user.username}/>
        </a>
        <img src={review.recommended ? LikeIcon : DislikeIcon}
          className={review.recommended ? Style.like : Style.dislike}/>
      </div>
      <div className={Style.user_bloc}>
        <div className={showReview ? Style.review_text : Style.review_text_hidden}
          onClick={() => handleShowReview(!showReview)}>
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
            <button type="button" disabled={!user.data} className={isLiked ? Style.vote_like : Style.vote}
              onClick={handleLike}>
              <img src={LikeIcon} className={Style.like_blank}/>
              <span className={Style.positive}>{countOfLikes}</span>
            </button>
            <button type='button' disabled={!user.data} className={isDisliked ? Style.vote_dislike : Style.vote}
              onClick={handleDislike}>
              <img src={DislikeIcon} className={Style.like_blank}/>
            </button>
          </div>
        </div>
      </div>

    </figure>
  );
};

export default ReviewCard;