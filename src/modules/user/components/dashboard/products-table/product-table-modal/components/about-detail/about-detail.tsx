import {Product} from '#src/common/interfaces/product.interface.ts';
import React, { useMemo, useState } from 'react';
import AboutDetailInfo from '../about-detail-info/about-detail-info';
import Style from './about-detail.module.css';
import { scrollInToView } from '#modules/product-detail/utils/scroll-in-to-view.ts';
import { IoMdAdd } from 'react-icons/io';
import { IoRemove } from 'react-icons/io5';
import RightClick from './right-click';
import AddNewTag from './add-new-tag';


type TAboutDetail = Partial<Pick<Product, 'description' | 'genres' | 'developer' | 'tags' | 'distributor' | 'release_date' | 'pegi' | 'id' | 'franchise'>> & {
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export interface PercentageOfReviews {
  circleMeterBar: number;
  circleMeterBarId: string,
  reviewsRate: string
}

export default function AboutModalDetail({
  description,
  developer,
  genres,
  tags = [],
  distributor,
  release_date,
  pegi,
  franchise,
  setProductState
}: TAboutDetail): React.JSX.Element {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [maxTag, setMaxTag] = useState(5);
  const zero = 0;
  const tagsSet = useMemo(() => new Set(tags).values().toArray(),[tags]);
  
  const processTextWithLines = (text: string) => {
    const regex = /<<\s*(?<temp1>https?:\/\/[^\s]+)\s*>>/gu;
    const lines = text.split(/\r?\n/u);

    return lines.map((line, lineIndex) => {
      const parts = line.split(regex);
      return (
        <div key={lineIndex}>
          {parts.map((part, index) => {
            if (regex.test(`<<${part}>>`)) return <span key={`${lineIndex}-${index}`}></span>; 
            return <p key={`${lineIndex}-${index}`}>{part || '\u00A0'}</p>;
          })}
        </div>
      );
    });
  };
  const handleContextMenu = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    setSelectedTag(tag);
  };

  return (
    <div className={Style.details}>
      <section className={Style.about}>
        <div>
          <div className={Style.headline}>
            <h2>Acerca de</h2>
          </div>
        </div>
        <div className={Style.text_readable}>
          {processTextWithLines(description || '')}
        </div>
        <span onClick={() => scrollInToView('description')} className={Style.show_more}>Leer mas</span>
        <div className={Style.user_tags}>
          <h2>Tags de usuario*:</h2>
          {tagsSet?.map((tag) => tag.length > zero && (
            <div key={tag} className={Style.tag_content}>
              <a onContextMenu={(event) => handleContextMenu(event, tag)} href={`/ancore/catalogue?name=${tag}`} title={tag}>{tag}</a>
              {selectedTag === tag && <RightClick selectedTag={selectedTag} setSelectedTag={setSelectedTag} setProductState={setProductState} tags={tagsSet}/>}
            </div>
          )).slice(zero, maxTag)}
          {(tagsSet?.length || 0) > maxTag && <a className={Style.more_tags} onClick={() => setTimeout(() => setMaxTag(tagsSet?.length || 0), 100)}>...</a>}
          {isAddingTag && <AddNewTag setMaxTag={setMaxTag} setProductState={setProductState} tags={tagsSet || []}/>}
          <button className={Style.add_new_tag} onClick={() => setTimeout(() => setIsAddingTag(!isAddingTag), 100)}>
            {isAddingTag ? <IoRemove/> : <IoMdAdd />}
          </button>
        </div>
      </section>
      <section className={Style.specifics}>
        <AboutDetailInfo franchise={franchise} setProductState={setProductState} developer={developer} distributor={distributor} genres={genres} pegi={pegi}
          release_date={release_date}/>
      </section>
    </div>
  );
}