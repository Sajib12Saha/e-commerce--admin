"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumns= {
  id: string
  phone: string
  address: string
  paid: boolean
  products: string
  totalPrice: string
  createAt: string
 
}

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },

  {
    accessorKey: "phone",
    header: "Phone",
    
  },

  
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "totalPrice",
    header: "Total Price"

  },

  {
    accessorKey: "paid",
    header: "Paid",
  },
  
  {
    accessorKey: "createAt",
    header: "Date",
  },

]
