'use client'

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-lits";



type Props = {
     data: ColorColumns[]
}


export const ColorClient = ({
    data
}: Props) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div  className="flex items-center justify-between">
            
            <Heading title={`Colors (${data.length})`} des={'Manage colors for your store'}/>

            <Button onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New 
            </Button>
            
             </div>
             <Separator/>
             <DataTable columns={columns} data={data} searchKey={'name'}/>
             <Heading title={'API'} des={'API calls for Colors'}/>
             <Separator/>
             <ApiList entityName="colors" entityIdName="colorId"/>

             </>
    )
}