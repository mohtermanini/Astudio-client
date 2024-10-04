import React from 'react'

import { Form } from 'react-bootstrap'

export default function HiddenField({ name, methods, ...props }) {
    const { register } = methods;

    return (
        <Form.Control type="hidden" {...register(name)} {...props}
        />
    )
}
