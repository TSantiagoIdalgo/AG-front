import * as libs from '#modules/landing/libs/landing-libs';
import React, { ChangeEvent, useCallback } from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './navbar-search.module.css';
import { debounce } from '#src/common/debounce.ts';
import { useChangeSearchParams } from '#src/hooks/use-change-search-params.ts';


export default function LandingNavbarSearch (): React.JSX.Element {
  const { updateParams, searchParams, setSearchParams } = useChangeSearchParams();
  const [searching, handleSearching] = libs.useState(false);
  const [searchValue, setSearchValue] = libs.useState(searchParams.get("name") ?? "");
  const navigate = libs.useNavigate();
  const debounceTime = 200, initNameLength = 0;
  
  const debouncedUpdate = libs.useRef(
    debounce((value: string) => {
      const tag = value.split(" ").filter((val) => val.trim().length > initNameLength);
      const newParams = updateParams({ name: value, tag });
      navigate(`/catalogue?${newParams.toString()}`);
    }, debounceTime)
  );

  const deleteQuerys = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("tags");
    newParams.delete("name");
    setSearchParams(newParams);
    handleSearching(!searching);
    setSearchValue("");
  };

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedUpdate.current(value);
  }, []);

  return (
    <div className={Style.navbar_menu_query}>
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