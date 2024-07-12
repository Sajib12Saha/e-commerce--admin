'use client'
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Size} from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { AlertModel } from "@/components/models/alert-model";



const formSchema = z.object({
    name: z.string().min(3).max(30),
    value: z.string().min(1)
})


type Props = {
    initialData: Size | null;
}

type SizeFormValues = z.infer<typeof formSchema>;

export const SizeForm = ({initialData}: Props) => {

    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit size" : "Create size";

    const desc = initialData ? "Edit  a size" : "Add a new size";
    const toastMessage = initialData ? "Size Update" : "Size created"
    const action = initialData ? "Save changes" : "Create size"

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema), defaultValues: initialData || {
            name: '',
            value: ''
        }
        
    })
    

    const onSubmit = async (data: SizeFormValues) => {
       try{
        setLoading(true)
        if(initialData){

            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
        }
        else{

            await axios.post(`/api/${params.storeId}/sizes`, data)
        }
      
      
        router.push(`/${params.storeId}/sizes`)
        router.refresh();
        toast.success(toastMessage)


       } catch (error) {

            toast.error("Something went wrong")
       } finally {

        setLoading(false)
       }

    };

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)

           
            router.push(`/${params.storeId}/sizes`);
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
        <AlertModel isOpen={open} 
        onClose={()=> setOpen(false)} 
        onConfirm={onDelete}
        loading={loading}/>
        <div className="flex items-center justify-between"> 
        <Heading title={title}
        des={desc}/>

        {initialData && (
               <Button variant={'destructive'}
               onClick={()=> setOpen(true)} size="icon" disabled={loading}>
       
                   <Trash className="h-4 w-4"/>
               </Button>
        )}
     

        </div>
        
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8">
                
            <FormField
                    control={form.control}
                    name="name"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>
                             Name
                            </FormLabel>
                            <FormControl>
                            <Input disabled={loading} placeholder="Size name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

               
                    <FormField
                    control={form.control}
                    name="value"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>
                                Value
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Size value" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                </Button>

            </form>

        </Form>
    
      
      
        </>
        
        
    )
}