import { motion } from "framer-motion"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { BackgroundBeams } from "@/components/ui/background-beams"

const testimonials = [
  {
    quote: "This AI bot platform has transformed how we handle customer support.",
    name: "Sarah Johnson",
    title: "Customer Success Manager",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    quote: "The customization options are endless. Exactly what we needed.",
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://i.pravatar.cc/100?img=2",
  },
  // Add more testimonials...
]

const benefits = [
  {
    title: "Intelligent Automation",
    description: "Automate repetitive tasks with AI-powered bots that learn and adapt.",
  },
  {
    title: "24/7 Availability",
    description: "Your bots work round the clock, ensuring constant support and engagement.",
  },
  {
    title: "Cost Effective",
    description: "Reduce operational costs while maintaining high-quality service.",
  },
]

export function WhyUsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <BackgroundBeams />
      
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Bot.AI?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of automation with our cutting-edge AI bot platform.
            Here's why thousands of businesses trust us.
          </p>
        </motion.div>

        <TracingBeam>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </TracingBeam>

        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-8">
            What Our Users Say
          </h3>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  )
} 