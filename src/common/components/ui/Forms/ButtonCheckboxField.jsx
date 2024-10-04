import React from 'react'

import { Button, Form } from 'react-bootstrap'
import classNames from 'classnames'

export default function ButtonCheckboxField({ name, activeLabel, inActiveLabel, groupClassName, className, methods, ...props }) {
    const { register, checked, watch } = methods;
    const value = watch(name);

    const btnClasses = classNames(
        {
            'primary': value,
            'outline-danger': !value,
        }
    )

    return (
        <>
            <Form.Group className={`text-start form-group ${groupClassName ?? ""}`}>
                <Form.Check type="checkbox" className="btn-check" id={name}
                    {...register(name)}
                    {...props}
                />
                <Button variant={`${btnClasses} ${className}`} as="label" htmlFor={name}>
                    {value ? activeLabel : inActiveLabel}
                </Button >
            </Form.Group >
        </>
    )
}
