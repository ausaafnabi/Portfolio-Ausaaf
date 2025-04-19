"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

interface Skill {
  name: string
  level: number
}

interface RadarSkillChartProps {
  skills: Skill[]
}

export function RadarSkillChart({ skills }: RadarSkillChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
        <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
        <PolarAngleAxis dataKey="name" tick={{ fill: "currentColor" }} />
        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "currentColor" }} />
        <Radar
          name="Skills"
          dataKey="level"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
          animationDuration={1500}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Proficiency"]}
          contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
