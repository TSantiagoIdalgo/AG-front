import * as libs from '../libs/catalogue-libs';

export const usePaginatePerPage = (currentPage: number, totalPages: number, setCurrentPage: (total: number) => void)  => {
  const [paginates, setPaginates] = libs.useState<(number | null)[]>([]);
  const initValue = 1, zero = 0;
  const previous = currentPage > initValue ? currentPage - initValue : null;
  const next = totalPages > currentPage ?  currentPage + initValue : null;

  libs.useEffect(() => {
    setPaginates([previous, currentPage, next]);
    if (currentPage > totalPages) setCurrentPage(totalPages);
    // eslint-disable-next-line no-useless-return
    if (totalPages === zero) return;
    else if (currentPage === zero) setCurrentPage(initValue);
  },[currentPage]);

  return { paginates };
};