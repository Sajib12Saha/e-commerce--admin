'use client'
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {Billboard, Category} from "@prisma/client";
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
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";



const formSchema = z.object({
    name: z.string().min(3).max(30),
    billboardId: z.string().min(3)
})


type Props = {
    initialData: Category | null;
    billboards: Billboard[];
}

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm = ({initialData, billboards}: Props) => {

    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category";

    const desc = initialData ? "Edit  a category" : "Add a new category";
    const toastMessage = initialData ? "Category Update" : "Category created"
    const action = initialData ? "Save changes" : "Create billboard"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema), defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
        
    })
    

    const onSubmit = async (data: CategoryFormValues) => {
       try{
        setLoading(true)
        if(initialData){

            await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
        }
        else{

            await axios.post(`/api/${params.storeId}/categories`, data)
        }
      
      
        router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)

           
            router.push(`/${params.storeId}/categories`);
            router.refresh();
           
            toast.success("Category deleted");


        } catch ( error) {
            toast.error("Make sure you removed all products using this categories first")

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
                                <Input disabled={loading} placeholder="Category name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="billboardId"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>
                                Billboards
                            </FormLabel>
                            
                             <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                
                             <FormControl>
                               <SelectTrigger>
                                <SelectValue defaultValue={field.value} placeholder="Select a billboard">

                                </SelectValue>

                                </SelectTrigger> 
                             </FormControl>

                        <SelectContent>
                            {billboards.map((billboard)=> (
                                <SelectItem key={billboard.id} value={billboard.id}>
                                  {billboard.label}  
                                </SelectItem>

                            ))}
                        </SelectContent>
                             </Select>
                            
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