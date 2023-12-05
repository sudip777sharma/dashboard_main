import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
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
} from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'

import { BiSolidEditAlt } from 'react-icons/bi'
import { BiSearch } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'
import { BsMoonStarsFill } from 'react-icons/bs'
import { BsFillSunFill } from 'react-icons/bs'
import { BiFullscreen } from 'react-icons/bi'
import { BiExitFullscreen } from 'react-icons/bi'
import { MdVisibility } from 'react-icons/md'
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { BiSelectMultiple } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import SingleHorizontalBar from '../Charts/SingleHorizontalBar';
import Icon from '../Icon';
import Image from 'next/image';


// import MOCK_DATA from './MOCK_DATA.json'

function generateTeam(){
    let resultArray: string[] = [];
    let usedNumbers: Set<number> = new Set();
    let teamSize = Math.floor(Math.random() * 4) + 2;
    while (resultArray.length < teamSize) {
        let randomNumber: number = Math.floor(Math.random() * 5) + 1; // generates a random integer between 1 and 5

        if (!usedNumbers.has(randomNumber)) {
        let resultString: string = 'n' + randomNumber + 'u';
        resultArray.push(resultString);
        usedNumbers.add(randomNumber);
        }
    }
    return resultArray;
}
function generateRandomDate(): string {
  const startYear = 2000;
  const endYear = 2023;

  const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const randomMonth = Math.floor(Math.random() * 12) + 1; // Months are 1-indexed
  const randomDay = Math.floor(Math.random() * 31) + 1; // Assume all months have 31 days

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = `${randomDay} ${monthNames[randomMonth - 1]} ${randomYear}`;
  return formattedDate;
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
        itemRank
    });
    return itemRank.passed;
}
const defaultColumn = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => <DefaultColumnCell getValue={getValue} index={index} id={id} table={table} />,
}

function useSkipper() {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip]
}
const ProjectTable = () => {
    const MOCK_DATA = [ 
        {
            name: {
                projectName: 'Website SEO',
                projectStartedAt: '10 May 2021',
            },
            leader: 'Eileen',
            team: ['n3u', 'n2u', 'n5u', 'n1u'],
            status: 38,
            actions: BsThreeDotsVertical,
        },         
        {
            name: {
                projectName: 'Social Banners',
                projectStartedAt: '03 Jan 2021',
            },
            leader: 'Owen',
            team: ['n4u', 'n2u'],
            status: 45,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Logo Designs',
                projectStartedAt: '12 Aug 2021',
            },
            leader: 'Eileen',
            team: ['n2u', 'n4u', 'n5u', 'n3u'],
            status: 92,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'IOS App Design',
                projectStartedAt: '19 Apr 2021',
            },
            leader: 'Eileen',
            team: ['n3u', 'n1u'],
            status: 56,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Figma Dashboards',
                projectStartedAt: '08 Apr 2021',
            },
            leader: 'Eileen',
            team: ['n2u', 'n5u', 'n3u'],
            status: 25,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Crypto Admin',
                projectStartedAt: '29 Sep 2021',
            },
            leader: 'Eileen',
            team: ['n3u', 'n1u'],
            status: 36,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Create Website',
                projectStartedAt: '20 Mar 2021',
            },
            leader: 'Eileen',
            team: ['n5u', 'n3u', 'n4u', 'n2u', 'n1u'],
            status: 72,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'App Design',
                projectStartedAt: '09 Feb 2021',
            },
            leader: 'Eileen',
            team: ['n3u', 'n1u', 'n5u'],
            status: 89,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Angular APIs',
                projectStartedAt: '17 Jun 2021',
            },
            leader: 'Eileen',
            team: ['n5u', 'n1u'],
            status: 77,
            actions: BsThreeDotsVertical,
        },
        {
            name: {
                projectName: 'Admin Template',
                projectStartedAt: '06 Oct 2021',
            },
            leader: 'Eileen',
            team: ['n4u', 'n2u', 'n1u', 'n5u'],
            status: 100,
            actions: BsThreeDotsVertical,
        },

    ]
    const [tableData, setTableData] = useState(() => MOCK_DATA);
    const columnHelper = createColumnHelper();
    const tableColumns = [
        columnHelper.accessor('select', {
            header: ({ table }) => (
                <div className={`
                                    flex items-center w-full justify-center
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
                <div className={`
                                    flex items-center w-full justify-center
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
        }),

        columnHelper.accessor('name', {
            cell: info => <span className='flex w-full gap-4'>
                            <Image width={10} height={10} src={`/${info.getValue().projectName.replace(/ /g, '_')}.png`} className='h-10 w-10 rounded-full' />
                            <span className='flex flex-col'>
                                <h1>{info.getValue().projectName}</h1>
                                <p>{info.getValue().projectStartedAt}</p>
                            </span>
                          </span>
        }),
        columnHelper.accessor('leader', {
        }),
        columnHelper.accessor('team', {
            cell: info => <div className='flex w-full'>{
                info.getValue().map((u, i) => {
                    return (
                        <Image width={10} height={10} key={`${u}`} src={`/${u}.png`} className='z-0 h-8 w-8 rounded-full -m-[6px] border-[2px] border-[#2F3349] transition-transform duration-500 hover:-mt-4 hover:z-[5]' />
                    )
                })
                }</div>
        }),
        columnHelper.accessor('status', {
            cell: info => <span className='flex w-full gap-4 items-center'>    
            <SingleHorizontalBar
                    barColor="#5A68EB"
                    percentage={info.getValue()}
                    backgroundColor="#343756"
                    name="Project completed"
                    barWidth="12px"
                  />
                  <h1>{info.getValue()}%</h1>
            </span>
        }),
        columnHelper.accessor('actions', {
            cell: info => <Icon icon={info.getValue()} />,
        }),
        // columnHelper.accessor('id', {
        //     cell: info => info.getValue(),
        // }),
        // columnHelper.accessor('profile_pic', {
        //     cell: info => <img src={`${info.getValue()}`} className='h-10 w-10 rounded-full' />,
        // }),
        // columnHelper.accessor('first_name', {
        // }),
        // columnHelper.accessor('last_name', {
        // }),
        // columnHelper.accessor('email', {
        // }),
        // columnHelper.accessor('gender', {
        // }),
        // columnHelper.accessor('date_of_birth', {
        // }),
        // columnHelper.accessor('country', {
        // }),
        // columnHelper.accessor('phone', {
        // }),
    ]
    const [columnResizeMode, setColumnResizeMode] = useState('onChange');
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = React.useState({})

    const [tableDimension, setTableDimension] = useState({
        height: '500px',
        width: '500px'
    });
    const [isSearchInTableOn, setIsSearchInTableOn] = useState(true)
    const [isFilterInTableOn, setIsFilterInTableOn] = useState(false)
    const [isColumnVisibilityOptionsOn, setIsColumnVisibilityOptionsOn] = useState(false);
    const [isEditTableOn, setIsEditTableOn] = useState(false)
    const [isDarkModeOn, setIsDarkModeOn] = useState(true)
    const [isFullScreenModeOn, setIsFullScreenModeOn] = useState(false)
    const [isTableOptionsOn, setIsTableOptionsOn] = useState(false)

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        defaultColumn: isEditTableOn ? defaultColumn : null,
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
        columnResizeMode,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        getFacetedRowModel: getFacetedRowModel(),

        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),

        autoResetPageIndex,
        // Provide our updateData function to our table meta
        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex()
                setTableData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
            },
        },
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    return (
        <div
            className={`
                        border-[1px] border-[#484D64]
                        h-[35rem] w-full
                        rounded-lg flex flex-col gap-1 
                        ${isFullScreenModeOn ? '' : ''}} 
                    `}
        >
            <div
                className={`
                            relative drop-shadow-lg flex h-12 items-center justify-between px-5 py-10 gap-2 border-b-[1px] border-b-[#484D64]
                        `}
            >
                <div
                    className={`
                                flex gap-5 items-center justify-between w-full
                            `}
                >
                    <h1 className='text-2xl'>Projects</h1>
                    {
                        isSearchInTableOn && <div>
                            <DebouncedInput
                                className={`
                                            rounded-lg p-2 w-full  bg-transparent border-[1px] border-[#484D64] text-lg
                                        `}
                                value={globalFilter ?? ''}
                                onChange={(value) => setGlobalFilter(String(value))}
                                placeholder='Search in all columns'
                            />
                        </div>
                    }
                </div>
                <button
                    className='flex md:hidden items-center gap-1'
                    onClick={() => setIsTableOptionsOn(prev => !prev)}
                >
                    {
                        isTableOptionsOn ? <CgClose /> : <BsThreeDotsVertical />
                    }
                </button>

                <div
                    className={`
                                gap-5 items-center justify-between px-5 py-3 md:flex bg-[#7367F0] text-white rounded-lg
                                ${isTableOptionsOn ? `absolute top-10 right-1   flex flex-col rounded-lg` : 'hidden'} 
                            `}
                >
                    <button
                        onClick={() => setIsSearchInTableOn(prev => !prev)}
                    >
                        {
                            isSearchInTableOn ? <CgClose /> : <BiSearch />
                        }
                    </button>
                    <button
                        onClick={() => setIsFilterInTableOn(prev => !prev)}
                    >
                        {
                            isFilterInTableOn ? <CgClose /> : <FiFilter />
                        }
                    </button>
                    <div
                        className={`
                                    relative
                                `}
                    >
                        <button
                            onClick={() => setIsColumnVisibilityOptionsOn(prev => !prev)}
                        >
                            {
                                isColumnVisibilityOptionsOn ? <CgClose /> : <MdVisibility />
                            }
                        </button>
                        {
                            isColumnVisibilityOptionsOn &&
                            <span
                                className={`
                                            absolute top-5 right-0 z-10
                                        `}
                            >
                                <ColumnVisibilityOptions table={table} isDarkModeOn={isDarkModeOn} />
                            </span>
                        }
                    </div>
                    <button
                        onClick={() => setIsEditTableOn(prev => !prev)}
                    >
                        {
                            isEditTableOn ? <CgClose /> : <BiSolidEditAlt />
                        }
                    </button>
                    <button
                        onClick={() => setIsDarkModeOn(prev => !prev)}
                    >
                        {
                            isDarkModeOn ? <BsFillSunFill /> : <BsMoonStarsFill />
                        }
                    </button>
                    <button
                        onClick={() => setIsFullScreenModeOn(prev => !prev)}
                    >
                        {
                            isFullScreenModeOn ? <BiExitFullscreen /> : <BiFullscreen />
                        }
                    </button>
                </div>
            </div>

            <div
                className={`
                            max-h-screen overflow-y-auto custom-scrollbar
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
                                    bg-[#2F3349]
                                    border-b-[1px] border-b-[#484D64]
                                `}
                    >
                        {
                            table.getHeaderGroups().map((headerGroup) => {
                                return (
                                    <tr
                                        className=''
                                        key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map((header) => {
                                                return (
                                                    <th
                                                        className={`
                                                                    truncate relative py-4 px-2 min-w-[200px]
                                                                `}
                                                        key={header.id}
                                                    >
                                                        {
                                                            header.isPlaceholder ? null : (
                                                                <>
                                                                    <div
                                                                        onClick={header.column.getToggleSortingHandler()}
                                                                        className={`
                                                                                    flex 
                                                                                    ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                                                                `}
                                                                    >
                                                                        {
                                                                            flexRender(
                                                                                header.column.columnDef.header,
                                                                                header.getContext()
                                                                            )
                                                                        }
                                                                        {
                                                                            header.column.id !== 'select' && ({
                                                                                asc: ' 🔼',
                                                                                desc: ' 🔽',
                                                                            }[header.column.getIsSorted()] ?? '')
                                                                        }
                                                                    </div>
                                                                    {
                                                                        isFilterInTableOn && header.column.getCanFilter() ? (
                                                                            <div
                                                                                className={`

                                                                                        `}
                                                                            >
                                                                                <Filter column={header.column} table={table} isDarkModeOn={isDarkModeOn} />
                                                                            </div>
                                                                        ) : null
                                                                    }
                                                                    {
                                                                        <div
                                                                            {...{
                                                                                onMouseDown: header.getResizeHandler(),
                                                                                onTouchStart: header.getResizeHandler(),
                                                                                className: `absolute right-0 top-0 w-1 h-full cursor-col-resize select-none touch-none 
                                                                                bg-[#9599b357]  opacity-[0.1] hover:opacity-[1] ${header.column.getIsResizing() ? 'opacity-[1]' : ''}`,
                                                                            }}
                                                                        />
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </thead>
                    <tbody
                        className='h-screen'
                    >
                        {
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        className={`
                                                    border-b-[1px] border-b-[#484D64]
                                                `}
                                        key={row.id}
                                    >
                                        {
                                            row.getVisibleCells().map((cell) => {
                                                return (
                                                    <td
                                                        className={`truncate px-2`}
                                                        key={cell.id}
                                                    >
                                                        {
                                                            flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                className={`
                                            w-full flex items-center justify-center
                                        `}
                            >
                                <IndeterminateCheckbox
                                    checked={table.getIsAllPageRowsSelected()}
                                    indeterminate={table.getIsSomePageRowsSelected()}
                                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                                />
                            </td>
                            <td
                                colSpan={5}>Page Rows ({table.getRowModel().rows.length})
                            </td>
                        </tr>
                        <tr></tr>
                    </tfoot>
                </table>
            </div>
            <div className={`
                            flex flex-row md:items-center justify-between px-1 md:px-4 py-1 border-t-[1px] border-t-[#484D64]
                        `}
            >
                <div
                    className={`
                                px-2
                                flex flex-row gap-1 rounded-sm md:gap-2 items-center h-6 
                            `}
                >
                    <span
                        className={`
                                    hidden md:inline-block
                                `}
                    >
                        {Object.keys(rowSelection).length} of{' '}
                        {table.getPreFilteredRowModel().rows.length}
                        {' Total Rows Selected'}
                    </span>

                    <span
                        className={`
                                    flex items-center gap-1 md:hidden px-1
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
                                    flex gap-1 md:gap-2 items-center md:p-2
                                `}
                    >
                        <button
                            className={`
                                        rounded text-xl p-1 md:p-2 bg-[#7367F0] text-white
                                    `}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <AiOutlineDoubleLeft />
                        </button>
                        <button
                            className={`
                                        rounded text-xl p-1 md:p-2 bg-[#7367F0] text-white
                                    `}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <AiOutlineLeft />
                        </button>
                        <button
                            className={`
                                        rounded text-xl p-1 md:p-2 bg-[#7367F0] text-white
                                    `}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <AiOutlineRight />
                        </button>
                        <button
                            className={`
                                        rounded text-xl p-1 md:p-2 bg-[#7367F0] text-white
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
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>
                        </span>
                        <span className={`
                                            flex items-center gap-1 h-7
                                        `}
                        >
                            <span
                                className={`
                                            hidden md:flex items-center gap-1
                                        `}
                            >Go to page:</span>
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className={` rounded w-8 bg-[#2F3349] text-white`}
                            />
                        </span>
                        <select
                            className={`
                                        rounded h-6 
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
        </div >
    )
}

function DefaultColumnCell({ getValue, index, id, table }) {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
    const [isDarkModeOn, setIsDarkModeOn] = useState(true)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <div>
            <input
                className={`
                                rounded-lg bg-transparent border-[1px] border-[#484D64]
                            `}
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
                readOnly={false}
            />
        </div>
    )

}

function IndeterminateCheckbox({
    indeterminate,
    ...rest
}) {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={`
                        cursor-pointer select-none h-4 w-4 rounded-lg accent-[#7367F0]  bg-transparent
                    `}
            {...rest}
        />
    );
}
IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.bool,
};

function Filter({ column, table, isDarkModeOn }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()
    // console.log('columnFilterValue: ', columnFilterValue);
    const sortedUniqueValues = React.useMemo(() => typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort(), [column.getFacetedUniqueValues()])

    return typeof firstValue === 'number' ? (
        <div
            className={`
                        flex gap-1
                    `}
        >
            <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                value={(columnFilterValue)?.[0] ?? ''}
                onChange={value => column.setFilterValue((old) => [value, old?.[1]])
                }
                placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
                className={`
                            w-full rounded-lg bg-transparent border-[1px] border-[#484D64]
                        `}
            />
            <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                value={(columnFilterValue)?.[1] ?? ''}
                onChange={value =>
                    column.setFilterValue((old) => [old?.[0], value])
                }
                placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
                className={`
                            w-full rounded-lg 
                            bg-transparent border-[1px] border-[#484D64]
                        `}
            />
        </div>
    ) : (
        column.id !== 'select' &&
        <div
            className={`
            
                    `}
        >
            <datalist id={column.id + 'list'}>
                {
                    sortedUniqueValues.slice(0, 5000).map((value) => (
                        <option value={value} key={value} />
                    ))
                }
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '')}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Filter... (${column.getFacetedUniqueValues().size})`}
                className={`
                            w-full rounded-lg p-1 
                            bg-transparent border-[1px] border-[#484D64]
                        `}
                list={column.id + 'list'}
            />
        </div>
    )
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
function DebouncedInput({ value: initialValue, onChange: onChangeFilter, debounce = 200, ...props }) {
    const [inputValue, setInputValue] = useState(() => initialValue);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChangeFilter(inputValue);
        }, debounce)

        return () => clearTimeout(timeout)
    }, [inputValue])

    return (
        <input {...props} onChange={e => setInputValue(e.target.value)} value={inputValue} />
    )
}
DebouncedInput.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    debounce: PropTypes.number,
};
function ColumnVisibilityOptions({ table, isDarkModeOn }) {
    return (
        <div className={`
                        p-2 rounded drop-shadow-xl w-fit overflow-auto h-60 custom-scrollbar
                        bg-[#2F3349]
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
                            type: 'checkbox',
                            checked: table.getIsAllColumnsVisible(),
                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                        }}
                    />{' '}
                    Toggle All
                </label>
            </div>
            {
                table.getAllLeafColumns().map(column => {
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
                                        type: 'checkbox',
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />
                                {column.id}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
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

export default ProjectTable
