
"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const searchParams = useSearchParams();
const category = searchParams.get("category") || "healthy";
console.log("CATEGORY:", category);

  const menuData = {
  healthy: [
    {
      name: "Spring Veg Plater",
      price: 350,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    },
    {
      name: "Plant Protein Bowl",
      price: 220,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    },
  ],

  burger: [
    {
      name: "Cheese Burger",
      price: 180,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    },
  ],

  pizza: [
    {
      name: "Margherita Pizza",
      price: 250,
      image: "https://images.unsplash.com/photo-1601924582975-7e8a63a89c1b?w=800",
    },
  ],
  // ✅ NEW
  dessert: [
    {
      name: "Chocolate Cake",
      price: 150,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    },
  ],

  biryani: [
    {
      name: "Chicken Biryani",
      price: 220,
      image: "https://images.unsplash.com/photo-1604908176997-4313c28a1e76?w=800",
    },
  ],

  paneer: [
    {
      name: "Paneer Butter Masala",
      price: 200,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    },
  ],

  dosa: [
    {
      name: "Masala Dosa",
      price: 120,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
    },
  ],

  chole: [
    {
      name: "Chole Bhature",
      price: 140,
      image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5c?w=800",
    },
  ],
};

// ✅ FINAL ITEMS
const items =
  menuData[category as keyof typeof menuData] || menuData["healthy"];

  return (
    <div className="p-4 pb-24 bg-white min-h-screen">

      {/* BACK */}
      <button onClick={() => router.back()} className="text-xl mb-4">
        ←
      </button>

      {/* TITLE */}
      <h1 className="text-2xl font-bold">Eat Healthy</h1>
      <p className="text-gray-500 text-sm">
        Healthy food, South Indian
      </p>

      {/* MENU LIST */}
      <div className="mt-6 space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center">

            {/* LEFT */}
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">₹ {item.price}</p>

              <button className="mt-2 text-red-500 border border-red-500 px-2 py-1 rounded text-xs">
                Must Try
              </button>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <img
                src={item.image}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <button className="absolute bottom-1 right-1 bg-white border px-3 py-1 rounded text-red-500">
                ADD +
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}