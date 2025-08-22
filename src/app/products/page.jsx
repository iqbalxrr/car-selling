"use client";

import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Client-side fetch
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-30 px-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center uppercase">
        Buy Car
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No cars available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <CarCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
