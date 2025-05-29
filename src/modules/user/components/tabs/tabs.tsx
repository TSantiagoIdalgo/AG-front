import ArrowIcon from '#assets/icons/icon-arrow.svg';
import DashboardIcon from '#assets/icons/icon-dashboard.svg';
import SettingIcon from '#assets/icons/icon-settings.svg';
import * as libs from '#modules/user/libs/user-libs.ts';
import React from 'react';
import Style from './tabs.module.css';
import { IState } from '#src/state/store.ts';

export type TUserPaths = 'my-orders' | 'wishlist' | 'dashboard' | 'library' | 'my-reviews' | 'setting'

export default function UserTabs(): React.JSX.Element {
  const { data: user } = libs.useSelector((state: IState) => state.user);
  const {pathname} = libs.useLocation();
  const navigate = libs.useNavigate();
  const includesPath = (link: TUserPaths) => pathname.toLowerCase().includes(link.toLowerCase());
  return (
    <ul className={Style.tabs}>
      {user.roles.some(role => role.name === 'ROLE_ADMIN') && (
        <li>
          <p onClick={() => navigate('/user/dashboard')} id={includesPath('dashboard') ? Style.active : Style.none}>
            <img src={DashboardIcon} alt="dashboard"/>
            <span>Panel de control</span>
          </p>
        </li>
      )}
      <img src={ArrowIcon} alt="arrow" className={Style.arrow}/>
      <li>
        <p onClick={() => navigate('/user/my-orders')} id={includesPath('my-orders') ? Style.active : Style.none}>Mis pedidos</p>
      </li>
      <li>
        <p onClick={() => navigate('/user/wishlist')} id={includesPath('wishlist') ? Style.active : Style.none}>Wishlist</p>
      </li>
      <li>
        <p onClick={() => navigate('/user/my-reviews')} id={includesPath('my-reviews') ? Style.active : Style.none}>Reviews</p>
      </li>
      <li className={Style.setting}>
        <p onClick={() => navigate('/user/setting')} id={includesPath('setting') ? Style.active : Style.none}>
          <img src={SettingIcon} alt="setting"/>
          <span>Configuracion</span>
        </p>
      </li>
    </ul>
  );
}