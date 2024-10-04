import React from 'react'

import { FloatingLabel, Form } from 'react-bootstrap'
import { ErrorMessage } from '@hookform/error-message'
import DataTypesUtils from '@/common/utils/DataTypesUtils';
import StringUtils from '../../../utils/StringUtils';

export default function DateField({ name, label, methods, groupClassName, floatingLabel = false, ...props }) {
    const { register, formState: { errors }, watch } = methods;
    const { required, readOnly } = props;
    const value = watch(name);

    return (
        <Form.Group className={`text-start form-group mb-0 ${groupClassName ?? ""}`}>

            {!floatingLabel && (
                <>
                    {label && <Form.Label htmlFor={name}>{label} {required && <span className="tx-danger">*</span>}</Form.Label>}
                    {readOnly ? (
                        !DataTypesUtils.isDefined(value) || StringUtils.isEmpty(value) ? "N/A" : value
                    ) :
                        (
                            <Form.Control
                                className={`form-control ${errors[name] ? 'invalid' : ''}`}
                                type="date"
                                {...register(name)}
                                {...props}
                            />
                        )
                    }
                </>
            )}

            {floatingLabel && (
                <FloatingLabel controlId={name} label={<span className='text-grey'>{label} {required && <span>*</span>}</span>} >
                    {readOnly ? (
                        !DataTypesUtils.isDefined(value) || StringUtils.isEmpty(value) ? "N/A" : value
                    ) :
                        (
                            <Form.Control
                                className={`form-control ${errors[name] ? 'invalid' : ''}`}
                                type="date"
                                {...register(name)}
                                {...props}
                            />
                        )
                    }
                </FloatingLabel>
            )}

            <Form.Control.Feedback className="invalid-feedback">
                <ErrorMessage errors={errors} name={name} />
            </Form.Control.Feedback>
        </Form.Group>
    )
}
