import * as libs from '../../libs/product-detail-libs';
import { AVGProductReview } from '#src/common/interfaces/review.interface.ts';
import AboutDetailInfo from "../about-detail-info/about-detail-info";
import { Product } from "#src/common/interfaces/product.interface.ts";
import { REVIEW_ENDPOINT } from '#src/config/endpoints.ts';
import React from "react";
import Style from './about-detail.module.css';
import UUIDBase64 from '#src/common/uuid-base64.ts';

type TAboutDetail = Pick<Product, "description" | 'genres' | 'developer' | 'tags' | 'distributor' | 'release_date' | 'pegi'>
interface PercentageOfReviews { circleMeterBar: number; circleMeterBarId: string, reviewsRate: string}

export default function AboutDetail({ description, developer, genres, tags, distributor, release_date, pegi }: TAboutDetail): React.JSX.Element {
  const { id } = libs.useParams();
  const [circleMeter, setCircleMeter] = libs.useState<PercentageOfReviews>({ circleMeterBar: 0, circleMeterBarId: '', reviewsRate: '' });
  const { data, loading } = libs.useFetchData<AVGProductReview>(REVIEW_ENDPOINT.GET.avgByProduct(UUIDBase64.base64ToUuid(id as string)));
  const dividePercetage = 10, high = 80, maxTag = 5, medium = 50, zero = 0;

  libs.useEffect(() => {
    (function getPercentage(){
      if (!data?.body.data || loading ) return;
      else if (data.body.error) return;
      
      const { percentage } = data.body.data;
      // eslint-disable-next-line no-nested-ternary
      const barId = percentage >= medium ? percentage >= high ? "high" : '' : "medium";

      setCircleMeter({ circleMeterBar: percentage, circleMeterBarId: barId, reviewsRate: barId });
    })();
  }, [data]);

  return (
    <div className={Style.details}>
      <section className={Style.about}>
        <div>
          <div className={Style.headline}>
            <h2>Acerca de</h2>
          </div>  
        </div>
        <div className={Style.text_readable}>
          {description}
        </div>
        <span className={Style.show_more}>Leer mas</span>
        <div className={Style.user_tags}>
          <h2>Tags de usuario*:</h2>
          {tags.map((tag) => tag.length > zero && <a href="#" title={tag} key={tag}>{tag}</a>).slice(zero, maxTag)}
          {tags.length > maxTag && <a href="#" className={Style.more_tags}>...</a>}
        </div>
      </section>
      <section className={Style.specifics}>
        <div className={Style.rating}>
          <div className='note-container'>
            <svg>
              <g id="circles" strokeWidth="2">
                <circle r="16" cx="18" cy="18" fill="none" className="circle-meter"></circle>
                <circle r="16" cx="18" cy="18" fill="none" strokeDasharray={`${circleMeter.circleMeterBar} 100`} className="circle-meter-bar" id={circleMeter.circleMeterBarId}></circle>
              </g>
            </svg>
            <div className="rating-reviews-rate" id={`text-${circleMeter.reviewsRate}`}>{circleMeter.circleMeterBar / dividePercetage}</div>
          </div>
          <div className={Style.based}>
            <span>Basada en</span>
            <span className={Style.link}>{data?.body.data?.totalReviews || zero} reseñas</span>
          </div>
        </div>
        <AboutDetailInfo developer={developer} distributor={distributor} genres={genres} pegi={pegi} release_date={release_date}/>
      </section>
    </div>
  );
}