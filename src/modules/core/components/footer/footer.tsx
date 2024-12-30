import DiscordIcon from '#assets/icons/icon-dcr.svg';
import FbIcon from '#assets/icons/icon-fb.svg';
import InstagramIcon from '#assets/icons/icon-igr.svg';
import React from 'react';
import Style from './footer.module.css';
import TrustIcon from '#assets/icons/stars-4.5.svg';
import TwitchIcon from '#assets/icons/icon-tch.svg';
import XIcon from '#assets/icons/icon-xcom.svg';
import YTIcon from '#assets/icons/icon-yt.svg';


export default function Footer(): React.JSX.Element {

  return(
    <footer className={Style.footer_container}>
      <div className={Style.content}>
        <div className={Style.links}>
          <div className={Style.trust}>
            <h2>Trustpilot</h2>
            <img src={TrustIcon}/>
            <span>TrustScore 4.7</span>
          </div>
          <ul className={Style.list}>
            <li><a href="#">Terminos y condiciones</a></li>
            <li><a href="#">Politica de privacidad</a></li>
            <li><a href="#">Programa de afiliacion</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
          <div className={Style.icons}>
            <a href="#" className={Style.discord}><img src={DiscordIcon} alt="discord" /></a>
            <a href="#" className={Style.x}><img src={XIcon} alt="x" /></a>
            <a href="#" className={Style.instagram}><img src={InstagramIcon} alt="instagram" /></a>
            <a href="#" className={Style.facebook}><img src={FbIcon} alt="facebook" /></a>
            <a href="#" className={Style.youtube}><img src={YTIcon} alt="youtube" /></a>
            <a href="#" className={Style.twitch}><img src={TwitchIcon} alt="twtich" /></a>
          </div>
        </div>
        <p className={Style.copyright}>Copyright © 2024 Instant Gaming - All rights reserved</p>
      </div>
    </footer>
  );
}