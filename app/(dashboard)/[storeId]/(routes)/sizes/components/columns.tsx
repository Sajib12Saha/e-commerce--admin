"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumns= {
  id: string
  name : string
  value: string
  createAt: string
 
}

export const columns: ColumnDef<SizeColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "value",
    header: "Value",
  },
  
  {
    accessorKey: "createAt",
    header: "Date",
  },

  {
    id: "action",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
