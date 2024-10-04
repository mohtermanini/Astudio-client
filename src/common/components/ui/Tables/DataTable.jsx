import React from 'react'

import { Spinner, Table } from 'react-bootstrap'

import DataTablePagination from './DataTablePagination';
import ObjectUtils from '@/common/utils/ObjectUtils';
import TruncatedText from '../Text/TruncatedText';

export default function DataTable({ data, columns, total, isLoading, isFetching }) {

  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr className="table-primary text-uppercase">
            {columns.map(column => (
              <th key={column.label} className='bg-blue border-end border-2 fw-bold'>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          )
          }
          {!isLoading && data?.length === 0 && (
            <tr>
              <td align='center' colSpan={999}>
                <span>No Data</span>
              </td>
            </tr>
          )}
          {!isLoading && data?.length > 0 && data?.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={`border-end border-2 border-bottom ${isFetching ? 'text-muted' : ''}`}>
                  <TruncatedText text={column.path ? ObjectUtils.getValueByPath(item, column.path) ?? "N/A" : "N/A"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {!isLoading && <DataTablePagination total={total} />}
    </>
  )
}
