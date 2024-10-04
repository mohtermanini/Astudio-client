import React from 'react'

import { Dropdown } from 'react-bootstrap'

import DateField from '@/common/components/ui/Forms/DateField';
import GenderFilter from '@/common/components/Filters/GenderFilter';
import DebouncedSearchBox from '@/common/components/ui/Forms/DebouncedSearchBox';

export const DropdownFilterFields = {
    text: "text",
    date: "date",
    select: "select"
}

export default function DropdownFilter({ methods, label, name, type = DropdownFilterFields.text, placeholder }) {

    return (
        <Dropdown className="header-element header-shortcuts-dropdown" align={'start'}>
            <Dropdown.Toggle
                className="header-link btn btn-white btn-icon-text"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                id="notificationDropdown"
                aria-expanded="false"
                variant="default"
            >
                <i className="fe fe-filter me-2"></i> {label}
            </Dropdown.Toggle>

            <Dropdown.Menu className="main-header-dropdown header-shortcuts-dropdown dropdown-menu py-0 dropdown-menu-end" style={{ width: "22rem" }}>
                <div className="main-header-shortcuts p-3 overflow-visible" id="header-shortcut-scroll">
                    <p className='mb-2 fw-bold'>{label}</p>
                    <div className="row g-2">
                        <div className='col'>
                            {type === DropdownFilterFields.text && <DebouncedSearchBox name={name} label="" placeholder={placeholder ?? `Search by exact ${label.toLowerCase()}...`} methods={methods} />}
                            {type === DropdownFilterFields.date && <DateField name={name} label="" methods={methods} />}
                            {type === DropdownFilterFields.select && <GenderFilter name={name} label="" methods={methods} />}
                        </div>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown >
    )
}
