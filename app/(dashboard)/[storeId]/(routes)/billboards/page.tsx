import { BillboardClient } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/billboard-client"
import prismadb from '@/lib/prismadb'
import { BillboardColumns } from "./components/columns"
import {format} from 'date-fns'

const BillboardsPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedBillboards: BillboardColumns[] = billboards.map((item)=> ({
        id: item.id,
        label: item.label,
        createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <BillboardClient data={formattedBillboards}/>
            
         </div> 


    </div> 
    )
}

export default BillboardsPage 