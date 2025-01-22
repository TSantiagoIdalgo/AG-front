 
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-dropdown.module.css';
import { useOutClick } from "#modules/catalogue/hooks/use-out-click.ts";

interface IFiltersDropdown {
  name: string;
  results: string[]
}
const FiltersDropdown = ({ name, results }: IFiltersDropdown): React.JSX.Element => {
  const [option, selectOption] = React.useState<string>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const toggle = useOutClick(containerRef);
  const [checked, handleChecked] = React.useState(toggle);

  return (
    <span className={Style.select_content} ref={containerRef}>
      {option 
        ? <button onClick={() => selectOption(undefined)} type="button" className={Style.select_content_close}>X</button> 
        : null}
      <input type="checkbox" checked={checked} onChange={() => handleChecked(toggle)} name={name} className={Style.select_check}/>
      <span className={option? Style.select_selection_op : Style.select_selection}>
        <span className={option ? Style.select_render_option : Style.select_render}>{option ? option : name}</span>
      </span>
      <div className={Style.select_dropdown}>
        {toggle && (
          <div className={Style.search_dropdown}>
            <input type="search" className={Style.search_dropdown_input} />
            <img src={SearchIcon} alt="search" className={Style.search_dropdown_icon} />
            <div className={Style.select_dropdown_result}>
              <ul className={Style.search_dropdown_ul}>
                {results.map(res => (
                  <li key={res} onClick={() => selectOption(res)} className={option === res ? Style.select_dropdown_result_select : Style.none}>
                    <span>{res}</span>
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