import { Bot, Github, Twitter } from "lucide-react"
import { Link } from "react-router-dom"
import { BackgroundBeams } from "@/components/ui/background-beams"

export function Footer() {
  return (
    <footer className="relative border-t">
      <BackgroundBeams />
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold">Bot.AI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Creating intelligent AI bots for a smarter future.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-8 mt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © 2024 Bot.AI. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com" className="text-muted-foreground hover:text-primary">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 