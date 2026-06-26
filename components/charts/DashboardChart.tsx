"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DashboardChartProps {
  title: string
  data: Array<{ name: string; value: number }>
  stroke?: string
}

export default function DashboardChart({ title, data, stroke = "#8b5cf6" }: DashboardChartProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: "#9ca3af", fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "#9ca3af", fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(17, 24, 39, 0.85)", 
                border: "none", 
                borderRadius: "0.5rem" 
              }}
              labelStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={stroke} 
              strokeWidth={2} 
              dot={{ fill: stroke, r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}