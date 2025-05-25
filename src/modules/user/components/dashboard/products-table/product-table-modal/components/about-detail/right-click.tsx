import React, { useRef } from 'react';
import Style from './about-detail.module.css';
import { MdDelete } from 'react-icons/md';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';

interface RightClickProps {
    selectedTag: string;
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
    tags: string[];
    setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

const RightClick: React.FC<RightClickProps> = ({ selectedTag, setSelectedTag, setProductState, tags }): React.JSX.Element => {
  const rightClickRef = useRef<HTMLDivElement>(null);
  const onRemoveTag = () => {
    const tagsClone = structuredClone(tags);
    const tagIndex = tagsClone.findIndex(tag => tag === selectedTag);
    if (tagIndex !== -1) tagsClone.splice(tagIndex, 1);
    setProductState((prev) => ({ ...prev, tags: tagsClone}) as Product);
    setSelectedTag('');
  };
  useOutClickExec(rightClickRef, () =>{
    setSelectedTag('');
  });
  return (
    <div className={Style.right_click} ref={rightClickRef} onClick={() => setTimeout(onRemoveTag, 100)}>
      <span>{selectedTag}</span>
      <MdDelete fontSize={20} className={Style.remove_tag} />
    </div>
  );
};

export default RightClick;