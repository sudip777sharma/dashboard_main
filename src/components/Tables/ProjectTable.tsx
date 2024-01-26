import { BiSolidEditAlt } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { BiExitFullscreen } from "react-icons/bi";
import { MdVisibility } from "react-icons/md";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import SingleHorizontalBar from "../Charts/ApexCharts/SingleHorizontalBar";
import Icon from "../Icon";
import Image from "next/image";
import { type IconType } from "react-icons/lib";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  type FilterFn,
  type Column,
  type ColumnDef,
  type Table,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

// import MOCK_DATA from './MOCK_DATA.json'

// function generateTeam() {
//   const resultArray: string[] = [];
//   const usedNumbers: Set<number> = new Set<number>();
//   const teamSize = Math.floor(Math.random() * 4) + 2;
//   while (resultArray.length < teamSize) {
//     const randomNumber: number = Math.floor(Math.random() * 5) + 1; // generates a random integer between 1 and 5

//     if (!usedNumbers.has(randomNumber)) {
//       const resultString: string = "n" + randomNumber + "u";
//       resultArray.push(resultString);
//       usedNumbers.add(randomNumber);
//     }
//   }
//   return resultArray;
// }
// function generateRandomDate(): string {
//   const startYear = 2000;
//   const endYear = 2023;

//   const randomYear =
//     Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
//   const randomMonth = Math.floor(Math.random() * 12) + 1; // Months are 1-indexed
//   const randomDay = Math.floor(Math.random() * 31) + 1; // Assume all months have 31 days

//   const monthNames: string[] = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const formattedDate = `${randomDay} ${
//     monthNames[randomMonth - 1]
//   } ${randomYear}`;
//   return formattedDate;
// }

const fuzzyFilter: FilterFn<unknown> = (
  row,
  columnId,
  value: string,
  addMeta
) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};
// type DefaultColumnCellProps<T extends Record<string, unknown>> = {
//   getValue: () => string;
//   row: {
//     index: number;
//   } & T;
//   column: {
//     id: string;
//   } & Column<T>;
//   table: unknown;
// };
// const defaultColumn = {
//   cell: <T extends Record<string, unknown>>({
//     getValue,
//     row,
//     column,
//     table,
//   }: DefaultColumnCellProps<T>) => (
//     <DefaultColumnCell
//       getValue={getValue}
//       index={row.index}
//       id={column.id}
//       table={table}
//     />
//   ),
// };
// type defaultColCellType<T extends Record<string, unknown>> = {
//   getValue: () => string;
//   index: number;
//   id: string;
//   table: unknown;
// };
// const DefaultColumnCell: React.FC<defaultColCellType<Project>> = ({
//   getValue,
//   index,
//   id,
//   table,
// }) => {
//   const initialValue: string = getValue();
//   const [value, setValue] = useState(initialValue);
//   // const [isDarkModeOn, setIsDarkModeOn] = useState(true);
//   // const onBlur = () => {
//   //   console.log(table);
//   //   table.options.meta?.updateData(index, id, value);
//   // };
//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);
//   return (
//     <div>
//       <input
//         className={`
//                                 rounded-lg border-[1px] border-[#484D64] bg-transparent
//                             `}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         // onBlur={onBlur}
//         readOnly={false}
//       />
//     </div>
//   );
// };
type Project = {
  select: boolean;
  name: {
    projectName: string;
    projectStartedAt: string;
  };
  leader: string;
  team: string[];
  status: number;
  actions: React.ElementType;
};

const ProjectTable = () => {
  const MOCK_DATA: Project[] = [
    {
      select: false,
      name: {
        projectName: "Website SEO",
        projectStartedAt: "10 May 2021",
      },
      leader: "Eileen",
      team: ["n3u", "n2u", "n5u", "n1u"],
      status: 38,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Social Banners",
        projectStartedAt: "03 Jan 2021",
      },
      leader: "Owen",
      team: ["n4u", "n2u"],
      status: 45,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Logo Designs",
        projectStartedAt: "12 Aug 2021",
      },
      leader: "Eileen",
      team: ["n2u", "n4u", "n5u", "n3u"],
      status: 92,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "IOS App Design",
        projectStartedAt: "19 Apr 2021",
      },
      leader: "Eileen",
      team: ["n3u", "n1u"],
      status: 56,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Figma Dashboards",
        projectStartedAt: "08 Apr 2021",
      },
      leader: "Eileen",
      team: ["n2u", "n5u", "n3u"],
      status: 25,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Crypto Admin",
        projectStartedAt: "29 Sep 2021",
      },
      leader: "Eileen",
      team: ["n3u", "n1u"],
      status: 36,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Create Website",
        projectStartedAt: "20 Mar 2021",
      },
      leader: "Eileen",
      team: ["n5u", "n3u", "n4u", "n2u", "n1u"],
      status: 72,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "App Design",
        projectStartedAt: "09 Feb 2021",
      },
      leader: "Eileen",
      team: ["n3u", "n1u", "n5u"],
      status: 89,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Angular APIs",
        projectStartedAt: "17 Jun 2021",
      },
      leader: "Eileen",
      team: ["n5u", "n1u"],
      status: 77,
      actions: BsThreeDotsVertical,
    },
    {
      select: false,
      name: {
        projectName: "Admin Template",
        projectStartedAt: "06 Oct 2021",
      },
      leader: "Eileen",
      team: ["n4u", "n2u", "n1u", "n5u"],
      status: 100,
      actions: BsThreeDotsVertical,
    },
  ];
  const [tableData, setTableData] = useState(() => MOCK_DATA);
  const columnHelper = createColumnHelper<Project>();

  const tableColumns = [
    columnHelper.accessor("select", {
      header: ({ table }) => (
        <div
          className={`
                                    flex w-full items-center justify-center
                            `}
        >
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={`
                                    flex w-full items-center justify-center
                               `}
        >
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
    }) as ColumnDef<Project, string>,

    columnHelper.accessor("name", {
      cell: (info) => (
        <span className="flex w-full gap-4">
          <Image
            width={10}
            height={10}
            alt="table pic"
            src={`/${info.getValue().projectName.replace(/ /g, "_")}.png`}
            className="h-10 w-10 rounded-full"
          />
          <span className="flex flex-col">
            <h1>{info.getValue().projectName}</h1>
            <p>{info.getValue().projectStartedAt}</p>
          </span>
        </span>
      ),
    }) as ColumnDef<Project, string>,
    columnHelper.accessor("leader", {}),
    columnHelper.accessor("team", {
      cell: (info) => (
        <div className="flex w-full">
          {info.getValue().map((u) => {
            return (
              <Image
                width={10}
                height={10}
                alt="team pics"
                key={`${u}`}
                src={`/${u}.png`}
                className="z-0 -m-[6px] h-8 w-8 rounded-full border-[2px] border-[#2F3349] transition-transform duration-500 hover:z-[5] hover:-mt-4"
              />
            );
          })}
        </div>
      ),
    }) as ColumnDef<Project, string>,
    columnHelper.accessor("status", {
      cell: (info) => (
        <span className="flex w-full items-center gap-4">
          <SingleHorizontalBar
            barColor="#5A68EB"
            percentage={info.getValue()}
            backgroundColor="#343756"
            name="Project completed"
            barWidth="12px"
          />
          <h1>{info.getValue()}%</h1>
        </span>
      ),
    }),
    columnHelper.accessor("actions", {
      cell: (info) => <Icon icon={info.getValue() as IconType} />,
    }) as ColumnDef<Project, string>,
  ];
  const [] = useState("onChange");
  // setColumnResizeMode('onChange');
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [isSearchInTableOn, setIsSearchInTableOn] = useState(true);
  const [isFilterInTableOn, setIsFilterInTableOn] = useState(false);
  const [isColumnVisibilityOptionsOn, setIsColumnVisibilityOptionsOn] =
    useState(false);
  const [isEditTableOn, setIsEditTableOn] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(true);
  const [isFullScreenModeOn, setIsFullScreenModeOn] = useState(false);
  const [isTableOptionsOn, setIsTableOptionsOn] = useState(false);
  // function useSkipper() {
  //   const shouldSkipRef = useRef(true);
  //   const shouldSkip = shouldSkipRef.current;

  //   // Wrap a function with this to skip a pagination reset temporarily
  //   const skip = useCallback(() => {
  //     shouldSkipRef.current = false;
  //   }, []);

  //   useEffect(() => {
  //     shouldSkipRef.current = true;
  //   });

  //   return [shouldSkip, skip];
  // }
  // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    // defaultColumn: isEditTableOn ? defaultColumn : null,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true,
    // columnResizeMode,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // onColumnFiltersChange: setColumnFilters,
    // globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    getFacetedRowModel: getFacetedRowModel(),

    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    // autoResetPageIndex,

    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip page index reset until after next rerender
        // skipAutoResetPageIndex();
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div
      className={`
                        flex h-[35rem]
                        w-full flex-col
                        gap-1 rounded-lg border-[1px] border-[#484D64] 
                        ${isFullScreenModeOn ? "" : ""}} 
                    `}
    >
      <div
        className={`
                            relative flex h-12 items-center justify-between gap-2 border-b-[1px] border-b-[#484D64] px-5 py-10 drop-shadow-lg
                        `}
      >
        <div
          className={`
                                flex w-full items-center justify-between gap-5
                            `}
        >
          <h1 className="text-2xl">Projects</h1>
          {isSearchInTableOn && (
            <div>
              <DebouncedInput
                className={`
                                            w-full rounded-lg border-[1px]  border-[#484D64] bg-transparent p-2 text-lg
                                        `}
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                placeholder="Search in all columns"
              />
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-1 md:hidden"
          onClick={() => setIsTableOptionsOn((prev) => !prev)}
        >
          {isTableOptionsOn ? <CgClose /> : <BsThreeDotsVertical />}
        </button>

        <div
          className={`
                                items-center justify-between gap-5 rounded-lg bg-[#7367F0] px-5 py-3 text-white md:flex
                                ${
                                  isTableOptionsOn
                                    ? `absolute right-1 top-10   flex flex-col rounded-lg`
                                    : "hidden"
                                } 
                            `}
        >
          <button onClick={() => setIsSearchInTableOn((prev) => !prev)}>
            {isSearchInTableOn ? <CgClose /> : <BiSearch />}
          </button>
          <button onClick={() => setIsFilterInTableOn((prev) => !prev)}>
            {isFilterInTableOn ? <CgClose /> : <FiFilter />}
          </button>
          <div
            className={`
                                    relative
                                `}
          >
            <button
              onClick={() => setIsColumnVisibilityOptionsOn((prev) => !prev)}
            >
              {isColumnVisibilityOptionsOn ? <CgClose /> : <MdVisibility />}
            </button>
            {isColumnVisibilityOptionsOn && (
              <span
                className={`
                                            absolute right-0 top-5 z-10
                                        `}
              >
                <ColumnVisibilityOptions
                  table={table}
                  isDarkModeOn={isDarkModeOn}
                />
              </span>
            )}
          </div>
          <button onClick={() => setIsEditTableOn((prev) => !prev)}>
            {isEditTableOn ? <CgClose /> : <BiSolidEditAlt />}
          </button>
          <button onClick={() => setIsDarkModeOn((prev) => !prev)}>
            {isDarkModeOn ? <BsFillSunFill /> : <BsMoonStarsFill />}
          </button>
          <button onClick={() => setIsFullScreenModeOn((prev) => !prev)}>
            {isFullScreenModeOn ? <BiExitFullscreen /> : <BiFullscreen />}
          </button>
        </div>
      </div>

      <div
        className={`
                            custom-scrollbar max-h-screen overflow-y-auto
                        `}
      >
        <table
          className={`

                            `}
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead
            className={`
                                    sticky top-0
                                    border-b-[1px]
                                    border-b-[#484D64] bg-[#2F3349]
                                `}
          >
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr className="" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className={`
                                                                    relative min-w-[200px] truncate px-2 py-4
                                                                `}
                        key={header.id}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              onClick={header.column.getToggleSortingHandler()}
                              className={`
                                                                                    flex 
                                                                                    ${
                                                                                      header.column.getCanSort()
                                                                                        ? "cursor-pointer select-none"
                                                                                        : ""
                                                                                    }
                                                                                `}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.id !== "select" &&
                              header.column.getIsSorted()
                                ? " 🔽"
                                : " 🔼"}
                            </div>
                            {isFilterInTableOn &&
                            header.column.getCanFilter() ? (
                              <div
                                className={`

                                                                                        `}
                              >
                                <Filter
                                  column={header.column}
                                  table={table}
                                  isDarkModeOn={isDarkModeOn}
                                />
                              </div>
                            ) : null}
                            {
                              <div
                                {...{
                                  onMouseDown: header.getResizeHandler(),
                                  onTouchStart: header.getResizeHandler(),
                                  className: `absolute right-0 top-0 w-1 h-full cursor-col-resize select-none touch-none 
                                                                                bg-[#9599b357]  opacity-[0.1] hover:opacity-[1] ${
                                                                                  header.column.getIsResizing()
                                                                                    ? "opacity-[1]"
                                                                                    : ""
                                                                                }`,
                                }}
                              />
                            }
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="h-screen">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  className={`
                                                    border-b-[1px] border-b-[#484D64]
                                                `}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className={`truncate px-2`} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                className={`
                                            flex w-full items-center justify-center
                                        `}
              >
                <IndeterminateCheckbox
                  checked={table.getIsAllPageRowsSelected()}
                  indeterminate={!!table.getIsSomePageRowsSelected()}
                  onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
              </td>
              <td colSpan={5}>Page Rows ({table.getRowModel().rows.length})</td>
            </tr>
            <tr></tr>
          </tfoot>
        </table>
      </div>
      <div
        className={`
                            flex flex-row justify-between border-t-[1px] border-t-[#484D64] px-1 py-1 md:items-center md:px-4
                        `}
      >
        <div
          className={`
                                flex
                                h-6 flex-row items-center gap-1 rounded-sm px-2 md:gap-2 
                            `}
        >
          <span
            className={`
                                    hidden md:inline-block
                                `}
          >
            {Object.keys(rowSelection).length} of{" "}
            {table.getPreFilteredRowModel().rows.length}
            {" Total Rows Selected"}
          </span>

          <span
            className={`
                                    flex items-center gap-1 px-1 md:hidden
                                `}
          >
            {Object.keys(rowSelection).length}
            <BiSelectMultiple />
          </span>
        </div>
        <div
          className={`
                                flex flex-row gap-2
                            `}
        >
          <div
            className={`
                                    flex items-center gap-1 md:gap-2 md:p-2
                                `}
          >
            <button
              className={`
                                        rounded bg-[#7367F0] p-1 text-xl text-white md:p-2
                                    `}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <AiOutlineDoubleLeft />
            </button>
            <button
              className={`
                                        rounded bg-[#7367F0] p-1 text-xl text-white md:p-2
                                    `}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <AiOutlineLeft />
            </button>
            <button
              className={`
                                        rounded bg-[#7367F0] p-1 text-xl text-white md:p-2
                                    `}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <AiOutlineRight />
            </button>
            <button
              className={`
                                        rounded bg-[#7367F0] p-1 text-xl text-white md:p-2
                                    `}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <AiOutlineDoubleRight />
            </button>
          </div>
          <div
            className={`
                                    flex items-center gap-1 md:gap-2
                                `}
          >
            <span
              className={`
                                        hidden items-center gap-1 md:flex
                                    `}
            >
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span
              className={`
                                            flex h-7 items-center gap-1
                                        `}
            >
              <span
                className={`
                                            hidden items-center gap-1 md:flex
                                        `}
              >
                Go to page:
              </span>
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className={` w-8 rounded bg-[#2F3349] text-white`}
              />
            </span>
            <select
              className={`
                                        h-6 rounded 
                                        bg-[#2F3349] text-white
                                    `}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <br />
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() => console.info('rowSelection', rowSelection)}
                >
                    Log `rowSelection` state
                </button>
            </div>
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() =>
                        console.info(
                            'table.getSelectedRowModel().flatRows',
                            table.getSelectedRowModel().flatRows
                        )
                    }
                >
                    Log table.getSelectedRowModel().flatRows
                </button>
            </div>
            {
                JSON.stringify(
                    {
                        columnSizing: table.getState().columnSizing,
                        columnSizingInfo: table.getState().columnSizingInfo,
                    },
                    null,
                    2
                )
            } */}
    </div>
  );
};

interface IndeterminateCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  disabled?: boolean;
}

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean" && ref.current) {
      ref.current.indeterminate =
        !!(rest as { checked?: boolean }).checked && indeterminate;
    }
  }, [ref, indeterminate, rest]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`
                        h-4 w-4 cursor-pointer select-none rounded-lg bg-transparent  accent-[#7367F0]
                    `}
      {...rest}
    />
  );
}
IndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
};

interface FilterProps {
  column: Column<Project>;
  table: Table<Project>;
  isDarkModeOn: boolean;
}
function Filter({ column, table }: FilterProps) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  // const columnFilterValue = column.getFilterValue();
  // const columnFilterValue: number[] | string[] = column.getFilterValue();
  const columnFilterValue = column.getFilterValue() as string[] | number[];

  // console.log('columnFilterValue: ', columnFilterValue);

  const sortedUniqueValues = React.useMemo(() => {
    if (typeof firstValue === "number") {
      return [];
    } else {
      const uniqueValuesMap = column.getFacetedUniqueValues();
      // const uniqueValuesArray: string[] = Array.from(uniqueValuesMap.keys());
      const uniqueValuesArray: string[] = Array.from(uniqueValuesMap.keys())
        .filter((key) => typeof key === "string") // Type-checking
        .map((key) => key as string); // Type assertion

      return uniqueValuesArray.sort();
    }
  }, [column, firstValue]);

  return typeof firstValue === "number" ? (
    <div
      className={`
                        flex gap-1
                    `}
    >
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[0] as string}
        onChange={(value) =>
          column.setFilterValue((old: string) => [value, old?.[1]])
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
        }`}
        className={`
                            w-full rounded-lg border-[1px] border-[#484D64] bg-transparent
                        `}
      />
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[1] as string}
        onChange={(value) =>
          column.setFilterValue((old: string) => [old?.[0], value])
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
        }`}
        className={`
                            w-full rounded-lg 
                            border-[1px] border-[#484D64] bg-transparent
                        `}
      />
    </div>
  ) : (
    column.id !== "select" && (
      <div
        className={`
            
                    `}
      >
        <datalist id={column.id + "list"}>
          {sortedUniqueValues.slice(0, 5000).map((value) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={columnFilterValue[0] as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Filter... (${column.getFacetedUniqueValues().size})`}
          className={`
                            w-full rounded-lg border-[1px] 
                            border-[#484D64] bg-transparent p-1
                        `}
          list={column.id + "list"}
        />
      </div>
    )
  );
}
Filter.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    getFilterValue: PropTypes.func.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    getFacetedUniqueValues: PropTypes.func.isRequired,
    getFacetedMinMaxValues: PropTypes.func.isRequired,
  }).isRequired,
  table: PropTypes.shape({
    getPreFilteredRowModel: PropTypes.func.isRequired,
  }).isRequired,
  isDarkModeOn: PropTypes.bool.isRequired,
};

type DebouncedInputProps = {
  value: string; // Yahan aap specific type dena chahein
  onChange: (value: string) => void; // Yahan bhi specific type dena chahein
  debounce?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;
function DebouncedInput({
  value: initialValue,
  onChange: onChangeFilter,
  debounce = 200,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(() => initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeFilter(inputValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, inputValue, onChangeFilter]);

  return (
    <input
      {...props}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  );
}
DebouncedInput.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
};

type columnVisibilityOptionsType = {
  table: Table<Project>;
  isDarkModeOn: boolean;
};
function ColumnVisibilityOptions({ table }: columnVisibilityOptionsType) {
  return (
    <div
      className={`
                        custom-scrollbar h-60 w-fit overflow-auto rounded bg-[#2F3349] p-2
                        drop-shadow-xl
                    `}
    >
      <div
        className={`
                            px-1
                        `}
      >
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
      </div>
      {table.getAllLeafColumns().map((column) => {
        return (
          <div
            key={column.id}
            className={`
                                        px-1
                                    `}
          >
            <label
              className={`
                                            flex items-center gap-1 p-1
                                        `}
            >
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />
              {column.id}
            </label>
          </div>
        );
      })}
    </div>
  );
}
ColumnVisibilityOptions.propTypes = {
  table: PropTypes.shape({
    getIsAllColumnsVisible: PropTypes.func.isRequired,
    getToggleAllColumnsVisibilityHandler: PropTypes.func.isRequired,
    getAllLeafColumns: PropTypes.func.isRequired,
    // ... Add other methods and properties used from 'table' here ...
  }).isRequired,
  isDarkModeOn: PropTypes.bool.isRequired,
};

export default ProjectTable;
