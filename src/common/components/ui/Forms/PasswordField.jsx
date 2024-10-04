import React from 'react'

import { Form } from 'react-bootstrap'
import { ErrorMessage } from '@hookform/error-message'

export default function PasswordField({ name, label, methods, ...props }) {
    const { register, formState: { errors } } = methods;
    const { required } = props;

    return (
        <Form.Group className="text-start form-group">
            <Form.Label>{label} {required && <span className="tx-danger">*</span>}</Form.Label>
            <Form.Control
                type="password"
                className={`form-control ${errors[name] ? 'invalid' : ''}`}
                {...register(name)}
                {...props}
            />
            <Form.Control.Feedback className="invalid-feedback">
                <ErrorMessage errors={errors} name={name} />
            </Form.Control.Feedback>
        </Form.Group>
    )
}
