"use client";

import React, { createContext, useContext, useState } from 'react'

const FiltersContext = createContext();

export default function FiltersProvider({ children }) {
    const [filters, _setFilters] = useState(null);
    const [isFiltersReset, setIsFiltersReset] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);

    function changeLoadingstate(isLoading) {
        setIsDataLoading(isLoading);
    }

    function setFilters(data) {
        _setFilters(data);
    }

    function resetFilters() {
        _setFilters(null);
        setIsFiltersReset(true);
    }

    function removeFilter(key) {
        const newFilters = { ...filters };
        delete newFilters[key];
        _setFilters(newFilters);
    }

    return (
        <FiltersContext.Provider value={{ filters, setFilters, isFiltersReset, setIsFiltersReset, resetFilters, removeFilter, isDataLoading, changeLoadingstate }} >
            {children}
        </FiltersContext.Provider>
    );
}

export function useFilters() {
    return useContext(FiltersContext);
}