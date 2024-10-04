import DropdownFilter, { DropdownFilterFields } from '@/common/components/ui/Forms/DropdownFilter'
import React, { useEffect } from 'react'
import SearchComponent from '@/common/components/ui/Forms/SearchComponent';
import { Spinner } from 'react-bootstrap';
import DateTimeUtils from '@/common/utils/DateTimeUtils';
import { useFilters } from '@/common/contexts/FiltersProvider';
import PageSizeFilter from '@/common/components/Filters/PageSizeFilter';
import { APP_CONFIG } from '@/common/config/app-config';
import { usePagination } from '@/common/contexts/PaginationProvider';

const pageSizes = APP_CONFIG.tables.pageSizes;

export default function UsersListFilters({ methods, isLoading }) {
    const { watch, setValue } = methods;
    const fieldNames = ['username', 'email', 'birthDate', 'gender'];
    const { setFilters, resetFilters } = useFilters();
    const { setPage } = usePagination();

    const watchedValues = fieldNames.reduce((acc, field) => {
        acc[field] = watch(field);
        return acc;
    }, {});

    const resetFields = (excludedField) => {
        fieldNames.forEach(field => {
            if (field !== excludedField) {
                setValue(field, field === "birthDate" || field === "gender" ? null : "");
            }
        });
    };

    const handleFilterUpdate = (field, value) => {

        resetFields(field);
        if (value) {
            let formattedValue = value;
            if (field === "birthDate") {
                formattedValue = DateTimeUtils.removePrefixedZeros(value);
            }
            setPage(1);
            setFilters({ key: field, value: formattedValue });
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
        if (watchedValues.username) {
            handleFilterUpdate("username", watchedValues.username);
        }
    }, [watchedValues.username]);

    useEffect(() => {
        if (watchedValues.email) {
            handleFilterUpdate("email", watchedValues.email);
        }

    }, [watchedValues.email]);

    useEffect(() => {
        if (watchedValues.birthDate) {
            handleFilterUpdate("birthDate", watchedValues.birthDate);
        }

    }, [watchedValues.birthDate]);

    useEffect(() => {
        if (watchedValues.gender?.value) {
            handleFilterUpdate("gender", watchedValues.gender?.value);
        }

    }, [watchedValues.gender]);


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
            <DropdownFilter methods={methods} label="User Name" name="username" type={DropdownFilterFields.text} />
            <DropdownFilter methods={methods} label="Email" name="email" type={DropdownFilterFields.text} />
            <DropdownFilter methods={methods} label="Birth Date" name="birthDate" type={DropdownFilterFields.date} />
            <DropdownFilter methods={methods} label="Gender" name="gender" type={DropdownFilterFields.select} />
            {isLoading && (
                <Spinner size='sm' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>)
}
