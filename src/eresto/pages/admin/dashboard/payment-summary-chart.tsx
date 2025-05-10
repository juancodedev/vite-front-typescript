import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { name: "Lun", ganancias: 4000 },
    { name: "Mar", ganancias: 3000 },
    { name: "Mié", ganancias: 5000 },
    { name: "Jue", ganancias: 2780 },
    { name: "Vie", ganancias: 1890 },
    { name: "Sáb", ganancias: 2390 },
    { name: "Dom", ganancias: 3490 },
]

export function PaymentSummaryChart() {
    return (
        <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `€${value}`} />
                <Tooltip
                    formatter={(value) => [`€${value}`, "Ventas"]}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Line
                    type="monotone"
                    dataKey="ganancias"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

