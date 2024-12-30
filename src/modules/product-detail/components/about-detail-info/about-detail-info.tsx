import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './about-detail-info.module.css';

type TAboutDetailInfo = Pick<Product, "genres" | "pegi" | "developer" | "distributor" | 'release_date'>

export default function AboutDetailInfo({ developer, distributor, genres, pegi, release_date}: TAboutDetailInfo): React.JSX.Element {
  const IsMinLength =  1, genresLength = genres.length - IsMinLength;
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };
  return (<>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Puntuacion:</span>
      <span className={Style.specifics_text_blank_title}>PEGI {pegi}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Desarrollador:</span>
      <span className={Style.specifics_value}>{developer}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Distribuidor:</span>
      <span className={Style.specifics_value}>{distributor}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Fecha de lanzamiento:</span>
      <span className={Style.specifics_text_blank_title}>{formatDate(release_date)}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Genero:</span>
      <span className={Style.specifics_value_genres}>{genres.map((genre, index) => <i key={genre.name}>{genre.name}{index < genresLength? "," : ""}</i>)}</span>
    </div>
  </>
  );
};