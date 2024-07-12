import { ColorClient } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/color-client"
import prismadb from '@/lib/prismadb'
import { ColorColumns } from "./components/columns"
import {format} from 'date-fns'

const ColorsPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedColors: ColorColumns[] = colors.map((item)=> ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <ColorClient data={formattedColors}/>
            
         </div> 


    </div> 
    )
}

export default ColorsPage 