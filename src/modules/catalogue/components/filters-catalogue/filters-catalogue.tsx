import * as libs from '../../libs/catalogue-libs';
import { GENRE_ENDPOINT, PLATFORM_ENDPOINT } from '#src/config/endpoints.ts';
import { Genre, Platform } from '#src/common/interfaces/product.interface.ts';
import FiltersDropdown from './filters-dropdown/filters-dropdown';
import FiltersGenreDropdown from './filters-genre-dropdown/filters-genre-dropdown';
import React from "react";
import Style from './filters-catalogue.module.css';


export default function FiltersCatalogue(): React.JSX.Element {
  const { data: genres } = libs.useFetchData<Genre[]>(GENRE_ENDPOINT.GET.findAll());
  const { data: platform, loading } = libs.useFetchData<Platform[]>(PLATFORM_ENDPOINT.GET.findAll());
  if (!platform?.body.data || !genres?.body.data || loading) return <p></p>;

  const platforms = Array.from(new Set(platform?.body.data.map((plat) => plat.name)));
  const systems = Array.from(new Set(platform?.body.data.map((plat) => plat.platform)));
  const genresString = genres.body.data.map((genre) => genre.name);
  return (
    <div className={Style.filters}>
      <form name="filters">
        <div className={Style.seach_title}>
          <FiltersDropdown
            name="Sistemas" 
            results={systems}
          />
          <FiltersDropdown
            name="Plataformas" 
            results={platforms}
          />
          <FiltersGenreDropdown
            results={genresString}
            name='Generos'
          />
        </div>
      </form>
    </div>
  );
}