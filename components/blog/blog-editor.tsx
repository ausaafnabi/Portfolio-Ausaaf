"use client"

import { useState, useEffect } from "react"
import { X, Save, ImageIcon, Link, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/blog-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface BlogEditorProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
  onSave: (blog: BlogPost) => void
}

export function BlogEditor({ blog, isOpen, onClose, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("edit")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setSlug(blog.slug)
      setDescription(blog.description)
      setContent(blog.content)
      setThumbnail(blog.thumbnail)
      setTags(blog.tags)
    } else {
      setTitle("")
      setSlug("")
      setDescription("")
      setContent("")
      setThumbnail("/placeholder.svg?height=400&width=600")
      setTags([])
    }
  }, [blog, isOpen])

  const handleSave = () => {
    const updatedBlog: Partial<BlogPost> = {
      id: blog?.id,
      title,
      slug:
        slug ||
        title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      description,
      content,
      thumbnail,
      tags,
    }

    onSave(updatedBlog as BlogPost)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const insertMarkdown = (type: string) => {
    let insertion = ""
    let selectionStart = 0
    let selectionEnd = 0

    switch (type) {
      case "image":
        insertion = "![Alt text](https://example.com/image.jpg)"
        break
      case "link":
        insertion = "[Link text](https://example.com)"
        break
      case "heading":
        insertion = "## Heading"
        break
      case "bold":
        insertion = "**Bold text**"
        break
      case "italic":
        insertion = "*Italic text*"
        break
      case "code":
        insertion = "```\nCode block\n```"
        break
      case "list":
        insertion = "- Item 1\n- Item 2\n- Item 3"
        break
      default:
        break
    }

    setContent((prev) => {
      const textarea = document.getElementById("content") as HTMLTextAreaElement
      if (textarea) {
        selectionStart = textarea.selectionStart
        selectionEnd = textarea.selectionEnd

        return prev.substring(0, selectionStart) + insertion + prev.substring(selectionEnd)
      }
      return prev + insertion
    })
  }

  if (!mounted) return null

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
            <h2 className="text-lg font-semibold">{blog ? "Edit Blog Post" : "Create Blog Post"}</h2>
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={handleSave} disabled={!title || !content || !description}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (optional)</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="enter-blog-slug" />
                <p className="text-xs text-muted-foreground">Leave empty to generate from title</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your blog post"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button variant="outline" onClick={handleAddTag} disabled={!newTag.trim()}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="border rounded-md">
                  <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center justify-between border-b px-4 py-2">
                      <TabsList>
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>

                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("image")}>
                          <ImageIcon className="h-4 w-4" />
                          <span className="sr-only">Insert image</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("link")}>
                          <Link className="h-4 w-4" />
                          <span className="sr-only">Insert link</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("heading")}>
                          H
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("bold")}>
                          <span className="font-bold">B</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("italic")}>
                          <span className="italic">I</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("code")}>
                          {"</>"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("list")}>
                          <span>• •</span>
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="edit" className="p-0 m-0">
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog post content in Markdown..."
                        className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 resize-none"
                      />
                    </TabsContent>

                    <TabsContent value="preview" className="p-4 m-0">
                      <div className="min-h-[400px] prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
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
