import * as libs from '#modules/landing/libs/landing-libs';
import React, { ChangeEvent } from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './navbar-search.module.css';
import { debounce } from '#src/common/debounce.ts';


export default function LandingNavbarSearch (): React.JSX.Element {
  const [searching, handleSearching] = libs.useState(false);
  const [searchValue, setSearchValue] = libs.useState("");
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const debounceTime = 200;
  const debouncedUpdate = libs.useRef(
    debounce((value) => {
      if (!searchParams.has("name")) searchParams.append("name", value);
      searchParams.set("name", value);
      setSearchParams(searchParams);
    }, debounceTime)
  );

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  libs.useEffect(() => {
    debouncedUpdate.current(searchValue);
  }, [searchValue]);

  return (
    <div className={Style.navbar_menu_query}>
      <input type="text" 
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
        onClick={() => handleSearching(!searching)}>+</div>
    </div>
  );
}