import React from 'react';
import Style from './panel-detail.module.css';
import * as libs from '../../libs/product-detail-libs';
import { Platform, Product } from '#src/common/interfaces/product.interface.ts';
import { IoMdAdd } from 'react-icons/io';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { SiVerizon } from 'react-icons/si';

interface PlatformEditableProps {
    allPlatforms?: Platform[];
    platforms?: Platform[];
    selectedPlatform?: Platform;
    setSelectedPlatform: React.Dispatch<React.SetStateAction<Platform | undefined>>;
    setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>;
  }
  
export const PlatformEditable: React.FC<PlatformEditableProps> = ({
  allPlatforms = [],
  platforms = [],
  selectedPlatform,
  setSelectedPlatform,
  setProductState
}) => {
  const platformMap = libs.useMemo(() => {
    if (!platforms.length) return [];
  
    return [
      ...new Map(
        platforms.map(obj => [JSON.stringify(obj), obj])
      ).values()
    ];
      
  }, [platforms]);
  const REFRESH_DELAY = 80;
  const [allPlatformsSaved, setAllPlatformSaved] = libs.useState(allPlatforms);
  const [isAddPlatformOpen, setAddPlatformOpen] = libs.useState(false);
  const [addNewPlatform, setNewPlatform] = libs.useState({
    disabled: false,
    name: '',
    platform: '',
  });
  const [isPlatformSelectorOpen, setPlatformSelectorOpen] = libs.useState(false);
  const [isAddingNewPlatform, handleAddingNewPlatform] = libs.useState(false);
  const containerRef = libs.useRef<HTMLDivElement>(null);
  
  libs.useEffect(() => {
    if (allPlatforms) setAllPlatformSaved(allPlatforms);
  }, [allPlatforms]);

  useOutClickExec(containerRef, () => {
    setAddPlatformOpen(false);
    setPlatformSelectorOpen(false);
  });
  
  const selectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    setTimeout(() => setPlatformSelectorOpen(false), REFRESH_DELAY);
  };
  
  const onAddOrRemovePlatform = (newPlatform: Platform) => {
    setProductState((prev) => {
      const prevPlatforms = prev?.platforms ?? [];

      const alreadyExists = prevPlatforms.some(
        (p) => p.name === newPlatform.name && p.platform === newPlatform.platform
      );
  
      let updatedPlatforms: Platform[];
  
      if (!alreadyExists) {
        updatedPlatforms = [...prevPlatforms, newPlatform];
      } else if (prevPlatforms.length > 1) {
        updatedPlatforms = prevPlatforms.filter(
          (p) => !(p.name === newPlatform.name && p.platform === newPlatform.platform)
        );
      } else {
        return prev;
      }
  
      const selectedStillExists = updatedPlatforms.some(
        (p) => p.name === selectedPlatform?.name && p.platform === selectedPlatform?.platform
      );
  
      if (!selectedStillExists) {
        setSelectedPlatform(updatedPlatforms[0]);
      }
  
      return {
        ...prev,
        platforms: updatedPlatforms,
      } as Product;
    });
  };
  
  
  libs.useEffect(() => {
    if (!isAddPlatformOpen) return;
  
    const timeout = setTimeout(() => {
      setPlatformSelectorOpen(false);
    }, 100);
  
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [isAddPlatformOpen]);
  
  const renderPlatformOption = (plat: Platform, isSelected: boolean, onClick: () => void) => (
    <span
      onClick={onClick}
      key={plat.name}
      className={isSelected ? Style.selectedPlatform : Style.none}
    >
      {plat.platform}
      <h5 className={Style.platformName}>({plat.name})</h5>
    </span>
  );

  const onSubmitPlatform = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddOrRemovePlatform(addNewPlatform);
    setAllPlatformSaved((prev) => [...(prev as Platform[]), addNewPlatform]);
    setNewPlatform({ disabled: false, name: '', platform: '' });
    handleAddingNewPlatform(false);
  };
  
  return (
    <div className={Style.select_platform} ref={containerRef}>
      <div className={isPlatformSelectorOpen ? Style.platfrom_select : Style.platform}>
        <span
          className={Style.selected}
          onClick={() => setPlatformSelectorOpen(prev => !prev)}
        >
          {selectedPlatform?.platform}
        </span>
  
        {isPlatformSelectorOpen && (
          <div className={Style.platform_options}>
            {platformMap.map(plat =>
              renderPlatformOption(
                plat,
                selectedPlatform?.name === plat.name,
                () => selectPlatform(plat)
              )
            )}
            <div className={Style.add_platform}>
              <IoMdAdd
                className={Style.add_icon}
                color="#fff"
                fontSize={20}
                onClick={() => setAddPlatformOpen(true)}
              />
            </div>
          </div>
        )}
      </div>
  
      {isAddPlatformOpen && (
        <div className={Style.add_platform_modal}>
          {allPlatformsSaved?.map(plat =>
            renderPlatformOption(
              plat,
              platformMap.some(p => p.name === plat.name && p.platform === plat.platform),
              () => onAddOrRemovePlatform(plat)
            )
          )}
          <div className={Style.add_platform}>
            {isAddingNewPlatform
              ? (
                <form onSubmit={onSubmitPlatform} className={Style.set_new_platform}>
                  <div className={Style.set_new_platform_inputs}>
                    <input 
                      type="text" 
                      placeholder='System' 
                      value={addNewPlatform.platform}  
                      onChange={(event) => setNewPlatform(prev => ({ ...prev, platform: event.target.value}))}/>
                    <input 
                      type="text" 
                      placeholder='Platform' 
                      value={addNewPlatform.name} 
                      onChange={(event) => setNewPlatform(prev => ({ ...prev, name: event.target.value}))}/>
                  </div>
                  <button disabled={addNewPlatform.platform.length <= 3 || addNewPlatform.name.length <= 3}><SiVerizon fontSize={15}/></button>
                </form>
              )
              : <IoMdAdd
                className={Style.add_icon}
                color="#fff"
                fontSize={20}
                onClick={() => setTimeout(() => handleAddingNewPlatform(true), 100)}
              />}
          </div>
        </div>
      )}
    </div>
  );
};
  