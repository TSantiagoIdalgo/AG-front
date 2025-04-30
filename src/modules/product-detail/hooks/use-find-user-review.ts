import { Review } from '#src/common/interfaces/review.interface.ts';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import { useMutation } from '#src/hooks/use-mutation-data.ts';
import { useEffect } from 'react';

export const useFindUserReview = (productId: string, userReviewed: boolean) => {
  const { callMutation: getUserReview, mutation } = useMutation<Review>(REVIEW_ENDPOINT.GET.findUserReviewByProductId(productId));
  
  useEffect(() => {
    (async function () {
      if (productId || !userReviewed) {
        await getUserReview();
      }
    })();
  }, [productId, userReviewed]);
  
  const userReview = { 
    description: mutation.data?.body.data?.comment,
    title: mutation.data?.body.data?.title, 
  };
  
  return userReview;
};