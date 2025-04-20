import { type NextRequest, NextResponse } from "next/server"
import { blogPosts as initialBlogPosts, type BlogPost } from "@/lib/blog-data"
import { v4 as uuidv4 } from "uuid"

// In-memory storage for blog posts
// This will reset on server restart, but works for demo purposes
let blogPostsStore = [...initialBlogPosts]

// GET handler to retrieve all blogs or a specific blog
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")

    if (slug) {
      const blog = blogPostsStore.find((b) => b.slug === slug)
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 })
      }
      return NextResponse.json(blog)
    }

    return NextResponse.json(blogPostsStore)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

// POST handler to create a new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content || !body.description) {
      return NextResponse.json({ error: "Title, content, and description are required" }, { status: 400 })
    }

    // Create slug from title
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

    // Check if slug already exists
    if (blogPostsStore.some((blog) => blog.slug === slug)) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 })
    }

    // Create new blog post
    const newBlog: BlogPost = {
      id: uuidv4(),
      title: body.title,
      slug,
      description: body.description,
      content: body.content,
      thumbnail: body.thumbnail || "/placeholder.svg?height=400&width=600",
      tags: body.tags || [],
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to blogs array
    blogPostsStore.push(newBlog)

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

// PUT handler to update a blog
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 })
    }

    const index = blogPostsStore.findIndex((blog) => blog.id === body.id)

    if (index === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Update blog
    const updatedBlog = {
      ...blogPostsStore[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    blogPostsStore[index] = updatedBlog

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE handler to delete a blog
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 })
    }

    const initialLength = blogPostsStore.length
    blogPostsStore = blogPostsStore.filter((blog) => blog.id !== id)

    if (blogPostsStore.length === initialLength) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
