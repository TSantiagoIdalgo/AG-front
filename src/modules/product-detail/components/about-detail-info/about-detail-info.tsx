import { Genre, Product } from '#src/common/interfaces/product.interface.ts';
import React, { useMemo } from 'react';
import Style from './about-detail-info.module.css';

type TAboutDetailInfo = Pick<Product, 'genres' | 'pegi' | 'developer' | 'distributor' | 'release_date'>

export default function AboutDetailInfo({ developer, distributor, genres, pegi, release_date}: TAboutDetailInfo): React.JSX.Element {
  const IsMinLength =  1, genresLength = genres.length - IsMinLength;
  const formatDate = (dateTime: string) => {
    const date = new Date(`${dateTime  }T12:00:00` );
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };
  const genresSet: Genre[] = useMemo(() => new Set(genres.map(genre => genre.name)).values().map(genre => ({ name: genre })).toArray(),[genres]);

  return (<>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Puntuacion:</span>
      <span className={Style.specifics_text_blank_title}>PEGI {pegi}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Desarrollador:</span>
      <a href={`/ancore/catalogue?developer=${developer}`} className={Style.specifics_value}>{developer}</a>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Distribuidor:</span>
      <a href={`/ancore/catalogue?distributor=${distributor}`} className={Style.specifics_value}>{distributor}</a>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Fecha de lanzamiento:</span>
      <span className={Style.specifics_text_blank_title}>{formatDate(release_date)}</span>
    </div>
    <div className={Style.specifics_text}>
      <span className={Style.specifics_text_title}>Genero:</span>
      <span className={Style.specifics_value_genres}>{genresSet.map((genre, index) => <a href={`/ancore/catalogue?genre=${genre.name}`} key={genre.name}>{genre.name}{index < genresLength? ',' : ''}</a>)}</span>
    </div>
  </>
  );
};