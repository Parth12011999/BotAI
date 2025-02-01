import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex justify-between md:px-28 h-14 items-center">
        <div className=" flex">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6" />
            <span className="font-bold inline-block">Bot.AI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <ModeToggle />

          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 