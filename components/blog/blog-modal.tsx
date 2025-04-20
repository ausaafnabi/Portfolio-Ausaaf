"use client"

import { useState, useEffect } from "react"
import { X, Edit, Trash2, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/blog-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BlogModalProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: (id: string) => void
}

export function BlogModal({ blog, isOpen, onClose, onEdit, onDelete }: BlogModalProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!blog) return null

  const handleDelete = () => {
    onDelete(blog.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-3/4 lg:w-2/3 bg-background shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Blog Post</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={onEdit}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <div className="relative aspect-video w-full bg-muted">
            <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} className="h-full w-full object-cover" />
          </div>

          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(blog.updatedAt)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }} />
            </div>
          </ScrollArea>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Simple markdown renderer function
function renderMarkdown(markdown: string): string {
  // This is a very basic markdown renderer
  // In a production app, you'd use a proper markdown library
  return markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n- (.*)/g, '<ul class="list-disc pl-5 my-3"><li>$1</li></ul>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>')
    .replace(/\n/g, "<br />")
}
