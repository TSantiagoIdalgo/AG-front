import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './configuration-detail.module.css';

type TConfigurationDetail = Pick<Product, "requirements">

export default function ConfigurationDetail ({ requirements }: TConfigurationDetail): React.JSX.Element {

  return (
    <section className={Style.requirements_container}>
      <div className={Style.headline}>
        <h2>Configuracion</h2>
      </div>
      <div className={Style.specs_container}>
        {requirements.map((requirement) => (
          <div key={requirement.id} className={Style.spec_type}>
            <h3>{requirement.type}<span className="asterix">*</span></h3>
            <ul className={Style.specs}>
              <li><strong>OS: </strong>{requirement.os}</li>
              <li><strong>Processor: </strong>{requirement.processor}</li>
              <li><strong>Memory: </strong>{requirement.memory} GB RAM</li>
              <li><strong>Graphics: </strong>{requirement.graphics}</li>
              <li><strong>DirectX: </strong>Version {requirement.directx_v}</li>
              <li><strong>Storage: </strong>{requirement.storage} GB available space</li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}