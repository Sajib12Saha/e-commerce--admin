'use client'

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-lits";



type Props = {
     data: ProductColumns[]
}


export const ProductClient = ({
    data
}: Props) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div  className="flex items-center justify-between">
            
            <Heading title={`Products (${data.length})`} des={'Manage products for your store'}/>

            <Button onClick={()=> router.push(`/${params.storeId}/products/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New 
            </Button>
            
             </div>
             <Separator/>
             <DataTable columns={columns} data={data} searchKey={'name'}/>
             <Heading title={'API'} des={'API calls for Products'}/>
             <Separator/>
             <ApiList entityName="products" entityIdName="productId"/>

             </>
    )
}