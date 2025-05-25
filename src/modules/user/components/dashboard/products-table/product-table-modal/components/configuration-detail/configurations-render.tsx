/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { Product, Requirements } from '#src/common/interfaces/product.interface.ts';
import React, { useRef, useState } from 'react';
import Style from './configuration-detail.module.css';
import { TiCancel } from 'react-icons/ti';
import { MdModeEdit } from 'react-icons/md';

interface ConfigurationsRenderProps {
    requirement: Requirements;
    setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

const ConfigurationsRender: React.FC<ConfigurationsRenderProps> = ({ requirement, setProductState }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
    
  const handleChange = (id: number, field: string, value: any) => {
    setProductState(prev => {
      const updated = (prev as Product).requirements.map(req =>
        req.id === id ? {
          ...req,
          [field]: field === 'memory' || field === 'storage' || field === 'directx_v' ? parseInt(value, 10) : value,
        } : req
      );
      return { ...prev, requirements: updated } as Product;
    });
  };
    
  const handleDelete = (id: number) => {
    setProductState(prev => {
      const updated = (prev as Product).requirements.filter(req => req.id !== id);
      return { ...prev, requirements: updated } as Product;
    });
  };
  const requirementRef = useRef(null);
  useOutClickExec(requirementRef, () => {
    setEditingId(null);
  });
  return (
    <div className={Style.spec_type} ref={requirementRef}>
      {editingId === requirement.id ? (
        <>
          <div className={Style.type_row}>
            <select
              value={requirement.type}
              onChange={e => handleChange(requirement.id, 'type', e.target.value)}
            >
              <option value="MINIMUM">MINIMUM</option>
              <option value="RECOMMENDED">RECOMMENDED</option>
            </select>
            <TiCancel fontSize={18} onClick={() => handleDelete(requirement.id)} />
          </div>
          <ul className={Style.specs}>
            <li><strong>OS: </strong><input value={requirement.os} onChange={e => handleChange(requirement.id, 'os', e.target.value)} /></li>
            <li><strong>Processor: </strong><input value={requirement.processor} onChange={e => handleChange(requirement.id, 'processor', e.target.value)} /></li>
            <li><strong>Memory: </strong><input type="number" min={0} value={requirement.memory} onChange={e => handleChange(requirement.id, 'memory', e.target.value)} /> GB RAM</li>
            <li><strong>Graphics: </strong><input value={requirement.graphics} onChange={e => handleChange(requirement.id, 'graphics', e.target.value)} /></li>
            <li><strong>DirectX: </strong>Version <input min={1} max={12} type="number" value={requirement.directx_v} onChange={e => handleChange(requirement.id, 'directx_v', e.target.value)} /></li>
            <li><strong>Storage: </strong><input min={0} type="number" value={requirement.storage} onChange={e => handleChange(requirement.id, 'storage', e.target.value)} /> GB available space</li>
          </ul>
        </>
      ) : (
        <>
          <div className={Style.type_row} onClick={() => setTimeout(() => setEditingId(requirement.id), 100)}>
            <h3>{requirement.type}<span className="asterix">*</span></h3>
            <MdModeEdit fontSize={18} />
          </div>
          <ul className={Style.specs}>
            <li><strong>OS: </strong>{requirement.os}</li>
            <li><strong>Processor: </strong>{requirement.processor}</li>
            <li><strong>Memory: </strong>{requirement.memory} GB RAM</li>
            <li><strong>Graphics: </strong>{requirement.graphics}</li>
            <li><strong>DirectX: </strong>Version {requirement.directx_v}</li>
            <li><strong>Storage: </strong>{requirement.storage} GB available space</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ConfigurationsRender;