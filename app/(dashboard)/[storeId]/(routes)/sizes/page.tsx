import { SizeClient } from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/size-client"
import prismadb from '@/lib/prismadb'
import { SizeColumns } from "./components/columns"
import {format} from 'date-fns'

const SizesPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedSizes: SizeColumns[] = sizes.map((item)=> ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <SizeClient data={formattedSizes}/>
            
         </div> 


    </div> 
    )
}

export default SizesPage 