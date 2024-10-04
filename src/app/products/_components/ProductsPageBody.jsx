"use client";

import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form';

import { useFilters } from '@/common/contexts/FiltersProvider';
import DataTable from '@/common/components/ui/Tables/DataTable';
import { usePagination } from '@/common/contexts/PaginationProvider';
import { useGetProductsQuery } from '@/features/products/redux/productExtendedApiSlice';
import ObjectUtils from '@/common/utils/ObjectUtils';
import { APP_CONFIG } from '@/common/config/app-config';
import { PRODUCT_LIST_COLUMNS } from '@/features/products/tables/product-list-columns';
import ProductsListFilters from './ProductsListFilters';

const pageSizes = APP_CONFIG.tables.pageSizes;

export default function ProductsPageBody() {
    const methods = useForm();
    const pageSizeValue = methods.watch("limit");
    const { page } = usePagination();
    const { filters } = useFilters();

    const { data: productsData, isLoading: isProductsLoading,
        isFetching: isProductsFetching
    } = useGetProductsQuery(
        { limit: pageSizeValue ?? { label: pageSizes[0], value: pageSizes[0] }, skip: page - 1, ...filters });

    const searchByValue = methods.watch("searchBy");

    let filteredProducts = useMemo(() => {
        if (productsData) {
            if (searchByValue) {
                const searchByLowerCase = searchByValue.toLowerCase();

                return productsData.products.filter(product =>
                    PRODUCT_LIST_COLUMNS.some(column =>
                        ObjectUtils.getValueByPath(product, column.path)?.toString().toLowerCase().includes(searchByLowerCase)
                    )
                );
            }
            return productsData?.products
        }
        return undefined;
    }, [searchByValue, productsData]);

    return (
        <>
            <ProductsListFilters methods={methods} isLoading={isProductsFetching} />

            <div>
                <DataTable data={filteredProducts} columns={PRODUCT_LIST_COLUMNS} total={productsData?.total}
                    isLoading={isProductsLoading}
                    isFetching={isProductsFetching}
                />
            </div >
        </>
    )
}
