/* eslint-disable max-statements */
import * as libs from '#modules/catalogue/libs/catalogue-libs';
import { FilterObject, IFiltersDropdown } from "#modules/catalogue/interfaces/catalogue.interface.ts"; 
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-dropdown.module.css';
import { useOutClick } from "#modules/catalogue/hooks/use-out-click.ts";

const FiltersDropdown = ({ name, results, type }: IFiltersDropdown): React.JSX.Element => {
  const { searchParams, updateParams, deleteParams } = libs.useChangeSearchParams();
  const [searchValue, setSearchValue] = libs.useState<string>("");
  const [searchresults, setSearchResults] = libs.useState<FilterObject[]>(results);
  const [option, selectOption] = React.useState<string | null>(searchParams.get(type));
  const [visualOption, setVisualOption] = React.useState<string | null>(searchParams.get(type));
  const containerRef = React.useRef<HTMLDivElement>(null);
  const toggle = useOutClick(containerRef);

  libs.useEffect(() => {
    if (type === 'orderBy' && option) {
      updateParams({ [type]: visualOption as string });
    } else if (option) {
      updateParams({ [type]: option });
    }
  }, [option]);

  const handleOptions = (op: string, visualOp: string) => {
    selectOption(op);
    setVisualOption(visualOp);
  };

  const handleDeleteOption = () => {
    deleteParams([{ key: type }]);
    selectOption(null);
    setVisualOption(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    if (!value.length) return setSearchResults(results);
    const filteredResults = searchresults.filter(result => result.value.toLowerCase().includes(value.toLowerCase()));
    return setSearchResults(filteredResults);
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
            <input autoComplete='off' value={searchValue} name='search' onChange={handleSearch} type="search" className={Style.search_dropdown_input} />
            <img src={SearchIcon} alt="search" className={Style.search_dropdown_icon} />
            <div className={Style.select_dropdown_result}>
              <ul className={Style.search_dropdown_ul}>
                {searchresults.map(res => (
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