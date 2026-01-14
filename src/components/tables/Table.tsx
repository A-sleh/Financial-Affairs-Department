// @ts-nocheck

import { useEffect, useMemo, useState, createContext, useContext } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Search as SearchInput } from "@/components/inputs/Search";
import { LuChevronsUpDown } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoFilter } from "react-icons/io5";

/**
 * This context to share the infromation between each component
 */
const TableContext = createContext(null);

/**
 * This component to enable the global search in any table instance
 * @returns search input
 */
const Search = () => {
  const { globalFilter, setGlobalFilter } = useContext(TableContext);
  return (
    <SearchInput
      placeholder="بحث"
      value={globalFilter}
      setValue={setGlobalFilter}
      type="secondary"
    />
  );
};

const FilterList = ({ children = null }: { children: React.ReactNode }) => {
  const [isOpent, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((last) => !last)}
        className="flex items-center gap-4 border px-2 py-1 rounded-sm cursor-pointer hover:bg-primary hover:text-white transition-all"
      >
        <IoFilter size={22} />
        <p className="hidden lg:block">فلترة</p>
      </button>
      <div
        className={`w-10 ${
          isOpent ? "h-10 p-2" : "h-0 p-0"
        } bg-white absolute top-[110%] left-0 min-w-50 rounded-sm shadow-[0_0_5px_rgba(0,0,0,.3)] overflow-hidden transition-all`}
      >
        {children ? children : <span className="text-sm text-red-500 font-semibold">لايوجد فلاتر</span>}
      </div>
    </div>
  );
};

/**
 * change the current page based on useReatTable states to check the weather of current page
 * @returns pages controllers
 */
const PagesControlers = () => {
  const {
    previousPage,
    canPreviousPage,
    gotoPage,
    pageIndex,
    pageCount,
    nextPage,
    canNextPage,
  } = useContext(TableContext);

  return (
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
  );
};

/**
 * change the number of rows which should displayed in one page
 * @returns selector component
 */
const RowsControlers = () => {
  const { setPageSize, totalRowsNumber } = useContext(TableContext);
  return (
    <div className="flex items-center gap-2  border  w-fit rounded-sm px-2 has-focus-visible:outline-2 outline-primary-dark">
      <select
        value={totalRowsNumber}
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
  );
};

/**
 * Main table takes his coulmns and data from react table library
 * @returns react table component
 */
const ReactTable = () => {
  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, page } =
    useContext(TableContext);

  return (
    <div className="w-full p-2 overflow-x-auto">
      <table
        {...getTableProps()}
        className="w-full text-right overflow-hidden  transition-all text-nowrap"
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
    </div>
  );
};

/**
 * `data`: will be the table's row
 *  EX: [
 *    {
 *      name: 'abdo',
 *      age: 20
 *    }
 *  ]
 *  `columns`: will be the table's header
 *  EX : [
 *    {
 *      accessor: 'first_name',
 *      header: 'Name'
 *    },
 *    {
 *       accessor: 'age',
 *       header: 'Age'
 *    }
 *  ]
 *  `searchKey`: Will contain the search value from global component seaerch
 */
interface ITableProps {
  data: any[];
  columns: any[];
  searchKey?: string;
  filterFn?: () => boolean;
  children?: React.ReactNode;
  intialTotalRows: 5 | 10 | 16;
}

interface IResponse {
  ReactTable: React.ReactNode;
  RowsControlers: React.ReactNode;
  PagesControlers: React.ReactNode;
  Search: React.ReactNode;
  Filter: React.ReactNode;
}

const Table: React.FC<ITableProps, IResponse> = ({
  columns,
  data,
  intialTotalRows = 1,
  children,
}) => {
  const [totalRowsNumber, setTotalRowsNumber] = useState(intialTotalRows);
  const columnsMemo = useMemo(() => columns, []);
  const tableInctance = useTable(
    {
      columns: columnsMemo,
      data,
      initialState: {
        pageSize: totalRowsNumber,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = tableInctance.state;
  tableInctance.state.pageSize = totalRowsNumber;

  /**
   * This setter to avoide in pridictable behavior becase the setPageSize is not trigger render the compoenent
   * @param rows Represent the number of rows in each rows
   */
  const setRowsNumber = (rows: number) => {
    tableInctance.setPageSize(rows);
    setTotalRowsNumber(rows);
  };

  return (
    <TableContext.Provider
      value={{
        ...tableInctance,
        globalFilter,
        pageIndex,
        totalRowsNumber,
        setPageSize: setRowsNumber,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

/**
 * Create compund component
 */

Table.RowsControlers = RowsControlers;
Table.ReactTable = ReactTable;
Table.PagesControlers = PagesControlers;
Table.Search = Search;
Table.FilterList = FilterList;

export default Table;
