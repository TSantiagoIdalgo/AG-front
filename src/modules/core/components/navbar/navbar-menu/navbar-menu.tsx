import PcLogo from '#assets/icons/icon-pc.svg';
import PlayStationLogo from '#assets/icons/icon-play.svg';
import SwitchLogo from '#assets/icons/icon-swt.svg';
import XboxLogo from '#assets/icons/icon-xbx.svg';
import { useScroll } from '#modules/core/hooks/use-scroll.ts';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LandingNavbarSearch from '../navbar-search/navbar-search';
import Style from './navbar-menu.module.css';
import { scrollInToView } from '#modules/product-detail/utils/scroll-in-to-view.ts';

interface ILinkComponent {
  img: string;
  span: 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo';
  to: string;
}

const LinkComponent = ({ img, span, to }: ILinkComponent) => {
  const location = useLocation();
  const colorHover = {
    Nintendo: '#ff151f',
    PC: '#ff5400',
    PlayStation: '#0970d8',
    Xbox: '#107c10',
  };
  const bgColor = location.search.includes(span)
    ? colorHover[span]
    : 'transparent';
  return (
    <div className={Style.navbar_menu_products_nav}>
      <NavLink
        to={to}
        className={Style.navbar_menu_products_access}
        onClick={() => {
          window.document.title = span;
        }}
        style={{ backgroundColor: bgColor }}
      >
        <img src={img} alt={span} />
        <span>{span}</span>
      </NavLink>
    </div>
  );
};

export default function NavbarMenu(): React.JSX.Element {
  const initScroll = 100;
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const isScrolling = scrollY >= initScroll;

  const onNavigateOptions = (to: string) => {
    const isInLanding = window.location.pathname.split('/').length <= 2;
    if (isInLanding) return scrollInToView(to);
    navigate('/');
    return setTimeout(() => scrollInToView(to), 100);
  };

  return (
    <header className={Style.navbar_menu}>
      <nav
        className={
          isScrolling
            ? Style.navbar_menu_trendings_scroll
            : Style.navbar_menu_trendings
        }
      >
        <span onClick={() => onNavigateOptions('tendencies')} className={Style.navbar_menu_trendings_a}>
          Tendencias
        </span>
        <span onClick={() => onNavigateOptions('recommended')} className={Style.navbar_menu_trendings_a}>
          Recomendados
        </span>
        <span onClick={() => onNavigateOptions('best-sellers')} className={Style.navbar_menu_trendings_a}>
          Mas vendidos
        </span>
      </nav>
      <div
        className={
          isScrolling
            ? Style.navbar_menu_products_scroll
            : Style.navbar_menu_products
        }
      >
        <div
          className={
            isScrolling ? Style.none : Style.navbar_menu_products_glossy
          }
        ></div>
        <div className={Style.navbar_menu_products_links}>
          <LinkComponent img={PcLogo} span="PC" to="/catalogue?system=PC" />
          <LinkComponent
            img={PlayStationLogo}
            span="PlayStation"
            to="/catalogue?system=PlayStation"
          />
          <LinkComponent
            img={XboxLogo}
            span="Xbox"
            to="/catalogue?system=Xbox"
          />
          <LinkComponent
            img={SwitchLogo}
            span="Nintendo"
            to="/catalogue?system=Nintendo"
          />
          <LandingNavbarSearch />
        </div>
      </div>
    </header>
  );
}
