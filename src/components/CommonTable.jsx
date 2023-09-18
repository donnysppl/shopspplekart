"use client";

import { useState } from "react";
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'


export default function CommonTable({ data, columns, loading }) {

  const [sorting, setSorting] = useState([]);
  const [filterimg, setfilterimg] = useState('')


  const table = useReactTable({
    data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),
    state: { sorting, globalFilter: filterimg },
    onSortingChange: setSorting, getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setfilterimg
  })

  return (
    <div className="mt-5">

      <div>
        <div className="table-show-inp w-40 float-left mb-5">
          <select className="form-inp"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="relative search-table-inp max-w-md float-right mb-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="table-search" className="form-inp ps-14" placeholder="Search for items" value={filterimg} onChange={(e) => setfilterimg(e.target.value)} />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-500">

        {
          loading ? 'Loading...' : null
        }



        <thead className="text-xs text-gray-300 uppercase bg-gray-900">
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th className="px-6 py-4" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]
                    }
                  </th>
                ))}
              </tr>
            ))
          }
        </thead>
        <tbody>

          {table.getRowModel().rows.map(row => (
            <tr className="border-b border-gray-500 hover:bg-gray-800" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className="px-6 py-4 text-sm" key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))
          }

        </tbody>
        
      </table>

      <div className="btn-pagenation flex justify-between items-center mt-3">
        <div>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => table.setPageIndex(0)} className="py-2 px-3 border rounded-md text-sm">{'<<'}</button>
          <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="py-2 px-3 border rounded-md text-sm">{'<'}</button>
          <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="py-2 px-3 border rounded-md text-sm">{'>'}</button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="py-2 px-3 border rounded-md text-sm">{'>>'}</button>
        </div>

      </div>

    </div>

  )
}