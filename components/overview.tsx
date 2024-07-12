'use client'
import {Bar,BarChart,ResponsiveContainer, XAxis, YAxis} from 'recharts';

type Props = {
    data: any[];
}

export const Overview = ({data}:Props) => {
    return (
       <ResponsiveContainer width='100%' height={350}>

        <BarChart data={data}>
            <XAxis dataKey={'name'} stroke='#888888' tickLine={false} axisLine={false} fontSize={12}/>
            <YAxis stroke='#888888' tickLine={false} axisLine={false} tickFormatter={(value)=> `$${value}`}/>
                <Bar dataKey={'total'} fill='#3498db' radius={[4,4,0,0]}/>


        </BarChart>
       </ResponsiveContainer>
    )
}