
"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10 items-center px-4 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/car1.png" 
            alt="About CarZone"
            className="w-full rounded-3xl shadow-2xl object-cover max-h-[400px] hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            About CarZone
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            CarZone is a premium platform for buying and selling cars. We connect buyers and sellers efficiently while providing detailed information about every car. Our mission is to make car shopping easy, transparent, and enjoyable for everyone.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you are looking for a new model, a second-hand car, or want to sell your own, CarZone provides a reliable and secure marketplace for all your automotive needs.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg transition font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
