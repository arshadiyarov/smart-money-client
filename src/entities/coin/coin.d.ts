export interface CoinType {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: Coin[];
  number: number;
  sort: Sort2;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Coin {
  id: number;
  symbol: string;
  name: string;
  lastPrice: number;
  volume: number;
  priceChange: number;
  priceChangePercent: number;
  highPrice: number;
  lowPrice: number;
  lastUpdate: string;
}

export interface Sort2 {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
