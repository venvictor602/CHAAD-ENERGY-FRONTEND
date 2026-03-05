import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center space-y-8"
        variants={itemVariants}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          {APP_NAME}
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Smart energy management and sustainability solutions for the future.
        </p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={itemVariants}
        >
          <Button size="lg" asChild>
            <a href="/login">Get Started</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/register">Register</a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
