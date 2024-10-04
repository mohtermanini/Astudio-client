import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

import { useDebounce } from "use-debounce";

export default function DebouncedSearchBox({ methods, label, name, groupClassName, ...props }) {
    const [text, setText] = useState("");
    const [debouncedText] = useDebounce(text, 500);
    const value = methods.watch(name);

    useEffect(() => {
        methods.setValue(name, debouncedText);
    }, [debouncedText]);

    useEffect(() => {
        setText(value);
    }, [value]);

    return (
        <Form.Group className={`text-start form-group mb-0 ${groupClassName ?? ""}`}>
            {label && <Form.Label>{label}</Form.Label>}
            <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-5">
                <span className="path1"></span>
                <span className="path2"></span>
            </i>
            <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`form-control`}
                {...props}
            />
        </Form.Group>
    )
}
