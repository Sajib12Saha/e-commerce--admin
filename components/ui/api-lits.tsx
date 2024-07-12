'use client'

import { useOrigin } from "@/hooks/use-origin";
import { useParams} from "next/navigation";
import { ApiAlert } from "./api-alert";

type Props = {
    entityName : string ;
    entityIdName: string;
}

export const  ApiList = ({entityName, entityIdName}:Props) => {

    const params = useParams()
   const origin = useOrigin()
   const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
       <ApiAlert title="GET" variant="public"
       desc={`${baseUrl}/${entityName}`}/>
       <ApiAlert title="GET" variant="public"
       desc={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
       
        <ApiAlert title="POST" variant="admin"
       desc={`${baseUrl}/${entityName}`}/>
        
        <ApiAlert title="PATCH" variant="admin"
       desc={`${baseUrl}/${entityName}/{${entityIdName}}`}/>

      <ApiAlert title="DELETE"         variant="admin"
       desc={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
       </>
    )
}