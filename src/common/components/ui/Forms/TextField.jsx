import React from 'react'

import { FloatingLabel, Form } from 'react-bootstrap'
import DataTypesUtils from '@/common/utils/DataTypesUtils';
import StringUtils from '../../../utils/StringUtils';

export default function TextField({ name, label, methods, groupClassName, floatingLabel = false, ...props }) {
    const { formState: { errors } } = methods;
    const { required } = props;

    return (
        <Form.Group className={`text-start form-group mb-0 ${groupClassName ?? ""}`}>

            {!floatingLabel && (
                <>
                    {label && <Form.Label>{label} {required && <span className="tx-danger">*</span>}</Form.Label>}
                    <InputField name={name} methods={methods} {...props} />
                </>
            )}

            {floatingLabel && (
                <FloatingLabel controlId={name} label={<span className='text-grey'>{label} {required && <span>*</span>}</span>} >
                    <InputField name={name} methods={methods} {...props} />
                </FloatingLabel>
            )}

            <Form.Control.Feedback className={`invalid-feedback ${errors[name]?.message ? "d-block" : "d-none"}`}>
                {errors[name]?.message}
            </Form.Control.Feedback>

        </Form.Group>
    )
}

const InputField = ({ name, methods, ...props }) => {
    const { register, formState: { errors }, watch } = methods;
    const value = watch(name);
    const { readOnly } = props;

    return (
        <>
            {readOnly ? (!DataTypesUtils.isDefined(value) || StringUtils.isEmpty(value) ? "N/A" : value) :
                (
                    <Form.Control
                        className={`form-control ${errors[name] ? 'invalid' : ''}`}
                        style={{ borderColor: "#ccc" }}
                        {...register(name)}
                        {...props}
                    />
                )
            }
        </>
    )
}
