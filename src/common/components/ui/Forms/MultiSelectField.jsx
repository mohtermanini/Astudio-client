import React, { Fragment } from 'react'

import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component'

export default function MultiSelectField({ name, label, data, methods, groupClassName, placeholder, disableSearch = false, ...props }) {
    const { control, formState: { errors }, watch } = methods;
    const { isLoading = false, required, readOnly, Options } = props;

    return (
        <Form.Group className={`text-start form-group mb-0 ${groupClassName ?? ""}`}>
            <div className='d-flex align-items-stretch gap-2'>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <MultiSelect
                            options={data ?? []}
                            className="flex-grow-1"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value ?? []}
                            disableSearch={disableSearch}
                            disabled={isLoading}
                            isLoading={isLoading}
                            labelledBy={placeholder}
                            overrideStrings={{
                                "selectSomeItems": placeholder,
                            }}
                            valueRenderer={(selected, _options) => {
                                return selected?.length
                                    ? <div className='d-flex flex-column'>
                                        <label className='fs-12 text-muted mt-1'>{label}</label>
                                        <span style={{ marginTop: "-2px" }}>{selected?.length} Item{selected?.length > 1 ? "s" : ""} Selected</span>
                                    </div>
                                    : label;
                            }}
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

            <Form.Control.Feedback className={`invalid-feedback ${errors[name]?.message ? "d-block" : ""}`}>
                {errors[name]?.message}
            </Form.Control.Feedback>
            {/* </FloatingLabel> */}
        </Form.Group>
    )
}
