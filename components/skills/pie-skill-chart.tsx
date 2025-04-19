"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface Skill {
  name: string
  level: number
}

interface PieSkillChartProps {
  skills: Skill[]
}

export function PieSkillChart({ skills }: PieSkillChartProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={skills}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="level"
          animationDuration={1500}
        >
          {skills.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Proficiency"]}
          contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
