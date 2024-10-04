import React from 'react'

import { Pagination } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

import { usePagination } from '@/common/contexts/PaginationProvider';

export default function DataTablePagination({ total }) {
    const { page: currentPage, setPage, pageSize } = usePagination();
    const totalPages = Math.ceil(total / pageSize) || 0;

    const maxPagesToShow = 4;

    function onPageChange(newPage) {
        setPage(newPage);
    }

    const createPaginationItems = () => {
        const paginationItems = [];

        paginationItems.push(
            <Pagination.Item
                key={1}
                active={1 === currentPage}
                onClick={() => onPageChange(1)}
            >
                1
            </Pagination.Item>
        );

        const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2));

        if (startPage > 2) {
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages - 1) {
            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }

        if (totalPages > 1) {
            paginationItems.push(
                <Pagination.Item
                    key={totalPages}
                    active={totalPages === currentPage}
                    onClick={() => onPageChange(totalPages)}

                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return paginationItems;
    };

    return (
        <Pagination className="custom-pagination justify-content-center">
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaArrowLeft />
            </Pagination.Prev>
            {createPaginationItems()}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaArrowRight />
            </Pagination.Next>
        </Pagination>
    );
}
