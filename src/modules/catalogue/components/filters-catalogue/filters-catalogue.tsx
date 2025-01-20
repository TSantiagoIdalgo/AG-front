import * as libs from '../../libs/catalogue-libs';
import React from "react";
import SearchIcon from '#assets/icons/search.svg';
import Style from './filters-catalogue.module.css';

const FiltersDropdown = () => {
  const [showFilters, handleShowFilters] = libs.useState(false);
  
  return (
    <span className={Style.select_content} >
      <input 
        type="radio" 
        onChange={(event) => handleShowFilters(event.target.checked)} 
        name='filters' 
        className={Style.select_check}/>
      <span className={Style.select_selection}>
        <span className={Style.select_render}>Sistemas</span>
      </span>
      <div className={Style.select_dropdown}>
        {showFilters && (
          <div className={Style.search_dropdown}>
            <input type='search' className={Style.search_dropdown_input}/>
            <img src={SearchIcon} alt="search" className={Style.search_dropdown_icon} />
            <div className={Style.select_dropdown_result}>
              <ul>
                <li>PC</li>
                <li>Mac</li>
                <li className={Style.select_dropdown_result_select}>Linux</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </span>
  );
};

export default function FiltersCatalogue(): React.JSX.Element {

  return (
    <div className={Style.filters}>
      <form name='filters'>
        <div className={Style.seach_title}>
          <FiltersDropdown/>
          <FiltersDropdown/>
          

        </div>
      </form>
    </div>
  );
}