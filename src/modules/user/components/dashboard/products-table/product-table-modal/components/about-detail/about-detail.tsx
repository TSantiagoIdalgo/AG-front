import {Product} from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import AboutDetailInfo from '../about-detail-info/about-detail-info';
import Style from './about-detail.module.css';
import { scrollInToView } from '#modules/product-detail/utils/scroll-in-to-view.ts';

type TAboutDetail = Pick<Product, 'description' | 'genres' | 'developer' | 'tags' | 'distributor' | 'release_date' | 'pegi' | 'id'>

export interface PercentageOfReviews {
  circleMeterBar: number;
  circleMeterBarId: string,
  reviewsRate: string
}

export default function AboutModalDetail({
  description,
  developer,
  genres,
  tags,
  distributor,
  release_date,
  pegi
}: TAboutDetail): React.JSX.Element {
  const  maxTag = 5, zero = 0;


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
          {tags.map((tag) => tag.length > zero &&
            <a href={`/ancore/catalogue?name=${tag}`} title={tag} key={tag}>{tag}</a>).slice(zero, maxTag)}
          {tags.length > maxTag && <a href="#" className={Style.more_tags}>...</a>}
        </div>
      </section>
      <section className={Style.specifics}>
        <AboutDetailInfo developer={developer} distributor={distributor} genres={genres} pegi={pegi}
          release_date={release_date}/>
      </section>
    </div>
  );
}