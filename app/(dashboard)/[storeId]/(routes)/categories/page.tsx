import {CategoryClient } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/category-client"
import prismadb from '@/lib/prismadb'
import { CategoryColumns } from "./components/columns"
import {format} from 'date-fns'

const CategoriesPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {

            billboard: true,
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumns[] = categories.map((item)=> ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <CategoryClient data={formattedCategories}/>
            
         </div> 


    </div> 
    )
}

export default CategoriesPage 