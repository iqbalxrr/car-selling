"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const pathname = usePathname();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Redirect unauthenticated users
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image to imgbb
  const uploadImage = async () => {
    if (!image) return null;
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY; 
    const body = new FormData();
    body.append("image", image);

    setUploading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });
      const data = await res.json();
      setUploading(false);
      return data.data.url;
    } catch (error) {
      setUploading(false);
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = await uploadImage();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (!res.ok) throw new Error("Failed to add car");

      
      toast.success("🚗 Car added successfully!");
      router.push("/dashboard/products");

      setFormData({
        title: "",
        description: "",
        price: "",
        brand: "",
        model: "",
        year: "",
        mileage: "",
        fuel: "",
      });
      setImage(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 ">
      <h1 className="text-2xl font-bold mb-6 text-center">🚗 Add New Car</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Car Details */}
        <input
          type="text"
          name="title"
          placeholder="Car Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand (e.g. Toyota)"
            value={formData.brand}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model (e.g. Corolla)"
            value={formData.model}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage (km)"
            value={formData.mileage}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <select
          name="fuel"
          value={formData.fuel}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 border rounded"
        />
        {uploading && <p className="text-blue-600">Uploading image...</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
        >
          {uploading ? "Uploading..." : "Add Car"}
        </button>
      </form>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
