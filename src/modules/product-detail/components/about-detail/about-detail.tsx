import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './about-detail.module.css';

type TAboutDetail = Pick<Product, "description" | 'genres' | 'developer' | 'tags'>

export default function AboutDetail({ description, developer, genres, tags }: TAboutDetail): React.JSX.Element {
  const IsMinLength =  1, genresLength = genres.length - IsMinLength, maxTag = 5, minTag = 0;

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
        <div className={Style.specifics_text}>
          <span className={Style.specifics_text_title}>Desarrollador:</span>
          <span className={Style.specifics_value}>{developer}</span>
        </div>
        <div className={Style.specifics_text}>
          <span className={Style.specifics_text_title}>Distribuidor:</span>
          <span className={Style.specifics_value}>{developer}</span>
        </div>
        <div className={Style.specifics_text}>
          <span className={Style.specifics_text_title}>Genero:</span>
          <span className={Style.specifics_value_genres}>{genres.map((genre, index) => <i key={genre.name}>{genre.name}{index < genresLength? "," : ""}</i>)}</span>
        </div>
      </section>
    </div>
  );
}