import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, Bot, Sparkles } from "lucide-react"
import { Spotlight } from "../ui/spotlight-new"

export function HeroSection() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <Spotlight />

      <div className="container relative px-4 py-32 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-3 py-1 mb-8 text-sm rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Introducing Bot.AI - Your AI Assistant Platform
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Create Your AI Bot for{" "}
            <span className="text-primary">Helping You Upgrade</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-xl text-muted-foreground"
          >
            Build, customize and deploy AI bots that help you automate tasks,
            enhance productivity and scale your operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 mt-8"
          >
            <Button asChild size="lg" className="h-12 px-6">
              <Link to="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link to="/login">
                Sign In
                <Bot className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Floating elements animation */}
          <div className="relative mt-16">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <img
                src="https://foxtrot-aceternity.vercel.app/_next/image?url=%2Fimages%2Flanding.png&w=3840&q=75"
                alt="Dashboard Preview"
                className="rounded-lg shadow-2xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/10 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 