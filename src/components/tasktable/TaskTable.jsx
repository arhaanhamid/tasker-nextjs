"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { columns } from "./data/columns";
import Toolbar from "./data/Toolbar";
import { DataTablePagination } from "./data/DataTablePagination";

export default function BasicTable({ tasks }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [data, setData] = useState(tasks);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    setData(tasks);
  }, [tasks]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters: columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) => {
            return index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row;
          })
        ),
    },
  });

  return (
    <div className="p-1 md:pd-2 lg:p-3 space-y-1 md:space-y-2 lg:space-y-5">
      <Toolbar
        setFiltering={setFiltering}
        filtering={filtering}
        tasks={tasks}
        data={data}
        table={table}
      />
      <div className="rounded-md border border-gray-600">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-gray-900 border-gray-600 "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-xs md:text-sm lg:text-sm p-0 md:p-2 lg:p-3"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center ">
                        <span className="px-2 hover:bg-gray-700 hover:border  hover:rounded-md border-gray-700  hover:cursor-pointer">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getIsSorted() === "desc" ? (
                          <ArrowDownIcon className="h-4 w-4" />
                        ) : header.column.getIsSorted() === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <CaretSortIcon className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-900 border-gray-600"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-xs md:text-sm lg:text-sm p-1 md:p-2 lg:p-3 "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
