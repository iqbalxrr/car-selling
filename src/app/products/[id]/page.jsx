// app/products/[id]/page.jsx
"use client";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import {
  FaCarSide,
  FaGasPump,
  FaTachometerAlt,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

export default function CarDetails({ params }) {
  const { id } = params;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch car");
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Car not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-30 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Car Image */}
        <div className="relative group">
          <img
            src={car.image || "/placeholder-car.png"}
            alt={car.title}
            className="w-full h-[460px] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
          {/* Price Badge */}
          <span className="absolute top-6 right-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-xl">
            ${car.price}
          </span>
          {/* Brand Badge */}
          <span className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-gray-900 px-5 py-1.5 rounded-full text-sm font-semibold shadow">
            {car.brand}
          </span>
        </div>

        {/* Car Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {car.title}
            </h1>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-screen overflow-hidden">
              {car.description || "No description available."}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaCarSide className="text-blue-600 text-xl" />
              <span className="text-gray-800 font-medium">Model: {car.model}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaCalendarAlt className="text-purple-600 text-xl" />
              <span className="text-gray-800 font-medium">Year: {car.year}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaTachometerAlt className="text-orange-500 text-xl" />
              <span className="text-gray-800 font-medium">Mileage: {car.mileage} km</span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaGasPump className="text-green-600 text-xl" />
              <span className="text-gray-800 font-medium">Fuel: {car.fuel}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition col-span-2">
              <FaTag className="text-pink-500 text-xl" />
              <span className="text-gray-800 font-medium">Brand: {car.brand}</span>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full md:w-auto bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:opacity-95 text-white px-12 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300 text-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
