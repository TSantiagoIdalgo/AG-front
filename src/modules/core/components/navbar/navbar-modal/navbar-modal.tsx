import {useOutClick} from "#modules/catalogue/hooks/use-out-click.ts";
import {User} from "#src/common/interfaces/review.interface.ts";
import React, {useEffect, useRef, useState} from "react";
import Style from './navbar-modal.module.css';

interface INavbarModalProps {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User
}

const navbarModal: React.FC<INavbarModalProps> = ({handleModal}): React.JSX.Element => {
  const [firstPaint, setFirstPaint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const outClick = useOutClick(containerRef, 'mousemove');
  useEffect(() => {
    if (firstPaint) setFirstPaint(false);
    else handleModal(outClick);
  }, [outClick]);

  return (
    <div className={Style.navbar_modal}>
      <div ref={containerRef} className={Style.navbar_modal_content}>
        <div className={Style.navbar_modal_content_data}>
          <div className={Style.navbar_modal_info}>
            <span className={Style.text}>Panel de control</span>
            <span className={Style.text}>Mis pedidos</span>
            <span className={Style.text}>Wishlist</span>
            <span className={Style.text}>Configuracion</span>
            <span className={Style.spacer}></span>
            <span className={Style.text}>Desconectarse</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbarModal;