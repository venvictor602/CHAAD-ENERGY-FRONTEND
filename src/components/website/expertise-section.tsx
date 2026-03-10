"use client";

import { motion } from "framer-motion";

import { ServiceCard } from "./service-card";

const SERVICES = [
  {
    imageSrc: "https://picsum.photos/seed/chaad-epc/600/450",
    imageAlt: "EPC services - engineering and construction",
    title: "EPC Services",
    description:
      "Complete Engineering, Procurement, and Construction management delivered on schedule and within budget.",
    href: "#epc",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-commissioning/600/450",
    imageAlt: "Commissioning and system testing",
    title: "Commissioning",
    description:
      "Ensuring operational readiness and performance optimization through rigorous testing and quality assurance.",
    href: "#commissioning",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-cathodic/600/450",
    imageAlt: "Cathodic protection systems",
    title: "Cathodic Protection",
    description:
      "Advanced corrosion control solutions to extend the lifespan of critical assets and infrastructure.",
    href: "#cathodic",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ExpertiseSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-[16px] lg:space-y-[48px]">
        <motion.div
          className=" space-y-[16px]  max-w-[768px] w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#DE5943] font-bold text-sm uppercase tracking-wider">
            Our Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-[58px]">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-[#4A4A4A] text-lg font-normal leading-relaxed">
            From conceptual design to final commissioning, we provide
            full-lifecycle support for high-stakes energy infrastructure
            projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ServiceCard
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
