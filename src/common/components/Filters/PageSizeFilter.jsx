import React, { useEffect, useMemo } from 'react';

import { APP_CONFIG } from '@/common/config/app-config';
import SelectField from '../ui/Forms/SelectField';

export default function PageSizeFilter({ methods, ...props }) {
    const pageSizes = APP_CONFIG.tables.pageSizes;
    const pageSizesData = useMemo(() =>
        pageSizes.map(size => ({ label: size, value: size })),
        [pageSizes]
    );

    useEffect(() => {
        if (pageSizesData.length > 0) {
            methods.setValue('limit', pageSizesData[0]);
        }
    }, [pageSizesData, methods]);

    return (
        <SelectField name="limit" label="" data={pageSizesData} methods={methods} {...props} />
    );
}
