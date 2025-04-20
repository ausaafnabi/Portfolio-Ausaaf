"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Progress } from "@/components/ui/progress"
import { BubbleChart } from "@/components/skills/bubble-chart"
import { SkillMatrix } from "@/components/skills/skill-matrix"
import { RadarSkillChart } from "@/components/skills/radar-skill-chart"
import { PieSkillChart } from "@/components/skills/pie-skill-chart"

interface SkillsProps {
  skills: {
    programmingLanguages: Array<{ name: string; level: number }>
    frameworks: Array<{ name: string; level: number }>
    developerTools: Array<{ name: string; level: number }>
    libraries: Array<{ name: string; level: number }>
    softSkills: Array<{ name: string; level: number }>
    languages: Array<{ name: string; level: number }>
  }
}

export function SkillsSection({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState("frameworks")

  return (
    <section id="skills" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground">My professional skillset visualized</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>Explore my technical expertise across different domains</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="programming" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="programming">Programming</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="tools">Dev Tools</TabsTrigger>
                <TabsTrigger value="libraries">Libraries</TabsTrigger>
              </TabsList>

              <TabsContent value="programming" className="space-y-4 pt-4">
                <div className="h-[350px] w-full">
                  <SkillMatrix skills={skills.programmingLanguages} />
                </div>
              </TabsContent>

              <TabsContent value="frameworks" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  {skills.frameworks.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tools" className="space-y-4 pt-4">
                <div className="h-[350px] w-full">
                  <BubbleChart skills={skills.developerTools} />
                </div>
              </TabsContent>

              <TabsContent value="libraries" className="space-y-4 pt-4">
                <div className="h-[350px] w-full">
                  <RadarSkillChart skills={skills.libraries} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
              <CardDescription>Interpersonal and management skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full pt-4 flex justify-center">
                <RadarSkillChart skills={skills.softSkills} /> 
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Language proficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieSkillChart skills={skills.languages} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
