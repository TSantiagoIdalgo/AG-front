import { Product } from '#src/common/interfaces/product.interface.ts';
import React, { useState } from 'react';
import Style from './about-detail-info.module.css';

type TAboutDetailInfo = Pick<Product, 'genres' | 'pegi' | 'developer' | 'distributor' | 'release_date' | 'franchise'> & {
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export default function AboutDetailInfo({ developer, distributor, genres, pegi, release_date, setProductState, franchise }: TAboutDetailInfo) {
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  const [editing, setEditing] = useState({
    developer: false,
    distributor: false,
    franchise: false,
    genres: false,
    pegi: false,
    release_date: false,
  });

  const [localGenres, setLocalGenres] = useState(genres.map(g => g.name).join(', '));

  const handleChange = (field: string, value: unknown) => {
    setProductState(prev => ({
      ...prev,
      [field]: value
    }) as Product);
  };

  const handleGenresChange = (value: string) => {
    setLocalGenres(value);
    if (value.includes(',')) {
      const parts = value.split(',').map(s => s.trim()).filter(Boolean);
      const genreObjects = parts.map(name => ({ name }));
      setProductState(prev => ({ ...prev, genres: genreObjects }) as Product);
    }
  };

  return (
    <>
      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Puntuacion:</span>
        {editing.pegi ? (
          <input
            type="number"
            value={pegi}
            onChange={e => handleChange('pegi', e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, pegi: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_text_blank_title}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, pegi: true })), 100)}
          >PEGI {pegi}</span>
        )}
      </div>

      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Desarrollador:</span>
        {editing.developer ? (
          <input
            value={developer}
            onChange={e => handleChange('developer', e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, developer: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_value}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, developer: true })), 100)}
          >{developer}</span>
        )}
      </div>

      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Distribuidor:</span>
        {editing.distributor ? (
          <input
            value={distributor}
            onChange={e => handleChange('distributor', e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, distributor: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_value}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, distributor: true })), 100)}
          >{distributor}</span>
        )}
      </div>

      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Fecha de lanzamiento:</span>
        {editing.release_date ? (
          <input
            type="date"
            value={release_date}
            onChange={e => handleChange('release_date', e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, release_date: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_text_blank_title}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, release_date: true })), 100)}
          >{formatDate(release_date)}</span>
        )}
      </div>

      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Genero:</span>
        {editing.genres ? (
          <input
            value={localGenres}
            onChange={e => handleGenresChange(e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, genres: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_value_genres}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, genres: true })), 100)}
          >{localGenres}</span>
        )}
      </div>
      <div className={Style.specifics_text}>
        <span className={Style.specifics_text_title}>Franquicia:</span>
        {editing.franchise ? (
          <input
            value={franchise}
            onChange={e => handleChange('franchise', e.target.value)}
            onBlur={() => setTimeout(() => setEditing(prev => ({ ...prev, franchise: false })), 100)}
            autoFocus
          />
        ) : (
          <span
            className={Style.specifics_value}
            onClick={() => setTimeout(() => setEditing(prev => ({ ...prev, franchise: true })), 100)}
          >{franchise}</span>
        )}
      </div>
    </>
  );
}
