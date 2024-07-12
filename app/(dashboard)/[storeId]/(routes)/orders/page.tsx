import { OrderClient } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/order-client";
import prismadb from '@/lib/prismadb'
import { OrderColumns } from "./components/columns";
import {format} from 'date-fns';
import {formatter} from '@/lib/utils';

const OrdersPage = async ({params}: {
    params: {storeId:string}
}
   ) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {

        orderItems: {

            include: {
                product: true

            }
            
        }
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    const formattedOrders: OrderColumns[] = orders.map((item)=> ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        paid: item.isPaid,
        products: item.orderItems.map((orderItem)=>orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item)=> {

           return total + Number(item.product.price)
        },0)),

         createAt: format(item.createAt, "MMMM da, yyyy" )
    }

    ))
    return (
        <div className="flex-col"> 
        <div className= "flex-1 space-y-4 p-8 pt-4">
            <OrderClient data={formattedOrders}/>
            
         </div> 


    </div> 
    )
}

export default OrdersPage 