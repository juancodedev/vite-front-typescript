"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Libres", value: 5, color: "#10b981" },
  { name: "Ocupadas", value: 8, color: "#f59e0b" },
  { name: "Reservadas", value: 3, color: "#6366f1" },
  { name: "Cuenta Pedida", value: 2, color: "#3b82f6" },
]

export function TableStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} mesas`, name]}
          contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  )
}

