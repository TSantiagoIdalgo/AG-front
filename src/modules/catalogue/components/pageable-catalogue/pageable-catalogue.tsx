import * as libs from '#modules/catalogue/libs/catalogue-libs';
import React from 'react';
import Style from './pageable-catalogue.module.css';
import arrowIcon from '#assets/icons/icon-arrow.svg';
import { usePaginatePerPage } from '#modules/catalogue/hooks/use-paginate-per-page.ts';

interface IPageableCatalogue {
    numberOfPages: number
}

export const PageableCatalogue: React.FC<IPageableCatalogue> = ({ numberOfPages }): React.JSX.Element => {
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);
  const firstPage = 1, initPage = 0, middlePage = 2;
  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  const { paginates } = usePaginatePerPage(currentPage, numberOfPages, setCurrentPage);
  return (
    <div className={Style.paginate}>
      {currentPage === firstPage || currentPage === initPage
        ? null
        : <button 
          className={Style.prev} 
          onClick={() => setCurrentPage(currentPage - firstPage)}>
          <img src={arrowIcon} alt="back" />
        </button>}

      <div className={Style.paginate_list}>
        {currentPage > middlePage
          ? <h2 className={Style.paginate_list_total}
            onClick={() => {
              searchParams.set("page", "1");
              setSearchParams(searchParams);
            }}><p>{firstPage}</p><span className={Style.return_to_first_page}>...</span></h2>
          : null}
        {paginates?.map((paginate) => paginate !== null && (
          <h2 key={paginate} 
            className={`${paginate === currentPage 
              ? Style.paginate_list_current
              : Style.paginate_list_select}`}
            onClick={() => {
              searchParams.set("page", paginate.toString());
              setSearchParams(searchParams);
            }}>
            <span>{paginate}</span>
          </h2>
        ))}
        {currentPage === numberOfPages - firstPage || currentPage === numberOfPages
          ? null
          : <h2 className={Style.paginate_list_total}
            onClick={() => {
              searchParams.set("page", numberOfPages.toString());
              setSearchParams(searchParams);
            }}><span>...</span><p>{numberOfPages}</p></h2>}
      </div>

      {currentPage === numberOfPages 
        ? null
        : <button className={Style.next} 
          onClick={() => setCurrentPage(currentPage + firstPage)}>
          <img src={arrowIcon} alt="next"/>
        </button>}
    </div>
  );
};

export default PageableCatalogue;