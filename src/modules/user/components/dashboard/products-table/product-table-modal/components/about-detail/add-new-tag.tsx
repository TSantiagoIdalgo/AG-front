import React, { useEffect, useRef, useState } from 'react';
import Style from './about-detail.module.css';
import { Product } from '#src/common/interfaces/product.interface.ts';

interface AddNewTagProps {
    setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>;
    setMaxTag: React.Dispatch<React.SetStateAction<number>>;
    tags: string[]
}

const AddNewTag: React.FC<AddNewTagProps> = ({ setMaxTag, setProductState, tags }): React.JSX.Element => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTag, setNewTag] = useState('');
  const onCreateTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',' && !tags.some(tag => tag === newTag.toUpperCase())) {
      setProductState((prev) => ({ ...prev, tags: [...(prev?.tags as string[]), newTag.toUpperCase()]}) as Product);
      setTimeout(() => {
        setNewTag('');
        setMaxTag(tags.length + 1);
      }, 100);
    }
  };

  useEffect(() => {
    const span = spanRef.current;
    const input = inputRef.current;
    const newWith = 20;
    if (span && input) {
      input.style.width = `${span.offsetWidth + newWith}px`;
    }
  }, [newTag]);
  return (
    <div className={Style.adding_tag}>
      <input onKeyDown={onCreateTag} placeholder='Tag name...' ref={inputRef} className={Style.tag} type='text' value={newTag} name='tag' onChange={(e) => setNewTag(e.target.value)}/>
      <span
        ref={spanRef}
        style={{
          font: 'inherit',
          left: 0,
          position: 'absolute',
          top: 0,
          visibility: 'hidden',
          whiteSpace: 'pre',
        }}
      >
        {newTag || ' Tag name... '}
      </span>
    </div>
  );
};

export default AddNewTag;