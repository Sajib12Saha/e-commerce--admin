'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    title: string;
    des : string;
    isOpen : boolean;
    onClose: () => void;
    children ? : React.ReactNode;
}

export const Model= ({
    title,
    des,isOpen, onClose, children
}: Props) => {
    const onChange = (open:boolean) => {
        if(!open){

            onClose()

        }
    }
    return(
    
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
           
                <DialogDescription>
                    {des}
                </DialogDescription>
                </DialogHeader>

                <div>
                    {children}
                </div>
            </DialogContent>

        </Dialog>
    )
}