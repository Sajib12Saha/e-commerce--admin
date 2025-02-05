'use client'
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {Store} from "@prisma/client";
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
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

type Props = {
    initialData: Store;
}


const formSchema = z.object({
    name: z.string().min(3).max(30)
})
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm = ({initialData}: Props) => {

    const params = useParams();
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const origin = useOrigin();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema), defaultValues: initialData 
        
    });
    

    const onSubmit = async (data: SettingsFormValues) => {
       try{
        setLoading(true)
        await axios.patch(`/api/stores/${params.storeId}`, data)
        router.refresh();
        toast.success("Store updated")


       } catch (error) {

            toast.error("Something went wrong")
       } finally {

        setLoading(false)
       }

    };

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push('/');
            toast.success("Store deleted");


        } catch ( error) {
            toast.error("Make sure you removed all prducts and categories first")

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
        <Heading title="Settings"
        des="Manage store preferences"/>

        <Button variant={'destructive'}
        onClick={()=> setOpen(true)} size="icon" disabled={loading}>

            <Trash className="h-4 w-4"/>
        </Button>

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
                                <Input disabled={loading} placeholder="Store name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    Save changes
                </Button>

            </form>

        </Form>
        <Separator/>
        <ApiAlert title="NEXT_PUBLIC_API_URL" desc={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
        
        
    )
}