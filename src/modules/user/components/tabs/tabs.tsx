import ArrowIcon from '#assets/icons/icon-arrow.svg';
import DashboardIcon from '#assets/icons/icon-dashboard.svg';
import SettingIcon from '#assets/icons/icon-settings.svg';
import * as libs from '#modules/user/libs/user-libs.ts';
import React from 'react';
import Style from './tabs.module.css';

export default function UserTabs(): React.JSX.Element {
  const {pathname} = libs.useLocation();
  const includesPath = (link: string) => pathname.toLowerCase().includes(link.toLowerCase());
  return (
    <ul className={Style.tabs}>
      <li>
        <a href="/ancore/user/dashboard" id={includesPath('dashboard') ? Style.active : Style.none}>
          <img src={DashboardIcon} alt="dashboard"/>
          <span>Panel de control</span>
        </a>
      </li>
      <img src={ArrowIcon} alt="arrow" className={Style.arrow}/>
      <li>
        <a href="/ancore/user/my-orders" id={includesPath('my-orders') ? Style.active : Style.none}>Mis pedidos</a>
      </li>
      <li>
        <a href="/ancore/user/wishlist" id={includesPath('wishlist') ? Style.active : Style.none}>Wishlist</a>
      </li>
      <li>
        <a href="/ancore/user/library" id={includesPath('library') ? Style.active : Style.none}>Biblioteca</a>
      </li>
      <li>
        <a href="/ancore/user/my-reviews" id={includesPath('my-reviews') ? Style.active : Style.none}>Reviews</a>
      </li>
      <li className={Style.setting}>
        <a href="/ancore/user/setting" id={includesPath('setting') ? Style.active : Style.none}>
          <img src={SettingIcon} alt="setting"/>
          <span>Configuracion</span>
        </a>
      </li>
    </ul>
  );
}