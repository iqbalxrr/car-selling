"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const slides = [
    {
      title: "POWER & BEAUTY",
      desc: "Free Library’s $1M auto archives are moving to Philly’s world-famous car museum and to a Hershey attraction",
      img: "/car1.png",
    },
    {
      title: "LUXURY & PERFORMANCE",
      desc: "Experience the thrill of speed with unmatched comfort and advanced safety features.",
      img: "/car2.png",
    },
    {
      title: "STYLE & TECHNOLOGY",
      desc: "A perfect balance of modern design and cutting-edge technology for the future.",
      img: "/car1.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[85vh] bg-[url('/herobg.jpg')] bg-cover bg-center relative overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="flex flex-col lg:flex-row items-center md:pt-50 lg:pt-0 gap-5 md:gap-10  justify-between w-full container mx-auto px-4 md:px-7 text-white relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          {/* Text */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="mb-6 text-sm sm:text-base md:text-lg">
              {slides[currentSlide].desc}
            </p>
            <button className="bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition text-sm sm:text-base">
              Discover Today
            </button>
          </div>

          {/* Image */}
          <motion.div
            className="relative text-center"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="lg:mt-50 lg:h-[450px] ">
             <div className="mb-4 text-end pr-5 md:pr-50 lg:pr-20">
                 <h1 className="text-red-600 uppercase font-semibold text-lg sm:text-xl">
                2018 C - HR
              </h1>
              <p className="text-sm sm:text-base">
                20 km per liter. 800 km per tank
              </p>
             </div>
            
            <img
              src={slides[currentSlide].img}
              alt="car"
              className="  w-auto mx-auto object-contain "
            />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0a1a3c]/90"></div>
    </div>
  );
}
