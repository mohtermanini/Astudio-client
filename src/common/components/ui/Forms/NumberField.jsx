import React from 'react'

import { Form } from 'react-bootstrap'
import { ErrorMessage } from '@hookform/error-message'
import DataTypesUtils from '@/common/utils/DataTypesUtils';
import StringUtils from '../../../utils/StringUtils';

export default function NumberField({ name, label, methods, ...props }) {
    const { register, formState: { errors }, watch } = methods;
    const { required, readOnly } = props;
    const value = watch(name);

    return (
        <Form.Group className="text-start form-group">
            <Form.Label>{label} {required && <span className="tx-danger">*</span>}</Form.Label>
            {readOnly ? (
                !DataTypesUtils.isDefined(value) || StringUtils.isEmpty(value) ? "N/A" : value
            ) :
                (
                    <Form.Control
                        className={`form-control ${errors[name] ? 'invalid' : ''}`}
                        type="number"
                        {...register(name, { valueAsNumber: true })}
                        {...props}
                    />
                )
            }
            <Form.Control.Feedback className="invalid-feedback">
                <ErrorMessage errors={errors} name={name} />
            </Form.Control.Feedback>
        </Form.Group>
    )
}
