import * as libs from '../libs/product-detail-libs';
import { ReactionType, Review, ReviewReactionBody } from '#src/common/interfaces/review.interface.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';

export const useSetReaction = () => {
  const [isLiked, setIsLiked] = libs.useState(false);
  const { callMutation, mutation } = libs.useMutation<Review>(REVIEW_ENDPOINT.POST.setReaction());

  const handleLike = async (reviewId: string, isLike: boolean) => {
    setIsLiked(true);
    try {
      await callMutation<ReviewReactionBody>({ body: { reactionType: isLike ? ReactionType.LIKE : ReactionType.DISLIKE, reviewId } }); 
    } catch {
      setIsLiked(false);
    }
  };

  return { handleLike, isLiked, mutation };
};