import LandingNavbarSearch from "../landing-navbar-search/navbar-search";
import { NavLink } from "react-router-dom";
import PcLogo from '#assets/icons/icon-pc.svg';
import PlayStationLogo from '#assets/icons/icon-play.svg';
import React from "react";
import Style from './navbar-menu.module.css';
import SwitchLogo from '#assets/icons/icon-swt.svg';
import XboxLogo from '#assets/icons/icon-xbx.svg';
import { useScroll } from '#modules/core/hooks/use-scroll.ts';

interface ILinkComponent {
  img: string;
  span: string;
  to: string;
}

const LinkComponent = ({ img, span, to }: ILinkComponent) => (
  <div className={Style.navbar_menu_products_nav}>
    <NavLink to={to} className={Style.navbar_menu_products_access}>
      <img src={img} alt={span} />
      <span>{span}</span>
    </NavLink>
  </div>
);

export default function NavbarMenu(): React.JSX.Element {
  const initScroll = 100;
  const { scrollY } = useScroll();
  const isScrolling = scrollY >= initScroll;
  return (
    <header className={Style.navbar_menu}>
      <nav className={isScrolling ? Style.navbar_menu_trendings_scroll : Style.navbar_menu_trendings}>
        <a href="#" className={Style.navbar_menu_trendings_a}>Tendencias</a>
        <a href="#" className={Style.navbar_menu_trendings_a}>Reservas</a>
        <a href="#" className={Style.navbar_menu_trendings_a}>Proximas salidas</a>
        <a href="#" className={Style.navbar_menu_trendings_a}>Soporte 24/7</a>
      </nav>
      <div className={isScrolling ? Style.navbar_menu_products_scroll : Style.navbar_menu_products}>
        <div className={isScrolling ? Style.none : Style.navbar_menu_products_glossy}></div>
        <div className={Style.navbar_menu_products_links}>
          <LinkComponent img={PcLogo} span='PC' to='#'/>
          <LinkComponent img={PlayStationLogo} span='PlayStation' to='#'/>
          <LinkComponent img={XboxLogo} span='Xbox' to='#'/>
          <LinkComponent img={SwitchLogo} span='Nintendo' to='#'/>
          <LandingNavbarSearch/>
        </div>
      </div>
    </header>
  );
}

