"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatWindow } from "@/components/chat/chat-window"
import { cn } from "@/lib/utils"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-50 rounded-full shadow-lg h-14 w-14 p-0",
          "transition-all duration-300 ease-in-out",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
          isOpen && "rotate-90",
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
