"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { personalData } from "@/lib/data"
import { ChatMessage } from "@/components/chat/chat-message"

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hi there! I'm ${personalData.name}'s AI assistant. How can I help you learn more about ${personalData.name}'s experience, skills, or projects?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(
      () => {
        const response = generateResponse(input)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const generateResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase()

    // Experience related queries
    if (normalizedQuery.includes("experience") || normalizedQuery.includes("work")) {
      return `${personalData.name} has worked as a ${personalData.experience[0].position} at ${personalData.experience[0].company}, where they ${personalData.experience[0].achievements[0].toLowerCase()}. Previously, they worked as a ${personalData.experience[1].position} at ${personalData.experience[1].company}. Would you like to know more about a specific role?`
    }

    // Education related queries
    if (
      normalizedQuery.includes("education") ||
      normalizedQuery.includes("study") ||
      normalizedQuery.includes("degree")
    ) {
      return `${personalData.name} has a ${personalData.education[0].degree} from ${personalData.education[0].institution}, graduating in ${personalData.education[0].period.split(" ").pop()}. They also have a ${personalData.education[1].degree} from ${personalData.education[1].institution}.`
    }

    // Skills related queries
    if (
      normalizedQuery.includes("skill") ||
      normalizedQuery.includes("technology") ||
      normalizedQuery.includes("programming")
    ) {
      const topLanguages = personalData.skills.programmingLanguages
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
        .map((skill) => skill.name)
        .join(", ")

      return `${personalData.name} is highly skilled in ${topLanguages}. They also have experience with frameworks like ${personalData.skills.frameworks[0].name} and ${personalData.skills.frameworks[1].name}. What specific skills would you like to know more about?`
    }

    // Project related queries
    if (
      normalizedQuery.includes("project") ||
      normalizedQuery.includes("portfolio") ||
      normalizedQuery.includes("github")
    ) {
      return `${personalData.name} has worked on several projects, including ${personalData.projects[0].name} at ${personalData.projects[0].organization}. They also maintain active GitHub repositories that showcase their work. Would you like me to highlight any specific project?`
    }

    // Publication related queries
    if (
      normalizedQuery.includes("publication") ||
      normalizedQuery.includes("paper") ||
      normalizedQuery.includes("research")
    ) {
      return `${personalData.name} has published research papers including "${personalData.publications[0].title}" in ${personalData.publications[0].journal || personalData.publications[0].publisher} (${personalData.publications[0].year}). Their research focuses on ${personalData.publications[0].highlights[0].toLowerCase()}.`
    }

    // Contact related queries
    if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("reach")) {
      return `You can contact ${personalData.name} via email at ${personalData.email} or through their website at ${personalData.website}.`
    }

    // Location related queries
    if (
      normalizedQuery.includes("location") ||
      normalizedQuery.includes("where") ||
      normalizedQuery.includes("country")
    ) {
      return `${personalData.name} is currently based in ${personalData.location}.`
    }

    // General queries about the person
    if (normalizedQuery.includes("who") || normalizedQuery.includes("about") || normalizedQuery.includes("tell me")) {
      return `${personalData.name} is a ${personalData.title} with experience in AI systems, 3D computer vision, and bioinformatics. ${personalData.summary}`
    }

    // Fallback response
    return `Thanks for your question about ${personalData.name}. They are a ${personalData.title} with expertise in various technologies. Can you be more specific about what you'd like to know? You can ask about their experience, education, skills, projects, or publications.`
  }

  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 z-40 w-80 md:w-96 rounded-lg shadow-lg bg-card border border-border",
        "transition-all duration-300 ease-in-out transform",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
        "flex flex-col h-[500px] max-h-[80vh]",
      )}
    >
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Chat with {personalData.name}'s AI</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-pulse">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="sr-only">AI is typing</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex space-x-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my experience, skills..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
