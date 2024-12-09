import * as libs from '../../libs/landing-libs';
import { REVIEW_ENDPOINT } from "#src/config/endpoints.ts";
import React from "react";
import Style from "./last-reviews.module.css";

export default function LastReveiws(): React.JSX.Element {
  const { loading, data, error } = libs.useFetchData(REVIEW_ENDPOINT.GET_FIND_ALL, {
    query: {  orderByCreatedAt: true, pageNumber: 0, pageSize: 4 }
  });

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: { error.message }</p>;

  return (
    <section className={Style.last_reviews}>
        
    </section>
  );
}