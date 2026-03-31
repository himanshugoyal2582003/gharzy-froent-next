"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    { title: "Pizza", image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800" },
    { title: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" },
    { title: "Sushi", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
    { title: "Dessert", image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800" },
  ];

  const chefs = [
    {
      title: "Kavita's Kitchen",
      subtitle: "North Indian · Veg/Non-Veg",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",
    },
    {
      title: "Ayesha Biryani",
      subtitle: "Hyderabadi Specialist",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200",
    },
  ];

  return (
    <div className="p-4 pb-20 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gharzy</h1>
          <p className="text-gray-500">Hey, Good Afternoon!</p>
        </div>
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>

      {/* LOCATION */}
      <p className="mt-2 text-gray-600">📍 GLA UNI MATHURA</p>

      {/* SEARCH */}
      <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 mt-4">
        <input
          placeholder="Search"
          className="flex-1 bg-transparent outline-none"
        />
        🎤
      </div>

      {/* CATEGORIES */}
      <h2 className="mt-6 text-xl font-bold">Homemade Food</h2>

      <div className="flex gap-4 mt-4 overflow-x-auto">
        {categories.map((item, i) => (
          <div
            key={i}
            className="min-w-[80px] h-[80px] rounded-full overflow-hidden relative cursor-pointer"
            onClick={() => {
  const type = item.title.toLowerCase();

  if (type === "pizza" || type === "burger") {
    router.push(`/menu?category=${type}`);
  } else {
    router.push("/menu?category=healthy");
  }
}}
          >
            <img src={item.image} className="w-full h-full object-cover" />

            <div className="absolute bottom-0 w-full bg-black/40 text-white text-xs text-center">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* EXPLORE */}
      <h2 className="mt-6 text-xl font-bold">Explore More</h2>

      <div className="flex justify-between mt-4">
        {["20% OFF", "Call", "Delivery", "Gift"].map((item, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl text-center w-[22%]">
            <p className="text-sm font-semibold">{item}</p>
          </div>
        ))}
      </div>

      {/* PROMOTIONS */}
      <h2 className="mt-6 text-xl font-bold">Promotions</h2>

      <div className="relative mt-4 bg-red-700 text-white p-5 rounded-2xl overflow-hidden">
        <h3 className="font-bold">Today's offer !!</h3>
        <p className="text-xl font-bold">GET BIRYANI</p>
        <p className="text-sm">on all orders above 500</p>

        <img
          src="https://images.unsplash.com/photo-1604908554007-1e64a88f0b57?w=1200"
          className="absolute right-0 bottom-0 w-32"
        />
      </div>

      {/* CHEFS */}
      <h2 className="mt-6 text-xl font-bold">Home Chefs Nearby</h2>

      <div className="flex flex-col gap-4 mt-4">
        {chefs.map((chef, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow bg-white"
          >
            <div className="relative">
              <img src={chef.image} className="w-full h-40 object-cover" />

              <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full text-sm">
                ⭐ {chef.rating}
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{chef.title}</h3>
                <p className="text-gray-500 text-sm">{chef.subtitle}</p>
              </div>

              <button
                className="bg-gray-200 px-4 py-1 rounded-full"
                onClick={() => router.push("/menu?category=healthy")}
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