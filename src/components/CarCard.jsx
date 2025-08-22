"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCarSide, FaGasPump, FaTachometerAlt, FaCalendarAlt } from "react-icons/fa";

export default function CarCard({ product }) {
  return (
    <div className="max-w-sm bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition transform duration-300">
      {/* Car Image */}
      <div className="relative">
        <Image
          src={product?.image || "/images/car.jpg"}
          alt={product?.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
        {/* Gradient Brand Badge */}
        <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
          {product?.brand}
        </span>
        {/* Price Badge */}
        <span className="absolute top-4 right-4 bg-white/90 text-blue-700 font-bold text-sm px-3 py-1 rounded-full shadow-md">
          ${product?.price}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
          {product?.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-2 ">
          {product?.description}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <FaCarSide className="text-blue-500" />
            <span>Model: {product?.model}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            <span>Year: {product?.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-orange-500" />
            <span>Mileage: {product?.mileage} km</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGasPump className="text-green-600" />
            <span>Fuel: {product?.fuel}</span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/products/${product?._id}`}
          className="block w-full text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300 font-semibold"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
