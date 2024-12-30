import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './visuals-detail.module.css';

type TVisualDetail = Pick<Product, 'trailer' | 'images'>

export default function VisualsDetail({ images, trailer }: TVisualDetail): React.JSX.Element {
  const firstImage = 0, spliceImage = 1;
  const image = images[firstImage];
  return (
    <section className={Style.visuals_container}>
      <div className={Style.headline}>
        <h2>Visuales</h2>
      </div>

      <div className={Style.trailer}>
        <video src={trailer} controls></video>
      </div>
      <div className={Style.screenshots}>
        <img className={Style.screenshots_wide} src={image} alt="img" />
        <div className={Style.thumber_images}>
          {images.map((currentImage, index) => <img src={currentImage} alt={`image ${index}`} key={index}/>).slice(spliceImage)}
        </div>
      </div>
    </section>
  );
}