import * as libs from '#modules/catalogue/libs/catalogue-libs';
import { IFiltersDropdown } from "#modules/catalogue/interfaces/catalogue.interface.ts"; 
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-dropdown.module.css';
import { useOutClick } from "#modules/catalogue/hooks/use-out-click.ts";

const FiltersDropdown = ({ name, results, type }: IFiltersDropdown): React.JSX.Element => {
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const [option, selectOption] = React.useState<string | null>(searchParams.get(type));
  const [visualOption, setVisualOption] = React.useState<string | null>(searchParams.get(type));
  const containerRef = React.useRef<HTMLDivElement>(null);
  const toggle = useOutClick(containerRef);

  libs.useEffect(() => {
    if (type === 'orderBy' && option) {
      searchParams.set(type, visualOption as string);
      setSearchParams(searchParams);
    } else if (option) {
      searchParams.set(type, option as string);
      setSearchParams(searchParams);
    }
  }, [option]);

  const handleOptions = (op: string, visualOp: string) => {
    selectOption(op);
    setVisualOption(visualOp);
  };

  const handleDeleteOption = () => {
    const params = new URLSearchParams(searchParams);
    if (params.has(type)) params.delete(type);
    selectOption(null);
    setVisualOption(null);
    setSearchParams(params);
  };

  return (
    <span className={Style.select_content} ref={containerRef}>
      {option 
        ? <button onClick={handleDeleteOption} type="button" className={Style.select_content_close}>X</button> 
        : null}
      <input type="checkbox" checked={toggle} readOnly name={name} className={Style.select_check}/>
      <span className={option? Style.select_selection_op : Style.select_selection}>
        <span className={option ? Style.select_render_option : Style.select_render}>{visualOption ? visualOption : name}</span>
      </span>
      <div className={Style.select_dropdown}>
        {toggle && (
          <div className={Style.search_dropdown}>
            <input type="search" className={Style.search_dropdown_input} />
            <img src={SearchIcon} alt="search" className={Style.search_dropdown_icon} />
            <div className={Style.select_dropdown_result}>
              <ul className={Style.search_dropdown_ul}>
                {results.map(res => (
                  <li key={res.value} onClick={() => handleOptions(res.value, res.visualString)} className={option === res.value ? Style.select_dropdown_result_select : Style.none}>
                    <span>{res.visualString}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </span>
  );
};

export default FiltersDropdown;