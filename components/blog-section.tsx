"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusCircle, Edit, Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { BlogModal } from "@/components/blog/blog-modal"
import { BlogEditor } from "@/components/blog/blog-editor"
import { formatDate } from "@/lib/utils"

export function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/blogs")
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleCreateBlog = () => {
    setSelectedBlog(null)
    setIsEditorOpen(true)
  }

  const handleEditBlog = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsEditorOpen(true)
  }

  const handleViewBlog = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsViewerOpen(true)
  }

  const handleSaveBlog = async (blog: BlogPost) => {
    try {
      setLoading(true)
      setError(null)

      const isNew = !blog.id
      const method = isNew ? "POST" : "PUT"
      const response = await fetch("/api/blogs", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })

      if (!response.ok) {
        throw new Error(`Failed to save blog: ${response.status} ${response.statusText}`)
      }

      const savedBlog = await response.json()

      if (isNew) {
        setBlogs([...blogs, savedBlog])
      } else {
        setBlogs(blogs.map((b) => (b.id === savedBlog.id ? savedBlog : b)))
      }

      setIsEditorOpen(false)
    } catch (error) {
      console.error("Error saving blog:", error)
      setError("Failed to save blog. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete blog: ${response.status} ${response.statusText}`)
      }

      setBlogs(blogs.filter((blog) => blog.id !== id))
      setIsViewerOpen(false)
    } catch (error) {
      console.error("Error deleting blog:", error)
      setError("Failed to delete blog. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="blog" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
            <p className="text-muted-foreground">Thoughts, tutorials, and insights</p>
          </div>
          <Button onClick={handleCreateBlog} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-8 w-24" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden transition-all hover:shadow-md cursor-pointer group"
                onClick={() => handleViewBlog(blog)}
              >
                <div className="aspect-video w-full bg-muted overflow-hidden">
                  <img
                    src={blog.thumbnail || "/placeholder.svg"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditBlog(blog)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{blog.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {blogs.length === 0 && !loading && !error && (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-muted p-6">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium">No blog posts yet</h3>
              <p className="text-muted-foreground">Create your first blog post to share your thoughts and insights.</p>
              <Button onClick={handleCreateBlog}>Create Blog Post</Button>
            </div>
          </Card>
        )}
      </div>

      <BlogModal
        blog={selectedBlog}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onEdit={() => {
          setIsViewerOpen(false)
          setIsEditorOpen(true)
        }}
        onDelete={handleDeleteBlog}
      />

      <BlogEditor
        blog={selectedBlog}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveBlog}
      />
    </section>
  )
}
