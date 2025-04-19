"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Like {
  id: string
  name: string
  timestamp: number
  color: string
}

export function LikeWidget() {
  const [name, setName] = useState("")
  const [likes, setLikes] = useState<Like[]>([])
  const [isLiking, setIsLiking] = useState(false)

  // Load likes from localStorage on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem("portfolio-likes")
    if (storedLikes) {
      try {
        const parsedLikes = JSON.parse(storedLikes) as Like[]
        // Filter out likes older than 24 hours
        const recentLikes = parsedLikes.filter((like) => Date.now() - like.timestamp < 24 * 60 * 60 * 1000)
        setLikes(recentLikes)
        // Save filtered likes back to localStorage
        localStorage.setItem("portfolio-likes", JSON.stringify(recentLikes))
      } catch (error) {
        console.error("Error parsing likes from localStorage:", error)
      }
    }
  }, [])

  // Generate a random color for the avatar
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Handle like submission
  const handleLike = () => {
    if (!name.trim()) return

    setIsLiking(true)

    // Create new like
    const newLike: Like = {
      id: Date.now().toString(),
      name: name.trim(),
      timestamp: Date.now(),
      color: getRandomColor(),
    }

    // Add to likes array
    const updatedLikes = [...likes, newLike]
    setLikes(updatedLikes)

    // Save to localStorage
    localStorage.setItem("portfolio-likes", JSON.stringify(updatedLikes))

    // Reset form
    setName("")

    // Show animation
    setTimeout(() => {
      setIsLiking(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Show Your Support</CardTitle>
        <CardDescription>Leave your name and like this portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLike()}
            disabled={isLiking}
          />
          <Button
            onClick={handleLike}
            disabled={!name.trim() || isLiking}
            className={cn("transition-all", isLiking && "animate-pulse bg-red-500 hover:bg-red-600")}
          >
            <Heart className={cn("mr-2 h-4 w-4", isLiking && "animate-ping fill-white")} />
            Like
          </Button>
        </div>

        {likes.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Recent Supporters</h4>
            <div className="flex flex-wrap gap-2">
              {likes.map((like) => (
                <div
                  key={like.id}
                  className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-3 py-1"
                  title={`${like.name} liked this portfolio`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className={like.color}>{getInitials(like.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{like.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
