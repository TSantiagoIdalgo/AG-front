import * as libs from '#modules/landing/libs/landing-libs';
import React, { ChangeEvent, useCallback } from 'react';
import SearchIcon from '#assets/icons/search.svg';
import Style from './navbar-search.module.css';
import { debounce } from '#src/common/debounce.ts';
import { useChangeSearchParams } from '#src/hooks/use-change-search-params.ts';
import { useMediaWidth } from '#src/hooks/useMediaWidth.ts';


export default function LandingNavbarSearch (): React.JSX.Element {
  const { updateParams, searchParams, deleteParams } = useChangeSearchParams();
  const [searching, handleSearching] = libs.useState(Boolean(searchParams.has('name')));
  const [searchValue, setSearchValue] = libs.useState(searchParams.get('name') ?? '');
  const navigate = libs.useNavigate();
  const { isBelowWidth } = useMediaWidth(1024);
  const debounceTime = 200;

  const debouncedUpdate = libs.useRef(
    debounce((value: string) => {
      const newParams = updateParams({ name: value });
      navigate(`/catalogue?${newParams.toString()}`);
    }, debounceTime)
  );

  const deleteQuerys = () => {
    deleteParams([{ key: 'name' }]);
    handleSearching(!searching);
    setSearchValue('');
  };

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedUpdate.current(value);
  }, []);

  return (
    <div className={isBelowWidth ? Style.navbar_menu_query_response : Style.navbar_menu_query}>
      <input type="text" 
        autoComplete='off'
        onChange={onSearchChange}
        value={searchValue}
        name='search'
        className={searching ? Style.navbar_menu_searching : Style.navbar_menu_search}
        placeholder={searching ? 'Minecraft, RPG, multijugador...' : ''}/>
      <img src={SearchIcon} 
        hidden={searching} alt="search-icon" 
        className={Style.navbar_menu_search_icon}
        onClick={() => handleSearching(!searching)}/>
      <div 
        className={searching ? Style.navbar_menu_search_open : Style.navbar_menu_search_close}
        onClick={deleteQuerys}>+</div>
    </div>
  );
}