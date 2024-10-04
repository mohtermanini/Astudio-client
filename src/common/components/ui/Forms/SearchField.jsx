import React from 'react'

import { Form } from 'react-bootstrap'

export default function SearchField({ name, onSubmit, methods, btnLabel = "Search", withIcon = false, isLoading, ...props }) {
    const { register, handleSubmit } = methods;

    return (
        <div className="input-group">
            <Form.Control
                className={`form-control`}
                {...register(name)}
                {...props}
            />
            <span>

                <button
                    className="btn ripple btn-primary"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                >
                    {withIcon && <i className='fe fe-search'></i>}
                    {btnLabel ?? null}
                </button>
            </span>
        </div>
    )
}
