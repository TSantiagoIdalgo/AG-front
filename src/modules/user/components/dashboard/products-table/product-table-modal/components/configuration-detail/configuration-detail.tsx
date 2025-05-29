 
import { Product, Requirements } from '#src/common/interfaces/product.interface.ts';
import React, { useState } from 'react';
import Style from './configuration-detail.module.css';
import ConfigurationsRender from './configurations-render';
import { MdDelete } from 'react-icons/md';
import { LiaUndoSolid } from 'react-icons/lia';

type TConfigurationDetail = Partial<Pick<Product, 'requirements'>> & {
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export default function ConfigurationModalDetail({ requirements = [], setProductState }: TConfigurationDetail) {
  const [prevRequirements, setPrevRequirements] = useState<Requirements[]>([]);
  const handleAddDefaults = () => {
    const generateId = () => Math.floor(Math.random() * 1000000);
    const defaultRequirement = (type: 'MINIMUM' | 'RECOMMENDED') => ({
      directx_v: 11,
      graphics: '',
      id: generateId(),
      memory: 0,
      os: '',
      processor: '',
      storage: 0,
      type,
    });
    setProductState(prev => ({
      ...prev,
      requirements: [defaultRequirement('MINIMUM'), defaultRequirement('RECOMMENDED')],
    }) as Product);
  };

  if (!requirements.length) {
    return (
      <section className={Style.requirements_container}>
        <div className={Style.headline}>
          <h2>Configuracion</h2>
          <div className={Style.headline_buttons}>
            {prevRequirements.length ? <button className={Style.headline_undo} onClick={() => setTimeout(() => {
              setProductState(prev => ({ ...prev, requirements: prevRequirements }) as Product);
            }, 100)}><LiaUndoSolid/></button> : null}
            <button onClick={handleAddDefaults} className={Style.create_requirements}>Agregar requisitos predeterminados</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={Style.requirements_container}>
      <div className={Style.headline}>
        <h2>Configuracion <MdDelete fontSize={30} className={Style.headline_remove} onClick={() => setTimeout(() => {
          setProductState((prev) => {
            setPrevRequirements(prev?.requirements as Requirements[]);
            return { ...prev, requirements: []} as Product;
          });
        }, 100)}/></h2>
        
      </div>
      <div className={Style.specs_container}>
        {requirements.map((requirement) => <ConfigurationsRender requirement={requirement} setProductState={setProductState} key={requirement.id}/>)}
      </div>
    </section>
  );
}
