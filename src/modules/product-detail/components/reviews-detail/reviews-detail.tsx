import * as libs from '../../libs/product-detail-libs';
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from "react";
import { Review } from "#src/common/interfaces/review.interface.ts";
import Style from './reviews-detail.module.css';

export default function ReviewsDetail (): React.JSX.Element {
  const productId = window.sessionStorage.getIem("productId");
  const { loading, data } = libs.useFetchData<Review>(REVIEW_ENDPOINT.GET.findByProduct(productId as string), {
    query: { recommended: true }
  });

  if (loading || !data?.body.data) return <p>Loading...</p>;
  
  return (
    <section className={Style.reviews_container}>
        
    </section>
  );
}