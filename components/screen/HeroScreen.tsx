"use client";

import { motion, useScroll, useTransform } from "motion/react";
import ScrollAnimation from "../ScrollAnimation";
import Image from "next/image";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section
      id="home"
      className="relative w-full h-svh z-10"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
        transition={{ type: "tween", ease: "linear" }}
      >
        {/* Key Visual */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-svh w-full">
            <Image
              fill
              src="/main2.webp"
              sizes="100vw"
              quality={100}
              alt="Main2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Glass Overlay with Text */}
      <div className="relative z-10 w-full h-full grid place-items-center animate-fadeInUp">
        <Image
          src="/left_title.webp"
          alt="main-text"
          width={300}
          height={800}
          className="flash absolute block md:hidden w-auto h-svh left-0 bottom-0 object-contain object-bottom"
          priority
        />
        <Image
          src="/bottom_title.webp"
          alt="main-text"
          width={1920}
          height={300}
          className="absolute hidden md:block w-svw h-auto left-0 bottom-0 px-6 object-contain object-bottom"
          priority
        />
      </div>

      {/* Decorative Floating Elements */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-20 overflow-hidden">
        <motion.div
          className="absolute w-6 h-6 bg-white rounded-full opacity-30"
          style={{ filter: "blur(12px)", top: "33%", left: "10%" }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-8 h-8 bg-white rounded-full opacity-30"
          style={{ filter: "blur(12px)", top: "25%", right: "15%" }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-8 right-5 z-30">
        <ScrollAnimation />
      </div>
    </section>
  );
}