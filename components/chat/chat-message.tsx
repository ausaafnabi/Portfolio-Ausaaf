import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: {
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start gap-2 animate-slide-in", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="h-8 w-8">
        {isUser ? (
          <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
        ) : (
          <>
            <AvatarImage src="/avatar.png" alt="AI Assistant" />
            <AvatarFallback className="bg-blue-600">AI</AvatarFallback>
          </>
        )}
      </Avatar>

      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[80%] text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-50 mt-1 block">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  )
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
