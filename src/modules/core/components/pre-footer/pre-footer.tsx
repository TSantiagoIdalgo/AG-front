import IconSend from '#assets/icons/icon-send.svg';
import React from "react";
import Style from './pre-footer.module.css';

export default function PreFooter(): React.JSX.Element {

  return (
    <aside className={Style.pre_footer}>
      <div className={Style.subscribe}>
        <div className={Style.text}>
          <img src={IconSend} alt="send" />
          <div className={Style.lines}>
            <span className={Style.title}>¡No te pierdas ninguna oferta o promoción!</span>
            <span className={Style.details}>¡Y sé el primero en recibir nuestras ofertas privadas, newsletters y promociones de la semana!</span>
          </div>
        </div>
        <a href="#" className={Style.button}>¡Suscríbete!</a>
      </div>
    </aside>
  );
}