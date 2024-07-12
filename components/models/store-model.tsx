'use client';

import  * as z from 'zod';
import { useStoreModel } from "@/hooks/use-store-model"
import { Model } from "@/components/ui/model"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';


const formSchema = z.object({
    name: z.string().min(3),
})

export const StoreModel = () => {
    const storeModel = useStoreModel()

    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async(values: z.infer<typeof formSchema>)=> {
        try{
       
            setLoading(true)
     
            const response = await axios.post('/api/stores', values)

        window.location.assign(`/${response.data.id}`)

        } catch(error){
           toast.error("Something went wrong")

        } finally{
            setLoading(false)
        }

    }
    return(
    <Model title="Create store" des="Add a new store to manage products and categories"
    isOpen={storeModel.isOpen}
    onClose={storeModel.onClose}>
     
     <div>
     <div className='space-y-4 py-2 pb-4'>
     <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control}
        name='name'
        render={({field}) => (
            <FormItem>
                <FormLabel>
                    Name
                </FormLabel>
                <FormControl>
                    <Input disabled={loading} placeholder='e-commerce' {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>

        )}/>
        <div className='pt-4 space-x-2 flex items-center justify-end'>

            <Button variant='outline' onClick={storeModel.onClose} disabled={loading}> Cancel </Button> 
            <Button type='submit' disabled={loading}> Continue </Button> 

        </div>

         </form>

    </Form>

     </div>
     </div>
   
 </Model>

    )

}
