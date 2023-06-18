import { Pagination } from 'nestjs-typeorm-paginate';

export const handlePaginatedData = <T>(
  data: Pagination<T>
): PaginationType<T> => {
  return {
    items: data.items,
    currentPage: data.meta.currentPage,
    itemCount: data.meta.itemCount,
    itemsPerPage: data.meta.itemsPerPage,
    totalPages: data.meta.totalPages,
    totalItems: data.meta.totalItems
  };
};

export type PaginationType<T> = {
  items: T[];
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
