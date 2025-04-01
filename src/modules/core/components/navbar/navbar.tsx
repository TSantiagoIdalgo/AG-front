import CartIcon from '#assets/icons/icon-cart.svg';
import UserIcon from '#assets/icons/icon-user.svg';
import Logo from '#assets/icons/logo-horizontal.svg';
import NavbarModal from "#modules/core/components/navbar/navbar-modal/navbar-modal.tsx";
import {useScroll} from '#modules/core/hooks/use-scroll.ts';
import {IState} from "#src/state/store.ts";
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import NavbarMenu from './navbar-menu/navbar-menu';
import Style from './navbar.module.css';

export default function Navbar(): React.JSX.Element {
  const {data: user} = useSelector((state: IState) => state.user);
  const [modal, handleModal] = useState<boolean>(false);
  const initScroll = 100;
  const {scrollY} = useScroll();
  const navigate = useNavigate();
  const isScrolling = scrollY >= initScroll;
  return (
    <header className={isScrolling ? Style.navbar_header_scroll : Style.navbar_header}>
      <div className={Style.gradient}/>
      <a href="/ancore">
        <img src={Logo} alt="logo-horizontal" className={Style.navbar_header_logo}/>
      </a>
      <NavbarMenu/>
      <div className={Style.navbar_user}>
        <Link to={user ? "/user/cart" : "/login"}>
          <img src={CartIcon} alt='cart'/>
        </Link>
        <div onClick={() => user ? handleModal(true) : navigate('/login')}>
          <img src={UserIcon} alt='user'/>
        </div>
      </div>
      {modal && <NavbarModal handleModal={handleModal} user={user}/>}
    </header>
  );
}