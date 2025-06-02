import * as libs from '../../libs/catalogue-libs';
import { GENRE_ENDPOINT, PLATFORM_ENDPOINT } from '#src/config/endpoints.ts';
import { Genre, Platform } from '#src/common/interfaces/product.interface.ts';
import { FilterObject } from '../../interfaces/catalogue.interface';
import FiltersDropdown from './filters-dropdown/filters-dropdown';
import FiltersGenreDropdown from './filters-genre-dropdown/filters-genre-dropdown';
import FiltersPrice from './filters-price/filters-price';
import React from 'react';
import Style from './filters-catalogue.module.css';
import { getOrdersTypes } from '#modules/catalogue/hooks/get-orders-types.ts';

export default function FiltersCatalogue(): React.JSX.Element {
  const { data: genres } = libs.useFetchData<Genre[]>(GENRE_ENDPOINT.GET.findAll());
  const { data: platform } = libs.useFetchData<Platform[]>(PLATFORM_ENDPOINT.GET.findAll());
  const ordersTypes = getOrdersTypes();
  const skeleton = Array.from({ length: 10 }, () => '');

  const platformSet = new Set(platform?.body.data?.map((plat) => plat.name) || skeleton);
  const systemSet = new Set(platform?.body.data?.map((sys) => sys.platform) || skeleton);

  const platforms: FilterObject[] = Array.from(platformSet).map((plat) => ({ value: plat, visualString: plat }));
  const systems: FilterObject[] = Array.from(systemSet).map((sys) => ({ value: sys, visualString: sys }));
  const genresString = genres?.body.data?.map((genre) => genre.name) || skeleton;

  return (
    <div className={Style.filters}>
      <form name="filters" className={Style.filters_form}>
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
          <FiltersDropdown
            name="Sistemas" 
            results={systems}
            type='system'
          />
          <FiltersDropdown
            name="Plataformas" 
            results={platforms}
            type='platform'
          />
          <FiltersGenreDropdown
            results={genresString}
            name='Generos'
          />
          <FiltersDropdown
            results={ordersTypes}
            name='Ordenar por:'
            type='orderBy'
          />
        </div>
        <FiltersPrice/>
      </form>
    </div>
  );
}