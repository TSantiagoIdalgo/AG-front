import AboutDetailInfo from "../about-detail-info/about-detail-info";
import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './about-detail.module.css';

type TAboutDetail = Pick<Product, "description" | 'genres' | 'developer' | 'tags' | 'distributor' | 'release_date' | 'pegi'>

export default function AboutDetail({ description, developer, genres, tags, distributor, release_date, pegi }: TAboutDetail): React.JSX.Element {
  const maxTag = 5, minTag = 0;
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
          {tags.map((tag) => tag.length > minTag && <a href="#" title={tag} key={tag}>{tag}</a>).slice(minTag, maxTag)}
          {tags.length > maxTag && <a href="#" className={Style.more_tags}>...</a>}
        </div>
      </section>
      <section className={Style.specifics}>
        <div className={Style.rating}>
          <div className='note-container'>
            <svg>
              <g id="circles" strokeWidth="2">
                <circle r="16" cx="18" cy="18" fill="none" className="circle-meter"></circle>
                <circle r="16" cx="18" cy="18" fill="none" strokeDasharray="0 100" className="circle-meter-bar"></circle>
              </g>
            </svg>
            <div className="rating-reviews-rate">0</div>
          </div>
          <div className={Style.based}>
            <span>Basada en</span>
            <span className={Style.link}>0 reseñas</span>
          </div>
        </div>
        <AboutDetailInfo developer={developer} distributor={distributor} genres={genres} pegi={pegi} release_date={release_date}/>
      </section>
    </div>
  );
}

