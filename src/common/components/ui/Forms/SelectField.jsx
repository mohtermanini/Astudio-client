import React, { Fragment, useEffect } from 'react'

import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Select from "react-select";
import DataTypesUtils from '@/common/utils/DataTypesUtils';
import StringUtils from '../../../utils/StringUtils';

export default function SelectField({ name, label, data, methods, groupClassName, ...props }) {
    const { control, formState: { errors }, watch } = methods;
    const { isLoading = false, required, readOnly, Options } = props;
    const value = watch(name);

    const customStyles = {
        menuList: baseStyles => ({
            ...baseStyles,
            ...props.menuStyle
        }),
    };

    useEffect(() => {
        if (data) {
            if (!methods.getValues(name)) {
                methods.setValue(name, data[0]);
            }
        }
    }, [data]);

    return (
        <Form.Group className={`text-start form-group mb-0 ${groupClassName ?? ""}`}>
            {label && <Form.Label>{label} {required && <span className="tx-danger">*</span>}</Form.Label>}

            {readOnly ? (
                !DataTypesUtils.isDefined(value?.label) || StringUtils.isEmpty(value?.label) ? "N/A" : value?.label
            ) :
                (
                    <div className='d-flex align-items-stretch gap-2'>
                        <Controller
                            control={control}
                            name={name}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Select
                                    instanceId={`unique-instance-${name}`}
                                    isSearchable={true}
                                    options={data}
                                    className="default basic-multi-select flex-grow-1"
                                    menuPlacement='auto'
                                    classNamePrefix="Select2"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    innerRef={ref}
                                    styles={customStyles}
                                    {...props}
                                />
                            )}
                        />
                        {Options?.map((option, index) => (
                            <Fragment key={index}>
                                {option}
                            </Fragment>
                        ))}
                    </div>
                )
            }

            <Form.Control.Feedback className={`invalid-feedback ${errors[name]?.message ? "d-block" : ""}`}>
                {errors[name]?.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}
