import { PaginationQuery } from '@todo/shared/models';

export interface TodoQueryParams extends PaginationQuery
{
    search?: string;
}