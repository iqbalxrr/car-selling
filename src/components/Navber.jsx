"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    session?.user
      ? { name: "Dashboard", path: "/dashboard" }
      : { name: "Login", path: "/login" },
  ];

  return (
    <div className="w-full fixed top-0 left-0 bg-[#0a1a3c]/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 md:px-7">
        <div className="flex justify-between items-center py-4 md:py-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">CarZone</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-white">
            {links.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={`transition px-2 py-1 rounded-md ${
                      isActive
                        ? "bg-red-500 text-white shadow-md"
                        : "hover:text-red-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden flex flex-col space-y-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden flex flex-col bg-[#0a1a3c] text-white px-4 py-5 space-y-4 rounded-b-md"
            >
              {links.map((link, index) => {
                const isActive = pathname.startsWith(link.path);

                return (
                  <li key={index}>
                    <Link
                      href={link.path}
                      className={`transition px-2 py-1 rounded-md block ${
                        isActive
                          ? "bg-red-500 text-white shadow-md"
                          : "hover:text-red-400"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
