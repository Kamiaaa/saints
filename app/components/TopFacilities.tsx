'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Feature card data
const features = [
  {
    title: "Entertainment",
    description:
      "Comprehensive academic programs designed for excellence and innovation in education.",
    image: "/img/feature-01.jpg",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Restaurant",
    description:
      "Experienced and dedicated faculty committed to student success and mentorship.",
    image: "/img/feature-02.jpg",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Sports & Health",
    description:
      "State-of-the-art library with vast resources and quiet study spaces.",
    image: "/img/feature-03.jpg",
    gradient: "from-green-500 to-emerald-500",
  },
];

// Type definitions
interface Feature {
  title: string;
  description: string;
  image: string;
  gradient: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

interface TopFeaturesProps {
  title?: string;
  description?: string;
}

/* ---------------- Animated Wrapper ---------------- */
function AnimatedFeatureCard({ feature, index }: FeatureCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const initialAnimation = isMobile
    ? { opacity: 0, y: 40 }
    : {
        opacity: 0,
        x: index % 2 === 0 ? -80 : 80,
      };

  return (
    <motion.div
      initial={initialAnimation}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="h-full"
    >
      <FeatureCard feature={feature} />
    </motion.div>
  );
}

/* ---------------- Feature Card ---------------- */
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-t ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        />

        {/* Title + Explore */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white drop-shadow-md">
            {feature.title}
          </h3>

          <button className="group/btn inline-flex items-center gap-1.5 text-white font-medium">
            Explore
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700 rounded-2xl transition-all duration-500 pointer-events-none" />

      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none`}
      />
    </div>
  );
}

/* ---------------- Main Section ---------------- */
export default function TopFacilities({
  title = "Facilities Overview",
  description = "Discover our premium offerings designed to elevate your experience with cutting-edge technology and innovation.",
}: TopFeaturesProps) {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-cormorant text-blue-950 dark:text-gray-50 mb-4">
            {title}
          </h2>

          <div className="relative inline-block">
            <div className="w-24 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mb-1 mx-auto"></div>
            <div className="w-16 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mx-auto"></div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
