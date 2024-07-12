type Props = {
    title: string;
    des : string;
}

export const Heading = ({title, des}:Props) => {
    return (
        <div> 
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{des}</p>

        </div>
    )
}