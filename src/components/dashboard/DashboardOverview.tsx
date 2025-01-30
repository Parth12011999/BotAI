import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "10.5k",
    icon: Users,
    trend: "+12%",
    description: "vs. last month",
  },
  {
    title: "Revenue",
    value: "$45.2k",
    icon: DollarSign,
    trend: "+8%",
    description: "vs. last month",
  },
  {
    title: "Orders",
    value: "1,234",
    icon: ShoppingCart,
    trend: "+23%",
    description: "vs. last month",
  },
  {
    title: "Growth",
    value: "18%",
    icon: TrendingUp,
    trend: "+2%",
    description: "vs. last month",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DashboardOverview() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.trend}</span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
} 