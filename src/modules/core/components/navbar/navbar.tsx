import CartIcon from '#assets/icons/icon-cart.svg';
import Logo from '#assets/icons/logo-horizontal.svg';
import NavbarMenu from './navbar-menu/navbar-menu';
import React from 'react';
import Style from './navbar.module.css';
import UserIcon from '#assets/icons/icon-user.svg';
import { useScroll } from '#modules/core/hooks/use-scroll.ts';

export default function Navbar(): React.JSX.Element {
  const initScroll = 100;
  const { scrollY } = useScroll();
  const isScrolling = scrollY >= initScroll;
  return (
    <header className={isScrolling ? Style.navbar_header_scroll : Style.navbar_header}>
      <div className={Style.gradient}/>
      <a href="/ancore">
        <img src={Logo} alt="logo-horizontal" className={Style.navbar_header_logo} />
      </a>
      <NavbarMenu/>
      <div className={Style.navbar_user}>
        <img src={CartIcon} alt='cart'/>
        <img src={UserIcon} alt='user'/>
      </div>
    </header>
  );
}