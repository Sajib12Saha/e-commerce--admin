'use client'
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Color} from "@prisma/client";
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
    value: z.string().min(4).regex(/^#/, {
        message: "String must be a valid hex code"
    }),
});


type Props = {
    initialData: Color | null;
}

type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm = ({initialData}: Props) => {

    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit color" : "Create color";

    const desc = initialData ? "Edit  a color" : "Add a new color";
    const toastMessage = initialData ? "Color Update" : "Color created"
    const action = initialData ? "Save changes" : "Create color"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema), defaultValues: initialData || {
            name: '',
            value: ''
        }
        
    })
    

    const onSubmit = async (data: ColorFormValues) => {
       try{
        setLoading(true)
        if(initialData){

            await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
        }
        else{

            await axios.post(`/api/${params.storeId}/colors`, data)
        }
        
      
        router.push(`/${params.storeId}/colors`)
        router.refresh();
        toast.success(toastMessage)


        }
       
       catch (error) {

            toast.error("Something went wrong")
       } 
       finally {

        setLoading(false)
       }

    
};

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.sizeId}`)

           
            router.push(`/${params.storeId}/colors`);
            router.refresh();
           
            toast.success("Color deleted");


        } catch ( error) {
            toast.error("Make sure you removed all  products using this color first")

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
                            <Input disabled={loading} placeholder="Color name" {...field}/>
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
                                <div className="flex items-center gap-x-2">
                                <Input disabled={loading} placeholder="Color value" {...field}/>
                                <div className="border p-4 rounded-full" style={{backgroundColor:field.value}}/>
                                </div>
                               
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