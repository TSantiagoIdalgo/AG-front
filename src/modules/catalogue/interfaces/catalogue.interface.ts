export interface FilterObject {
  value: string;
  visualString: string
}

export interface IFiltersDropdown {
  name: string;
  results: FilterObject[];
  type: 'platform' | 'system' | 'orderBy';
}