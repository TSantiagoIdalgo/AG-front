import * as libs from '../../libs/product-detail-libs';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import Style from './description-details.module.css';

type TDescriptionDetail = Pick<Product, 'description'>

export default function DescriptionDetail({ description }: TDescriptionDetail): React.JSX.Element {
  const [showDescription, handleShowDescription] = libs.useState(false);
  const processTextWithLines = (text: string) => {
    const regex = /<<\s*(?<temp1>https?:\/\/[^\s]+)\s*>>/gu;
    const lines = text.split(/\r?\n/u);

    return lines.map((line, lineIndex) => {
      const parts = line.split(regex);
      return (
        <div key={lineIndex}>
          {parts.map((part, index) => {
            if (regex.test(`<<${part}>>`)) {
              return (
                <img
                  key={`${lineIndex}-${index}`}
                  src={part}
                  alt="dynamic"
                  className={Style.content_images}
                />
              );
            }
            return <p key={`${lineIndex}-${index}`}>{part || '\u00A0'}</p>;
          })}
        </div>
      );
    });
  };
  return (
    <section id='description' className={showDescription ? Style.description_container_show : Style.description_container}>
      <div className={Style.headline}>
        <h2>Descripcion</h2>
      </div>
      <span className={Style.readable}>
        {processTextWithLines(description)}
        <div className={Style.plus} onClick={() => handleShowDescription(!showDescription)}>
          {showDescription ? '-' : '+'}
        </div>
      </span>
    </section>
  );
}