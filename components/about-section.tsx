import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { personalData } from "@/lib/data"

interface AboutSectionProps {
  data: typeof personalData
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-xl text-muted-foreground">{data.title}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="lead">{data.summary}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Key details about me</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                <dd className="mt-1">{data.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${data.email}`} className="text-primary hover:underline">
                    {data.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Website</dt>
                <dd className="mt-1">
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {data.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Available for</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {data.availableFor.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          <div className="grid gap-6">
            {data.experience.map((exp, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{exp.position}</CardTitle>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                  <CardDescription>{exp.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
          <div className="grid gap-6">
            {data.education.map((edu, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{edu.degree}</CardTitle>
                    <Badge variant="outline">{edu.period}</Badge>
                  </div>
                  <CardDescription>{edu.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
