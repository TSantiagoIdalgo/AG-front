
import * as libs from '../libs/product-detail-libs';
import { ReactionType, Review, ReviewReaction, ReviewReactionBody } from '#src/common/interfaces/review.interface.ts';
import { IUserState } from '#src/state/store.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';

export const useSetReaction = (review: Review) => {
  const { callMutation } = libs.useMutation<ReviewReaction>(REVIEW_ENDPOINT.POST.setReaction());
  const [isLiked, setIsLiked] = libs.useState(review.reactionType === ReactionType.LIKE);
  const [isDisliked, setIsDisliked] = libs.useState(review.reactionType === ReactionType.DISLIKE);
  const [reactions, setReactions] = libs.useState(review.reactions);
  const user = libs.useSelector((state: IUserState) => state.user);


  const updateReactions = (email: string, newReactionType: ReactionType | null, newReaction: ReviewReaction) => {
    setReactions((prev) => {
      const filteredReactions = prev.filter((rr) => rr.user.email !== email);
      return newReactionType ? [...filteredReactions, newReaction] : filteredReactions;
    });
  };

  const handleReaction = async (reactionType: ReactionType, isActive: boolean, setState: (value: boolean) => void) => {
    try {
      const result = await callMutation<ReviewReactionBody>({ body: { reactionType, reviewId: review.id } });
      const { email } = user.data;
      if (reactionType === ReactionType.LIKE) setIsDisliked(false);
      else setIsLiked(false);
      setState(!isActive);
      updateReactions(email, isActive ? null : reactionType, result.body.data as ReviewReaction);
    } catch {
      setState(isActive);
    }
  };

  const handleLike = () => handleReaction(ReactionType.LIKE, isLiked, setIsLiked);
  const handleDislike = () => handleReaction(ReactionType.DISLIKE, isDisliked, setIsDisliked);

  return { handleDislike,  handleLike, isDisliked,  isLiked, reactions };
};