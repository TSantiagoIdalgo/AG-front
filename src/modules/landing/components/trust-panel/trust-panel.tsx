import React, { CSSProperties } from 'react';
import Style from './trust-panel.module.css';
import bubbles from '#assets/icons/icon-customer-support.svg';
import fastIcon from '#assets/icons/icon-download.svg';
import safeShield from '#assets/icons/icon-secure.svg';
import trustPilot from '#assets/icons/stars-4.5.svg';

interface ItemsProps {
  icon: string;
  mainText?: string;
  subText?: string;
  style?: CSSProperties;
  noFilter?: boolean
}

const Items: React.FC<ItemsProps> = ({ icon, mainText, subText, style, noFilter }) => (
  <article className={noFilter ? Style.content_fast : Style.content_fast_filter}>
    <img src={icon} alt='fasticon' style={style}/>
    <div className={Style.text}>
      <span className={Style.mainText}>{mainText}</span>
      <span className={Style.subText}>{subText}</span>
    </div>
  </article>
);

export default function TrustPanel(): React.JSX.Element {
  return (
    <section className={Style.container}>
      <div className={Style.content}>
        <Items icon={fastIcon} mainText='Súper rápido' subText='Descarga digital instantánea'/>
        <div className={Style.spacer}></div>
        <Items icon={safeShield} mainText='Fiable y seguro' subText='Mas de 10,000 juegos'/>
        <div className={Style.spacer}></div>
        <Items icon={bubbles} mainText='Atencion al client' subText='Agente disponible 24/7'/>
        <div  className={Style.spacer}></div>
        <Items noFilter icon={trustPilot}  style={{height: '100%', width: '220px'}}/>
      </div>
    </section>
  );
}
