"use client";

import React, { createContext, useContext, useState } from 'react'

import { APP_CONFIG } from '@/common/config/app-config';

const PaginationContext = createContext();

export default function PaginationProvider({ initPageSize, children }) {
    const [page, _setPage] = useState(1);
    const [pageSize, _setPageSize] = useState(initPageSize ?? APP_CONFIG.tables.pageSizes[0]);

    function setPage(newPage) {
        if (newPage > 0) {
            _setPage(newPage);
        }
    }

    function setPageSize(newPageSize) {
        if (newPageSize > 0) {
            _setPageSize(newPageSize);
        }
    }

    return (
        <PaginationContext.Provider value={{ page, pageSize, setPage, setPageSize }} >
            {children}
        </PaginationContext.Provider>
    );
}

export function usePagination() {
    return useContext(PaginationContext);
}