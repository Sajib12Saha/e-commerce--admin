import { ProductClient } from "@/app/(dashboard)/[storeId]/(routes)/products/components/product-client"
import prismadb from '@/lib/prismadb'
import { ProductColumns } from "./components/columns";
import {format} from 'date-fns';
import {formatter} from '@/lib/utils';

const ProductsPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {

            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedProducts: ProductColumns[] = products.map((item)=> ({
        id: item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <ProductClient data={formattedProducts}/>
            
         </div> 


    </div> 
    )
}

export default ProductsPage 