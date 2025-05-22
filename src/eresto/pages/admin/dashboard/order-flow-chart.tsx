import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { name: "Pendientes", value: 10, color: "#f59e0b" },
    { name: "En Preparación", value: 5, color: "#6366f1" },
    { name: "Entregados", value: 15, color: "#10b981" },
    { name: "Atrasados", value: 2, color: "#ef4444" },
]

export function OrderFlowChart() {
    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} barSize={30}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip
                    formatter={(value, name, props) => [`${value} pedidos`, props.payload.name]}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                />
                {data.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} name={entry.name} radius={[4, 4, 0, 0]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    )
}