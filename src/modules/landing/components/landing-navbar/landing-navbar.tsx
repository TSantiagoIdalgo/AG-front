import Logo from '#assets/icons/logo-horizontal.svg';
import NavbarMenu from '../landing-menu/landing-navbar-menu';
import React from 'react';
import Style from './landing-navbar.module.css';

export default function Navbar(): React.JSX.Element {
  return (
    <header className={Style.navbar_header}>
      <img src={Logo} alt="logo-horizontal" className={Style.navbar_header_logo} />
      <NavbarMenu/>
      <div>
        hola
      </div>
    </header>
  );
}