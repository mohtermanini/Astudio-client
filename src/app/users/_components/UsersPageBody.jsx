"use client";

import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form';

import { useFilters } from '@/common/contexts/FiltersProvider';
import DataTable from '@/common/components/ui/Tables/DataTable';
import { usePagination } from '@/common/contexts/PaginationProvider';
import { USER_LIST_COLUMNS } from '@/features/users/data/tables/user-list-columns';
import { useGetUsersQuery } from '@/features/users/redux/userExtendedApiSlice';
import ObjectUtils from '@/common/utils/ObjectUtils';
import UsersListFilters from './UsersListFilters';
import { APP_CONFIG } from '@/common/config/app-config';

const pageSizes = APP_CONFIG.tables.pageSizes;

export default function UsersPageBody() {
    const methods = useForm();
    const pageSizeValue = methods.watch("limit");
    const { page } = usePagination();
    const { filters } = useFilters();

    const { data: usersData, isLoading: isUsersLoading,
        isFetching: isUsersFetching
    } = useGetUsersQuery(
        { limit: pageSizeValue ?? { label: pageSizes[0], value: pageSizes[0] }, skip: page - 1, ...filters });

    const searchByValue = methods.watch("searchBy");

    let filteredUsers = useMemo(() => {
        if (usersData) {
            if (searchByValue) {
                const searchByLowerCase = searchByValue.toLowerCase();

                return usersData.users.filter(user =>
                    USER_LIST_COLUMNS.some(column =>
                        ObjectUtils.getValueByPath(user, column.path)?.toString().toLowerCase().includes(searchByLowerCase)
                    )
                );
            }
            return usersData?.users
        }
        return undefined;
    }, [searchByValue, usersData]);

    return (
        <>
            <UsersListFilters methods={methods} isLoading={isUsersFetching} />

            <div>
                <DataTable data={filteredUsers} columns={USER_LIST_COLUMNS} total={usersData?.total}
                    isLoading={isUsersLoading}
                    isFetching={isUsersFetching}
                />
            </div >
        </>
    )
}
