"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const totalQuantity = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

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
    <div className="min-h-screen bg-slate-50 font-sans tracking-tight relative overflow-hidden pb-24">
      
      {/* Background Decor */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-red-400/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-[200px] right-[-100px] w-[250px] h-[250px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* HEADER (Sticky + Glassmorphism) */}
      <div className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-xl px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex flex-col">
           <div className="flex items-center gap-1">
             <span className="text-xl font-black tracking-tighter text-gray-900 leading-none">Gharzy</span>
             <span className="w-1.5 h-1.5 bg-[#E23744] rounded-full mt-1.5"></span>
           </div>
           <div className="flex items-center gap-1 mt-1 cursor-pointer">
              <span className="text-[#E23744] text-xs">📍</span>
              <span className="text-xs font-bold text-gray-700 underline decoration-gray-300 underline-offset-2">GLA UNI MATHURA</span>
              <span className="text-[10px] text-gray-400">▼</span>
           </div>
        </div>

        <div className="flex items-center gap-3">
          {totalQuantity > 0 && (
            <div 
              onClick={() => router.push("/cart")}
              className="relative bg-white text-[#E23744] p-2.5 rounded-full shadow-[0_4px_15px_rgb(226,55,68,0.15)] cursor-pointer active:scale-95 transition-all group border border-red-50"
            >
              <div className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#E23744] to-[#ff505b] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform">{totalQuantity}</div>
              <span className="text-lg leading-none">🛒</span>
            </div>
          )}
          <div className="w-[42px] h-[42px] rounded-full p-[2px] bg-gradient-to-tr from-[#E23744] to-[#ffb8bc] shadow-sm cursor-pointer active:scale-95 transition-all">
             <div className="w-full h-full bg-white rounded-full overflow-hidden border border-white">
                <img src="https://ui-avatars.com/api/?name=User&background=f8f9fa&color=333" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[22px]">👋</span>
           <h2 className="text-xl font-bold text-gray-800">Hey, <span className="text-[#E23744]">Foodie!</span></h2>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide">What are you craving today?</p>
      </div>

      {/* SEARCH */}
      <div className="px-5 mt-5 relative z-10">
        <div className="flex items-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-4 py-4 border border-gray-100 group focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-200 transition-all">
          <span className="text-gray-400 text-lg mr-3">🔍</span>
          <input
            placeholder="Search homemade food, chefs..."
            className="flex-1 bg-transparent outline-none text-[14px] text-gray-700 font-medium placeholder-gray-400"
          />
          <div className="w-px h-6 bg-gray-200 mx-3"></div>
          <span className="text-[#E23744] text-xl cursor-pointer active:scale-90 transition-transform drop-shadow-sm">🎤</span>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mt-8 pl-5 relative z-10">
        <div className="flex items-center justify-between pr-5 mb-4">
           <h2 className="text-[17px] font-black text-gray-900 tracking-tight">Homemade Cravings</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 pr-5 scrollbar-hide snap-x">
          {categories.map((item, i) => (
            <div
              key={i}
              className="snap-start flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform shrink-0"
              onClick={() => {
                let type = item.title.toLowerCase();
                if (type === "chole bhature") type = "chole";
                router.push(`/menu?category=${type}`);
              }}
            >
              <div className="w-[76px] h-[76px] rounded-3xl overflow-hidden shadow-[0_8px_20px_rgb(0,0,0,0.06)] group-hover:shadow-[0_10px_25px_rgb(226,55,68,0.2)] border-2 border-white relative transition-all">
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[12px] font-bold text-gray-700">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROMOTION */}
      <div className="px-5 mt-2 relative z-10">
        <div className="bg-gradient-to-br from-[#E23744] via-[#f0535e] to-[#ff7e86] text-white p-6 rounded-3xl shadow-[0_15px_35px_rgb(226,55,68,0.3)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 w-2/3">
             <div className="bg-white/20 backdrop-blur-sm w-fit px-2 py-0.5 rounded-md mb-2 border border-white/20">
               <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">Today's Offer <span>🔥</span></h3>
             </div>
             <p className="text-3xl font-black leading-none drop-shadow-md">GET<br/>BIRYANI</p>
             <p className="text-[12px] mt-2 font-medium opacity-90 drop-shadow-sm">
               On orders above ₹500
             </p>
             <button className="mt-4 bg-white text-[#E23744] text-[11px] font-black px-4 py-2 rounded-full shadow-lg shadow-black/10 flex items-center gap-1 group-hover:shadow-xl transition-shadow">
                Claim Now <span className="text-sm border-l border-red-200 pl-1 mt-0.5">›</span>
             </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1604908554007-1e64a88f0b57?w=1200"
            className="absolute -right-12 -bottom-4 w-48 drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500"
          />
        </div>
      </div>

      {/* NOURISH AI PROMO */}
      <div className="px-5 mt-6 relative z-10">
        <div 
          onClick={() => router.push("/nourish")}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)] text-white relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all border border-gray-800"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <h2 className="text-[26px] font-black tracking-tight leading-none mb-2">
              Nourish<span className="text-[#E23744]">AI</span> ✨
            </h2>
            <p className="text-[13px] text-gray-400 font-medium max-w-[220px] leading-relaxed">
              Tell us your diet, macros, or allergies and get custom smart meals instantly!
            </p>
            <button className="mt-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-all">
              Try Smart Scan <span className="text-lg leading-none">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* EXPLORE */}
      <div className="px-5 mt-8 relative z-10">
        <h2 className="text-[17px] font-black text-gray-900 tracking-tight mb-4">Explore More</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
             { name: "Offers", icon: "🏷️", color: "text-blue-500" },
             { name: "Support", icon: "🎧", color: "text-purple-500" },
             { name: "Delivery", icon: "🛵", color: "text-green-500" },
             { name: "Gifts", icon: "🎁", color: "text-orange-500" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-[0_4px_15px_rgb(0,0,0,0.03)] p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] active:scale-95 transition-all border border-gray-50"
            >
              <span className={"text-xl drop-shadow-sm " + item.color}>{item.icon}</span>
              <p className="text-[11px] font-bold text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHEFS */}
      <div className="px-5 mt-8 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-black text-gray-900 tracking-tight">Home Chefs Nearby</h2>
          <span className="text-[#E23744] text-[12px] font-bold cursor-pointer hover:underline">See All</span>
        </div>

        <div className="flex flex-col gap-6">
          {chefs.map((chef, i) => (
            <div
              key={i}
              onClick={() => router.push("/menu")}
              className="rounded-[28px] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 group cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={chef.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-widest uppercase shadow-sm">
                  Sponsored
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                   <div className="text-white">
                      <h3 className="font-extrabold text-[18px] tracking-tight drop-shadow-md leading-none mb-1">
                        {chef.title}
                      </h3>
                      <p className="font-medium text-[12px] text-white/90 drop-shadow-sm">
                        {chef.subtitle}
                      </p>
                   </div>
                   <div className="px-2 py-1 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center gap-1 shadow-md border border-green-500/50">
                     <span className="font-bold text-white text-[12px]">{chef.rating}</span>
                     <span className="text-[10px] text-white">★</span>
                   </div>
                </div>
              </div>

              <div className="p-4 flex gap-3 overflow-x-auto scrollbar-hide">
                <div className="border border-gray-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shrink-0 bg-gray-50/50">
                  <span className="text-[#E23744] text-sm">🛵</span> <span className="text-[11px] font-bold text-gray-600">35 min</span>
                </div>
                <div className="border border-gray-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shrink-0 bg-gray-50/50">
                  <span className="text-blue-500 text-sm">🏷️</span> <span className="text-[11px] font-bold text-gray-600">Free delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for immersive feel */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-40"></div>
    </div>
  );
}