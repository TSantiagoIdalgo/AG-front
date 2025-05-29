import AccionBg from '#assets/background/category-accion.jpg';
import AccionCh from '#assets/characters/category-accion.png';
import ArcadeBg from '#assets/background/category-arcade.jpg';
import ArcadeCh from '#assets/characters/category-arcade.png';
import AventureBg from '#assets/background/category-aventure.jpg';
import AventureCh from '#assets/characters/category-aventure.png';
import FightBg from '#assets/background/category-fight.jpg';
import FightCh from '#assets/characters/category-fight.png';
import FpsBg from '#assets/background/category-fps.jpg';
import FpsCh from '#assets/characters/category-fps.png';
import React from 'react';
import RpgBg from '#assets/background/category-rpg.jpg';
import RpgCh from '#assets/characters/category-rpg.png';
import SpBg from '#assets/background/category-singleplayer.jpg';
import SpCh from '#assets/characters/category-singleplayer.png';
import StrategyBg from '#assets/background/category-strategy.jpg';
import StrategyCh from '#assets/characters/category-strategy.png';
import Style from './categories.module.css';
import VrBg from '#assets/background/category-vr.jpg';
import VrCh from '#assets/characters/category-vr.png';
import arrowLeft from '#assets/icons/icon-arrow.svg';

const categoriesData = [
  { bgUrl: AccionBg, chUrl: AccionCh, title: 'Accion' },
  { bgUrl: ArcadeBg, chUrl: ArcadeCh, title: 'Arcade' },
  { bgUrl: AventureBg, chUrl: AventureCh, title: 'Aventure' },
  { bgUrl: StrategyBg, chUrl: StrategyCh, title: 'Estrategia' },
  { bgUrl: FpsBg, chUrl: FpsCh, title: 'FPS' },
  { bgUrl: FightBg, chUrl: FightCh, title: 'Lucha' },
  { bgUrl: RpgBg, chUrl: RpgCh, title: 'RPG' },
  { bgUrl: SpBg, chUrl: SpCh, title: 'Un solo jugador' },
  { bgUrl: VrBg, chUrl: VrCh, title: 'VR' }
];

export default function Categories(): React.JSX.Element {
  return (
    <section className={Style.categories}>
      <div className={Style.categories_title}>
        <h2 className={Style.title}>Categorias</h2>
        <img src={arrowLeft} alt='arrow'/>
      </div>
      <div className={Style.categories_list}>
        {categoriesData.map((item, index) => (
          <a href={`/ancore/catalogue?name=${item.title.toUpperCase()}`} key={index} style={{backgroundImage: `url(${item.bgUrl})`}} className={Style.category_container}>
            <div className={Style.category_content}>
              <div>{item.title}</div>
              <div className={Style.category_content_cover} style={{backgroundImage: `url(${item.chUrl})`}}></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}