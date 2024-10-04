import React, { useEffect, useMemo } from 'react'

import SelectField from '../ui/Forms/SelectField';
import { GENDERS_DATA } from '@/features/users/data/genders-data';

export default function GenderFilter({ methods, ...props }) {

    useEffect(() => {
        if (GENDERS_DATA) {
            methods.setValue('gender', null);
        }
    }, [GENDERS_DATA, methods]);

    return (
        <>
            <SelectField name="gender" label="" data={GENDERS_DATA} methods={methods} {...props} />
        </>
    )
}
