import * as libs from '#modules/landing/libs/landing-libs';
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './navbar-search.module.css';


export default function LandingNavbarSearch (): React.JSX.Element {
  const [searching, handleSearching] = libs.useState(false);
  return (
    <div className={Style.navbar_menu_query}>
      <input type="text" 
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