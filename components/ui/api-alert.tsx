'use client'

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

type Props = {
    title: string;
    desc: string;
    variant: "public" | "admin";
}

const textMap: Record<Props["variant"], string> = {
    public: "Public",
    admin : "Admin"
}

const variantMap: Record<Props["variant"], BadgeProps['variant']> = {
    public: "secondary",
    admin : "destructive"
}
export const ApiAlert = ({title, desc, variant="public"}: Props) => {

    const onCopy = () => {

        navigator.clipboard.writeText(desc)
        toast.success("API Route copied to the clipboard")
    }

    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap=x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}

                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem font-mono text-sm font-semibold">
                    {desc}
                </code>
                <Button variant="outline" size="icon" onClick= {onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>

    )
}