'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SizeColumns } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter, useParams } from "next/navigation";
import axios from "axios"
import { useState } from "react"
import { AlertModel } from "@/components/models/alert-model"


type Props = {
    data: SizeColumns
}

export const CellAction = ({
    data
}:Props) => {
    const router = useRouter()
    const params= useParams()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id:string) => {

        navigator.clipboard.writeText(id)
        toast.success("Size Id copied to the clipboard")
    }


    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh();
           
            toast.success("Size deleted");


        } catch ( error) {
            toast.error("Make sure you removed all  categories using this sizes first")

        }
            finally {
                setLoading(false)
                setOpen(false)
            }

    }



    return (
        <>
        <AlertModel isOpen ={open}
        onClose={()=> setOpen(false)}
        onConfirm={onDelete}
        loading={loading}/>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Action
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=> {onCopy(data.id )}}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> {router.push(`/${params.storeId}/sizes/${data.id}`)}}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </DropdownMenuItem>

            <DropdownMenuItem onClick ={()=> setOpen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                Delete
                
            </DropdownMenuItem>

        </DropdownMenuContent>
       </DropdownMenu>
       </>
    )
}