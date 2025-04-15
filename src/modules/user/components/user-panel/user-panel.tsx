import DsIcon from '#assets/icons/icon-dcr.svg';
import SteamIcon from '#assets/icons/icon-stm.svg';
import AvatarIcon from '#assets/icons/icon-user.svg';
import * as libs from '#modules/user/libs/user-libs.ts';
import {IState} from '#src/state/store.ts';
import React from 'react';
import Style from './user-panel.module.css';

export default function UserPanel(): React.JSX.Element {
  const {data: user} = libs.useSelector((state: IState) => state.user);
  return (
    <div className={Style.main_panel}>
      <div className={Style.avatar_panel}>
        <div className={Style.user_avatar_own}>
          <div className={Style.avatar}>
            <img src={AvatarIcon} alt="avatar"/>
          </div>
        </div>
        <div className={Style.user_links}>
          <h2 className={Style.title}>{user.username}</h2>
          <span className={Style.createdAt}>{user.email}</span>
          <div className={Style.details}>
            <div className={Style.steam}>
              <img src={SteamIcon} alt="steam"/>
            </div>
            <div className={Style.discord}>
              <img src={DsIcon} alt="discord"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}