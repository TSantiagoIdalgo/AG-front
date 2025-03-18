/* eslint-disable max-statements */
/* eslint-disable consistent-return */
import * as libs from '#modules/catalogue/libs/catalogue-libs';
import React, { useEffect } from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-genre-dropdown.module.css';
import { useOutClick } from "#modules/catalogue/hooks/use-out-click.ts";
import { useSetGenres } from "#modules/catalogue/hooks/use-set-genres.ts";

interface IFiltersDropdown {
  name: string;
  results: string[]
}
const FiltersGenreDropdown = ({ name, results }: IFiltersDropdown): React.JSX.Element => {
  const initialPadding = 15, maxGenres = 3;
  const { selectedOptions, handleOptionSelect, handleDeleteOption } = useSetGenres();
  const [searchValue, setSearchValue] = libs.useState<string>("");
  const [searchresults, setSearchResults] = libs.useState<string[]>(results);
  const [padding, setPadding] = React.useState<number>(initialPadding);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const toggle = useOutClick(containerRef);
  const [checked, handleChecked] = React.useState(toggle);

  useEffect(() => {
    if (dropdownRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setPadding((dropdownRef.current?.offsetWidth as number) + initialPadding);
      });
      resizeObserver.observe(dropdownRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [selectedOptions]);

  useEffect(() => {
    setSearchResults(results);
  }, [results.length]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    if (!value.length) return setSearchResults(results);
    const filteredResults = searchresults.filter(result => result.toLowerCase().includes(value.toLowerCase()));
    return setSearchResults(filteredResults);
  };

  return (
    <span className={Style.container} ref={containerRef}>
      {selectedOptions.length ? 
        <button onClick={handleDeleteOption} type="button" className={Style.container_close}>X</button> 
        : null}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleChecked(toggle)}
        name={name}
        className={Style.select_check}
      />
      <span className={selectedOptions.length? Style.select_option_selected : Style.select_option}>
        <input 
          disabled={selectedOptions.length >= maxGenres} 
          style={{paddingLeft: `${padding}px`}} 
          className={Style.search} 
          type="text" 
          onChange={handleSearch} 
          value={searchValue}
          placeholder={selectedOptions.length ? "" : "Generos..."}/>
        <div className={Style.search_option} ref={dropdownRef}>
          {selectedOptions.map((op, index) => (
            <div className={Style.search_options} key={`${op}-${index}`}>
              <button onClick={() => handleOptionSelect(op)} type="button">X</button>
              <span>{op}</span>
            </div>
          ))}
        </div>
      </span>
      <div className={Style.dropdown}>
        {toggle && (
          <div className={Style.dropdown_search}>
            <input type="search" className={Style.search_dropdown_input} />
            <img src={SearchIcon} alt="search" className={Style.search_dropdown_icon} />
            <div className={Style.dropdown_result}>
              <ul className={Style.search_dropdown_ul}>
                {selectedOptions.length >= maxGenres
                  ? "You can only select 3 items"
                  : <>
                    {searchresults.map(res => (
                      <li 
                        key={res}
                        onClick={() => {
                          handleOptionSelect(res);
                          setSearchValue("");
                          setSearchResults(results);
                        }}
                        className={selectedOptions.some(currentOp => currentOp === res) ? Style.dropdown_result_select : undefined}>
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

export default FiltersGenreDropdown;
