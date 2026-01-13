// @ts-nocheck

import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { LuChevronsUpDown } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

interface ITableProps {
  columns: any[];
  data: any[];
  intialTotalRows: 5 | 10 | 16;
  filterFn?: () => boolean;
  searchKey?: string;
}

export const Table: React.FC<ITableProps> = ({
  columns,
  data,
  intialTotalRows = 1,
}) => {
  const columnsMemo = useMemo(() => columns, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns: columnsMemo,
      data,
      initialState: {
        pageSize: intialTotalRows,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = state;
  state.pageSize = intialTotalRows;

  return (
    <div className="w-full p-2 overflow-x-auto">
      {/* TABBLE  */}
      <table
        {...getTableProps()}
        className="w-full text-right rounded-md overflow-hidden transition-all"
      >
        {/*  TABLE HEADER  */}
        <thead className="w-full bg-primary text-white">
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-2 py-2 text-[14px] has-focus-visible:outline-2 cursor-pointer "
                >
                  <button
                    tabIndex={0}
                    className="flex justify-between items-center w-full outline-none cursor-pointer font-normal"
                  >
                    {column.render("Header")}
                    <LuChevronsUpDown size={15} />
                  </button>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* TABLE BODY  */}
        <tbody {...getTableBodyProps()}>
          {page?.map((row: any, Idx: number) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`${
                  Idx % 2 ? "bg-white" : "bg-transparent"
                } cursor-pointer hover:bg-primary/20`}
              >
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-3 text-sm border-t  border-primary/50 "
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* TABLE CONTROLES  */}
      <div className="flex justify-between items-center">
        {/* CHANGE TOTAL ROWS PER PAGE  */}
        <div className="flex items-center gap-2  border border-primary w-fit rounded-sm px-2 has-focus-visible:outline-2 outline-primary-dark">
          <select
            value={state.pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="outline-none"
          >
            <option tabIndex={0} value={5} className="p-2 py-1 text-black">
              عدد الأسطر 5
            </option>
            <option tabIndex={0} value={10} className="p-2 py-1 text-black">
              عدد الأسطر 10
            </option>
            <option tabIndex={0} value={16} className="p-2 py-1 text-black">
              عدد الأسطر 16
            </option>
          </select>
        </div>
        {/* CHANGE PAGES CONTROLES  */}
        <div className="flex items-center justify-center  gap-2 text-2xl text-primary mt-4">
          <button
            className="rounded-full disabled:opacity-50"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <MdKeyboardArrowRight className="cursor-pointer hover:scale-105 transition-all" />
          </button>
          <div className="flex items-center gap-1">
            {[...Array(pageCount)].map((_, Idx) => (
              <button
                onClick={() => gotoPage(Idx)}
                className={`px-2 text-lg text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-sm cursor-pointer 
                                ${
                                  Idx == pageIndex
                                    ? "bg-primary text-white"
                                    : "text-primary"
                                } `}
              >
                {Idx + 1}
              </button>
            ))}
          </div>
          <button
            className="rounded-full disabled:opacity-50"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <MdKeyboardArrowLeft className="cursor-pointer hover:scale-105 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
