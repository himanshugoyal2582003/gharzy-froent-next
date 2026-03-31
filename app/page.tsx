"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    {
      title: "Pizza",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800",
    },
    {
      title: "Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    },
    {
      title: "Sushi",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    },
    {
      title: "Dessert",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
    },
    {
      title: "Biryani",
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800",
    },
    {
      title: "Paneer",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
    },
    {
      title: "Dosa",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
    },
    {
      title: "Chole Bhature",
      image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800",
    },
  ];

  const chefs = [
    {
      title: "Kavita's Kitchen",
      subtitle: "North Indian · Veg/Non-Veg",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",
    },
    {
      title: "Ayesha Biryani",
      subtitle: "Hyderabadi Specialist",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200",
    },
  ];

  return (
    <div className="p-4 pb-24 min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-red-50">

      {/* ✅ HEADER (FIXED + AESTHETIC) */}
      <div className="relative mt-4">
        <div className="bg-gray-900 rounded-xl p-4 shadow text-center">
          <h1 className="text-3xl font-bold text-white">Gharzy</h1>
          <p className="text-gray-300 text-sm">
            Hey, Greetings! 👋
          </p>
        </div>

        {/* Profile */}
        <div className="absolute right-3 top-3 w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>

      {/* LOCATION */}
      <p className="mt-3 text-gray-600 text-sm">📍 GLA UNI MATHURA</p>

      {/* SEARCH */}
      <div className="flex items-center bg-white shadow-md rounded-full px-4 py-3 mt-4">
        <input
          placeholder="Search homemade food..."
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <span>🎤</span>
      </div>

      {/* CATEGORIES */}
      <h2 className="mt-8 text-xl font-semibold text-gray-900">
        Homemade Food
      </h2>

      <div className="flex gap-4 mt-4 overflow-x-auto">
        {categories.map((item, i) => (
          <div
            key={i}
            className="min-w-[85px] h-[85px] rounded-full overflow-hidden relative shadow-md cursor-pointer"
            onClick={() => {
            let type = item.title.toLowerCase();

  // special case fix
  if (type === "chole bhature") {
    type = "chole";
  }

     console.log("CLICKED:", type);

    router.push(`/menu?category=${type}`);
}}
          >
            <img
              src={item.image}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs text-center py-1">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* EXPLORE */}
      <h2 className="mt-8 text-lg font-bold">Explore More</h2>

      <div className="flex justify-between mt-4">
        {["20% OFF", "Call", "Delivery", "Gift"].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-4 rounded-xl text-center w-[23%]"
          >
            <p className="text-xs font-semibold">{item}</p>
          </div>
        ))}
      </div>

      {/* PROMOTION */}
      <div className="mt-8 bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <h3 className="text-lg font-bold">Today's Offer 🔥</h3>
        <p className="text-2xl font-extrabold mt-1">GET BIRYANI</p>
        <p className="text-sm mt-1 opacity-90">
          on orders above ₹500
        </p>

        <img
          src="https://images.unsplash.com/photo-1604908554007-1e64a88f0b57?w=1200"
          className="absolute right-0 bottom-0 w-32 opacity-90"
        />
      </div>

      {/* CHEFS */}
      <h2 className="mt-8 text-lg font-bold">Home Chefs Nearby</h2>

      <div className="flex flex-col gap-5 mt-4">
        {chefs.map((chef, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={chef.image}
                className="w-full h-44 object-cover"
              />

              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs shadow">
                ⭐ {chef.rating}
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm">
                  {chef.title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {chef.subtitle}
                </p>
              </div>

              <button
                className="bg-black text-white px-4 py-1 rounded-full text-sm"
                onClick={() => router.push("/menu")}
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}