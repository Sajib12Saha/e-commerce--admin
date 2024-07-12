'use client'

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
     data: OrderColumns[]
}


export const OrderClient = ({
    data
}: Props) => {



    return (
        <>
   
            
            <Heading title={`Orders (${data.length})`} des={'Manage orders for your store'}/>

             <Separator/>
             <DataTable columns={columns} data={data} searchKey={'products'}/>
          

             </>
    )
}