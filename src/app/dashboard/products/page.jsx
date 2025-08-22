"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🚗 All Cars</h1>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Brand</th>
              <th className="border p-3">Model</th>
              <th className="border p-3">Year</th>
              <th className="border p-3">Fuel</th>
              <th className="border p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((car) => (
              <tr
                key={car._id}
                className="text-center hover:bg-gray-50 transition"
              >
                <td className="border p-3">
                  <Image
                    src={car.image}
                    alt={car.title}
                    width={80}
                    height={50}
                    className="object-cover rounded mx-auto"
                  />
                </td>
                <td className="border p-3 font-medium">{car.title}</td>
                <td className="border p-3">{car.brand}</td>
                <td className="border p-3">{car.model}</td>
                <td className="border p-3">{car.year}</td>
                <td className="border p-3">{car.fuel}</td>
                <td className="border p-3 font-semibold text-blue-600">
                  ${car.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {products.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 flex flex-col"
          >
            <Image
              src={car.image}
              alt={car.title}
              width={400}
              height={250}
              className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="font-bold text-lg">{car.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {car.brand} {car.model} • {car.year}
            </p>
            <p className="text-sm">
              <span className="font-medium">Fuel:</span> {car.fuel}
            </p>
            <p className="text-blue-600 font-semibold mt-2">${car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
