import * as libs from '../../libs/product-detail-libs';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import Style from './description-details.module.css';

type TDescriptionDetail = Pick<Product, 'description'>

export default function DescriptionModalDetail({ description }: TDescriptionDetail): React.JSX.Element {
  const [showDescription, handleShowDescription] = libs.useState(false);
  const [rawText, setRawText] = libs.useState(description);
  const [editing, setEditing] = libs.useState(false);
  const divRef = libs.useRef<HTMLDivElement>(null);
  const processTextToHtml = (text: string): string => {
    const regex = /<<\s*(?<temp1>https?:\/\/[^\s]+)\s*>>/gu;
    const lines = text.split(/\r?\n/u);
  
    return lines
      .map((line) => {
        if (regex.test(line)) {
          return line.replace(regex, (_unknown, url) => `<img src="${url}" alt="image" />`);
        } 
        return `<p>${line || '&nbsp;'}</p>`;
        
      })
      .join('');
  };
  
  const extractTextWithMarkers = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
  
    const lines: string[] = [];
  
    for (const child of Array.from(div.childNodes)) {
      if (child.nodeName === 'IMG') {
        const url = (child as HTMLImageElement).src;
        lines.push(`<< ${url} >>`);
      } else if (child.nodeName === 'P' || child.nodeType === Node.TEXT_NODE) {
        lines.push((child.textContent || '').trim());
      }
    }
  
    return lines.join('\n');
  };
  const handleBlur = () => {
    if (!divRef.current) return;

    const html = divRef.current.innerHTML;
    const restoredText = extractTextWithMarkers(html);
    setRawText(restoredText);
    setEditing(false);
  };
  
  return (
    <section id='description' className={showDescription ? Style.description_container_show : Style.description_container}>
      <div className={Style.headline}>
        <h2>Descripcion</h2>
      </div>
      <span className={Style.readable}>
        <div
          id='descripcion'
          ref={divRef}
          contentEditable={editing}
          dangerouslySetInnerHTML={{ __html: processTextToHtml(rawText) }}
          onClick={() => setEditing(true)}
          onBlur={handleBlur}
          suppressContentEditableWarning
          style={{
            border: editing ? '1px dashed blue' : '1px solid gray',
            cursor: editing ? 'text' : 'pointer',
            minHeight: '100px',
            padding: '1rem',
          }}
        />
        <div className={Style.plus} onClick={() => handleShowDescription(!showDescription)}>
          {showDescription ? '-' : '+'}
        </div>
      </span>
    </section>
  );
}