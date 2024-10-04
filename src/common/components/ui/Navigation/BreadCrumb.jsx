import React, { Fragment } from 'react'

export default function BreadCrumb({ items, options }) {
    const breadCrumbExists = items?.length > 1;
    const mainItem = items?.[items.length - 1];

    return (
        <div className={`d-flex align-items-center justify-content-between flex-wrap row-gap-3 column-gap-4 page-header-breadcrumb mb-3`}>
            <div>
                {breadCrumbExists && (
                    <ol className="breadcrumb mb-0">
                        {items?.map((item, index) => (
                            index < items.length - 1 ? (
                                <li key={index} className="breadcrumb-item">
                                    <a href={item.link}>{item.title}</a>
                                </li>
                            ) : null
                        ))}
                        <li className="breadcrumb-item active" aria-current="page">
                            <span className=' bg-yellow fw-bold'>{mainItem.title}</span></li>
                    </ol>
                )}
            </div>
            {options && (
                <div className="d-flex justify-content-center gap-2">
                    {options.map((option, index) => <Fragment key={index}>{option}</Fragment>)}
                </div>
            )
            }
        </div>
    )
}