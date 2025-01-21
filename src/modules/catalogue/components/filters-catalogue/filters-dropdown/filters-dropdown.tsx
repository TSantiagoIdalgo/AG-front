/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-dropdown.module.css';

interface IFiltersDropdown {
  name: string;
  currentDropdown: string;
  onChange: (name: string) => void;
  results: string[]
  withSearch?: boolean
}
const FiltersDropdown = ({ name, currentDropdown, onChange, results, withSearch }: IFiltersDropdown): React.JSX.Element => {
  const initialPadding = 15, maxGenres = 3;
  const [option, selectOption] = React.useState<string>();
  const [options, selectOptions] = React.useState<string[]>([]);
  const [padding, setPadding] = React.useState<number>(initialPadding);
  const showFilters = name === currentDropdown;

  const onSelectOption = (op: string) => {
    if (options.some((currentOption) => op === currentOption)) {
      const deleteOptions = options.filter((currentOption) => currentOption !== op);
      selectOptions(deleteOptions);
    }  else selectOptions((prev) => [...prev, op]);
  };

  useEffect(() => {
    const optionElements = document.getElementById("options") as HTMLElement;
    setPadding(optionElements.clientWidth + initialPadding);
  }, [options.length]);

  return (
    <span className={Style.select_content}>
      {option || options.length ? 
        <button onClick={() => withSearch ? selectOptions([]) : selectOption(undefined)} type="button" className={Style.select_content_close}>X</button> 
        : null}
      <input
        type="checkbox"
        checked={showFilters}
        name={name}
        onChange={() => onChange(name)}
        className={Style.select_check}
      />
      <span className={withSearch && (option || options.length) ? Style.select_selection_op : Style.select_selection}>
        {withSearch
          ? <>
            <input disabled={options.length >= maxGenres} style={{paddingLeft: `${padding}px`}} onClick={() => onChange(name)} className={Style.select_search} type="search" placeholder={options.length ? "" : "Generos..."}/>
            <div className={Style.select_search_option} id="options">
              {options.map((op, index) => (
                <div className={Style.select_search_options} key={`${op}-${index}`}>
                  <button onClick={() => onSelectOption(op)} type="button">X</button>
                  <span>{op}</span>
                </div>
              ))}
            </div>
          </>
          : <span className={option ? Style.select_render_option : Style.select_render}>{option ? option : name}</span>
        }
      </span>
      <div className={Style.select_dropdown}>
        {showFilters && (
          <div className={Style.search_dropdown}>
            <input type="search" className={withSearch ? Style.search_dropdown_input_ws : Style.search_dropdown_input} />
            <img src={SearchIcon} alt="search" className={withSearch ? Style.search_dropdown_icon_ws : Style.search_dropdown_icon} />
            <div className={Style.select_dropdown_result}>
              <ul className={withSearch ? Style.search_dropdown_ul_ws : Style.search_dropdown_ul}>
                {options.length >= maxGenres
                  ? "You can only select 3 items"
                  : <>
                    {results.map(res => (
                      <li 
                        key={res}
                        onClick={() => withSearch ? onSelectOption(res) : selectOption(res)}
                        className={option === res || options.some(currentOp => currentOp === res) 
                          ? withSearch ? Style.select_dropdown_result_select_ws  : Style.select_dropdown_result_select 
                          : Style.none}>
                        <span>{res}</span>
                      </li>
                    ))}
                  </>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </span>
  );
};

export default FiltersDropdown;