
"use server";

import dbConnect from "@/lib/dbConnect";
import CarCard from "@/components/CarCard";

export default async function ProductsPage() {
  const client = await dbConnect();
  const db = client.db("car-selling"); 
  const collection = db.collection("products");

  // All products fetch
  const products = await collection.find({}).toArray();

  return (
    <div className="py-30 px-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center uppercase">
        Buy Car
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <CarCard key={product._id.toString()} product={product} />
        ))}
      </div>
    </div>
  );
}
