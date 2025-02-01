import { motion } from "framer-motion"
import { 
  Bot, 
  Brain, 
  MessageSquare, 
  Settings, 
  Sparkles,
  Zap
} from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "Pre-built Bot Templates",
    description: "Get started quickly with our pre-built bot templates for various use cases.",
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Leverage advanced AI models to make your bots smarter and more efficient.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Enable natural, human-like conversations with advanced language processing.",
  },
  {
    icon: Settings,
    title: "Easy Customization",
    description: "Customize your bots' behavior and responses with our intuitive interface.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Process and respond to user inputs in real-time for seamless interactions.",
  },
  {
    icon: Sparkles,
    title: "Continuous Learning",
    description: "Bots that learn and improve from interactions over time.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 bg-background rounded-lg shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 