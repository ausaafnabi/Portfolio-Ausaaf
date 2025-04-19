import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { personalData } from "@/lib/data"

export function PublicationsSection() {
  return (
    <section id="publications" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Publications</h2>
          <p className="text-muted-foreground">My research contributions and academic papers</p>
        </div>

        <div className="grid gap-6">
          {personalData.publications.map((publication, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{publication.title}</CardTitle>
                  <Badge variant="secondary">{publication.year}</Badge>
                </div>
                <CardDescription>{publication.journal || publication.publisher}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {publication.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>

                {publication.doi && (
                  <Button asChild variant="outline" size="sm" className="mt-2">
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span>View Publication</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
