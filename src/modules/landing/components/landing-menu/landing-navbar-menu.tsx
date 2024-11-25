import * as libs from '../../libs/landing-libs';
import { NavLink } from "react-router-dom";
import PcLogo from '#assets/icons/icon-pc.svg';
import PlayStationLogo from '#assets/icons/icon-play.svg';
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './landing-navbar-menu.module.css';
import SwitchLogo from '#assets/icons/icon-swt.svg';
import XboxLogo from '#assets/icons/icon-xbx.svg';

export default function NavbarMenu(): React.JSX.Element {
  const [searching, handleSearching] = libs.useState(false);
  return (
    <nav className={Style.navbar_menu}>
      <div className={Style.navbar_menu_trendings}>
        <a href="#">Tendencias</a>
        <a href="#">Reservas</a>
        <a href="#">Proximas salidas</a>
        <a href="#">Soporte 24/7</a>
      </div>
      <div className={Style.navbar_menu_products}>
        <div className={Style.navbar_menu_products_glossy}></div>
        <div className={Style.navbar_menu_products_links}>
          <div className={Style.navbar_menu_products_nav}>
            <NavLink to="#" className={Style.navbar_menu_products_access}>
              <img src={PcLogo} alt="pc-logo" />
              <span>PC</span>
            </NavLink>
          </div>
          <div className={Style.navbar_menu_products_nav}>
            <NavLink to="#" className={Style.navbar_menu_products_access}>
              <img src={PlayStationLogo} alt="ps-logo" />
              <span>PlayStation</span>
            </NavLink>
          </div>
          <div className={Style.navbar_menu_products_nav}>
            <NavLink to="#" className={Style.navbar_menu_products_access}>
              <img src={XboxLogo} alt="xbox-logo" />
              <span>Xbox</span>
            </NavLink>
          </div>
          <div className={Style.navbar_menu_products_nav}>
            <NavLink to="#" className={Style.navbar_menu_products_access}>
              <img src={SwitchLogo} alt="nintendo-logo" />
              <span>Nintendo</span>
            </NavLink>
          </div>
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
        </div>
      </div>
    </nav>
  );
}