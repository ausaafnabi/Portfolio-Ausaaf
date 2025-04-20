"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Github, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { personalData } from "@/lib/data"

// Pre-fetched repository data to avoid API rate limits on GitHub Pages
const staticRepoData = [
  {
    id: 1,
    name: "GADES",
    description: "GPU-accelerated Kendall distance computation for large or sparse data",
    html_url: "https://github.com/lab-medvedeva/GADES-main",
    homepage: "https://lab-medvedeva.github.io/GADES-main",
    stargazers_count: 12,
    language: "C++",
    topics: ["bioinformatics", "gpu", "cuda", "genomics"],
  },
  {
    id: 2,
    name: "portfolio-website",
    description: "My personal portfolio website built with Next.js and Tailwind CSS",
    html_url: `https://github.com/${personalData.githubUsername}/portfolio-website`,
    homepage: `https://${personalData.githubUsername}.github.io/portfolio-website`,
    stargazers_count: 5,
    language: "TypeScript",
    topics: ["nextjs", "tailwindcss", "portfolio", "react"],
  },
  {
    id: 3,
    name: "reward-distribution-bot",
    description: "Telegram bot for monitoring and distributing rewards from web3 contracts",
    html_url: `https://github.com/${personalData.githubUsername}/reward-distribution-bot`,
    homepage: "",
    stargazers_count: 3,
    language: "Python",
    topics: ["telegram", "web3", "blockchain", "bot"],
  },
  {
    id: 4,
    name: "edge-computing-framework",
    description: "Framework for efficient load balancing in multi-access edge computing",
    html_url: `https://github.com/${personalData.githubUsername}/edge-computing-framework`,
    homepage: "",
    stargazers_count: 7,
    language: "Go",
    topics: ["edge-computing", "load-balancing", "networking", "distributed-systems"],
  },
  {
    id: 5,
    name: "retinopathy-detection",
    description: "AI-powered diabetic retinopathy detection system with 92% accuracy",
    html_url: `https://github.com/${personalData.githubUsername}/retinopathy-detection`,
    homepage: `https://${personalData.githubUsername}.github.io/retinopathy-detection`,
    stargazers_count: 9,
    language: "Python",
    topics: ["machine-learning", "healthcare", "computer-vision", "deep-learning"],
  },
  {
    id: 6,
    name: "order-management-system",
    description: "Web-based order management system for small businesses and restaurants",
    html_url: `https://github.com/${personalData.githubUsername}/order-management-system`,
    homepage: "",
    stargazers_count: 4,
    language: "JavaScript",
    topics: ["web-app", "restaurant", "management", "react"],
  },
]

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  language: string
  topics: string[]
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRepos() {
      try {
        // For GitHub Pages static deployment, use the static data
        if (process.env.NODE_ENV === "production") {
          setRepos(staticRepoData)
          setLoading(false)
          return
        }

        // For development, try to fetch from GitHub API
        const response = await fetch(
          `https://api.github.com/users/${personalData.githubUsername}/repos?sort=updated&per_page=6`,
        )
        if (response.ok) {
          const data = await response.json()
          setRepos(data)
        } else {
          // Fallback to static data if API fails
          setRepos(staticRepoData)
        }
      } catch (error) {
        console.error("Error fetching repositories:", error)
        // Fallback to static data if fetch fails
        setRepos(staticRepoData)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <section id="projects" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">My latest GitHub repositories</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))
            : repos.map((repo) => (
                <Card key={repo.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{repo.name}</span>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {repo.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                      {repo.topics?.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button asChild size="sm" className="flex-1">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <a href={`https://github.com/${personalData.githubUsername}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
