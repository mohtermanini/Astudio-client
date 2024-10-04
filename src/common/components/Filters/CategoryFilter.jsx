import React, { useMemo } from 'react'
import { useGetCategoriesQuery } from '@/features/categories/redux/categoryExtendedApiSlice';
import SelectField from '../ui/Forms/SelectField';

export default function CategoryFilter({ methods, item, multiple, ...props }) {
    const { data: categories, isFetching: isCategoriesFetching } = useGetCategoriesQuery();
    const categoriesData = useMemo(() => {
        if (categories) {
            const formattedCategories = [{ label: "Any", value: null },
            ...categories?.map((category) => ({ label: category, value: category }))
            ];
            return formattedCategories;
        }
    }, [categories]);

    return (
        <>
            <SelectField name="category" label="" data={categoriesData} isLoading={isCategoriesFetching} methods={methods} {...props} />
        </>
    )
}
