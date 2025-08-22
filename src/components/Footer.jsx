
// components/Footer.jsx
"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">CarZone</h2>
          <p className="text-gray-400 text-sm">
            Your trusted car marketplace. Buy and sell cars with ease and confidence.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Sell Your Car</a></li>
            <li><a href="#" className="hover:text-white transition">Buy a Car</a></li>
            <li><a href="#" className="hover:text-white transition">Car Valuation</a></li>
            <li><a href="#" className="hover:text-white transition">Financing Options</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Email: <a href="mailto:support@autohub.com" className="hover:text-white transition">support@autohub.com</a></li>
            <li>Phone: <a href="tel:+880123456789" className="hover:text-white transition">+880 1234 56789</a></li>
            <li>Address: 123 Car St, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AutoHub. All rights reserved.
      </div>
    </footer>
  );
}
