import DropdownFilter, { DropdownFilterFields } from '@/common/components/ui/Forms/DropdownFilter'
import React, { useEffect } from 'react'
import SearchComponent from '@/common/components/ui/Forms/SearchComponent';
import { Spinner } from 'react-bootstrap';
import { useFilters } from '@/common/contexts/FiltersProvider';
import PageSizeFilter from '@/common/components/Filters/PageSizeFilter';
import { APP_CONFIG } from '@/common/config/app-config';
import { usePagination } from '@/common/contexts/PaginationProvider';
import CategoryFilter from '@/common/components/Filters/CategoryFilter';

const pageSizes = APP_CONFIG.tables.pageSizes;

export default function ProductsListFilters({ methods, isLoading }) {
    const { watch, setValue } = methods;
    const fieldNames = ['q', 'category'];
    const { setFilters, resetFilters } = useFilters();
    const { setPage } = usePagination();

    const watchedValues = fieldNames.reduce((acc, field) => {
        acc[field] = watch(field);
        return acc;
    }, {});

    const resetFields = (excludedField) => {
        fieldNames.forEach(field => {
            if (field !== excludedField) {
                setValue(field, "");
            }
        });
    };

    const handleFilterUpdate = (field, value) => {

        resetFields(field);
        if (value) {
            setPage(1);
            setFilters({ [field]: value });
        }
    };

    useEffect(() => {
        const areAllFieldsEmpty = Object.values(watchedValues).every(value =>
            value === null || value === "" || (typeof value === "object" && value?.value === null)
        );
        if (areAllFieldsEmpty) {
            resetFilters();
        }
    }, [watchedValues]);

    useEffect(() => {
        if (watchedValues.q) {
            handleFilterUpdate("q", watchedValues.q);
        }
    }, [watchedValues.q]);

    useEffect(() => {
        if (watchedValues.category?.value) {
            handleFilterUpdate("category", watchedValues.category);
        }

    }, [watchedValues.category]);

    useEffect(() => {
        const pageSizesData = pageSizes.map(size => ({ label: size, value: size }));
        methods.setValue('limit', pageSizesData[0]);
    }, []);

    return (
        <div className="d-flex align-items-center gap-3 mb-3">
            <PageSizeFilter methods={methods} />
            <span>Entries</span>
            <div className="vr" style={{ width: "2px" }}></div>
            <div className='d-flex gap-2 align-items-center'>
                <SearchComponent methods={methods} name="searchBy" />
            </div>
            <div className="vr" style={{ width: "2px" }}></div>
            <DropdownFilter methods={methods} label="Title" name="q" type={DropdownFilterFields.text}
                placeholder="Search by title..."
            />
            <CategoryFilter methods={methods} />

            {isLoading && (
                <Spinner size='sm' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>)
}
