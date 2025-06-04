import {Product} from '#src/common/interfaces/product.interface.ts';
import {AVGProductReview} from '#src/common/interfaces/review.interface.ts';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import {REVIEW_ENDPOINT} from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from '../../libs/product-detail-libs';
import AboutDetailInfo from '../about-detail-info/about-detail-info';
import Style from './about-detail.module.css';
import { scrollInToView } from '#modules/product-detail/utils/scroll-in-to-view.ts';

type TAboutDetail = Pick<Product, 'description' | 'genres' | 'developer' | 'tags' | 'distributor' | 'release_date' | 'pegi'>

export interface PercentageOfReviews {
  circleMeterBar: number;
  circleMeterBarId: string,
  reviewsRate: string
}

export default function AboutDetail({
  description,
  developer,
  genres,
  tags,
  distributor,
  release_date,
  pegi
}: TAboutDetail): React.JSX.Element {
  const {id} = libs.useParams();
  const tagsSet = libs.useMemo(() => new Set(tags).values().toArray(),[tags]);

  const [maxTags, setMaxTags] = libs.useState(5);
  const [circleMeter, setCircleMeter] = libs.useState<PercentageOfReviews>({
    circleMeterBar: 0,
    circleMeterBarId: '',
    reviewsRate: ''
  });
  const {
    data,
    loading
  } = libs.useFetchData<AVGProductReview>(REVIEW_ENDPOINT.GET.avgByProduct(UUIDBase64.base64ToUuid(id as string)));
  const dividePercentage = 10, high = 80, medium = 50, zero = 0;

  libs.useEffect(() => {
    (function getPercentage() {
      if (!data?.body.data || loading) return;
      else if (data.body.error) return;

      const {percentage} = data.body.data;
      const barId = percentage >= high && 'high' || percentage >= medium && 'medium' || '';

      setCircleMeter({circleMeterBar: percentage, circleMeterBarId: barId, reviewsRate: barId});
    })();
  }, [data]);

  const processTextWithLines = (text: string) => {
    const regex = /<<\s*(?<temp1>https?:\/\/[^\s]+)\s*>>/gu;
    const lines = text.split(/\r?\n/u);

    return lines.map((line, lineIndex) => {
      const parts = line.split(regex);
      return (
        <div key={lineIndex}>
          {parts.map((part, index) => {
            if (regex.test(`<<${part}>>`)) return <span key={`${lineIndex}-${index}`}></span>; 
            return <p key={`${lineIndex}-${index}`}>{part || '\u00A0'}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={Style.details}>
      <section className={Style.about}>
        <div>
          <div className={Style.headline}>
            <h2>Acerca de</h2>
          </div>
        </div>
        <div className={Style.text_readable}>
          {processTextWithLines(description)}
        </div>
        <span onClick={() => scrollInToView('description')} className={Style.show_more}>Leer mas</span>
        <div className={Style.user_tags}>
          <h2>Tags de usuario*:</h2>
          {tagsSet.map((tag) => tag.length > zero &&
            <a href={`/ancore/catalogue?name=${tag}`} title={tag} key={tag}>{tag}</a>).slice(zero, maxTags)}
          {tagsSet.length > maxTags && <span onClick={() => setMaxTags(tags.length)} className={Style.more_tags}>...</span>}
        </div>
      </section>
      <section className={Style.specifics}>
        <div className={Style.rating}>
          <div className='note-container'>
            <svg>
              <g id="circles" strokeWidth="2">
                <circle r="16" cx="18" cy="18" fill="none" className="circle-meter"></circle>
                <circle r="16" cx="18" cy="18" fill="none" strokeDasharray={`${circleMeter.circleMeterBar} 100`}
                  className="circle-meter-bar" id={circleMeter.circleMeterBarId}></circle>
              </g>
            </svg>
            <div className="rating-reviews-rate"
              id={`text-${circleMeter.reviewsRate}`}>{circleMeter.circleMeterBar / dividePercentage}</div>
          </div>
          <div className={Style.based}>
            <span>Basada en</span>
            <span className={Style.link}>{data?.body.data?.totalReviews || zero} reseñas</span>
          </div>
        </div>
        <AboutDetailInfo developer={developer} distributor={distributor} genres={genres} pegi={pegi}
          release_date={release_date}/>
      </section>
    </div>
  );
}