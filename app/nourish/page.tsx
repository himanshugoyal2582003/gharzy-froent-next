"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart, removeFromCart } from "../../store/cartSlice";

type Meal = {
  name: string;
  mess: string;
  image: string;
  rating: number;
  price: number;
  deliveryTime: string;
  match: number;
  totalCalories: number;
  totalProtein: number;
  tags: string[];
  description: string;
  location: string;
  distance: string;
  totalReviews: number;
  allergens: string[];
  ordersServed: number;
  popularity: number;
};

export default function NourishPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  
  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const totalQuantity = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);

  const handleAIQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const parseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parse-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: query })
      });

      const parsed = await parseRes.json();

      // 🍱 Step 2: Get recommendations
      const mealRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommend-meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed)
      });

      const data = await mealRes.json();
      setResults(data);

    } catch (err) {
      // Fallback dummy results for UI aesthetics if the backend isn't running
      console.log("Using smart fallback UI matching since AI backend is offline.");
      
      setTimeout(() => {
        setResults([
          {
            name: "Protein Power Salad",
            mess: "Salad Days",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
            rating: 4.8,
            price: 250,
            deliveryTime: "30 mins",
            match: 98,
            totalCalories: 450,
            totalProtein: 45,
            tags: ["High Protein", "Veg", "Low Keto"],
            description: "A super-packed bowl with grilled tofu, quinoa, and avocado.",
            location: "Gachibowli",
            distance: "3.2 km",
            totalReviews: 1240,
            allergens: ["Nuts"],
            ordersServed: 5400,
            popularity: 95
          },
          {
            name: "Spicy Baked Chicken",
            mess: "Healthy Eats",
            image: "https://images.unsplash.com/photo-1604908176997-4313c28a1e76?w=800",
            rating: 4.6,
            price: 320,
            deliveryTime: "45 mins",
            match: 85,
            totalCalories: 550,
            totalProtein: 60,
            tags: ["Non-Veg", "Protein", "Low Carb"],
            description: "Oven-baked chicken breast spiced carefully for dietary needs.",
            location: "Madhapur",
            distance: "5.1 km",
            totalReviews: 890,
            allergens: [],
            ordersServed: 2300,
            popularity: 88
          }
        ]);
        setLoading(false);
      }, 1500);
      return;
    }

    setLoading(false);
  };

  const handleAddToCart = (item: Meal) => {
    dispatch(addToCart({ ...item, category: 'ai-recommended' }));
  };

  const handleRemoveFromCart = (item: Meal) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans tracking-tight relative overflow-hidden pb-32">
      
      {/* Dynamic Background */}
      <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#E23744]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[300px] left-[-150px] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 transition-all shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/")} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all text-xl font-light text-gray-700"
          >
            {"<"}
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">Nourish<span className="text-[#E23744]">AI</span> ✨</h1>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Smart Food Engine</p>
          </div>
        </div>
        
        <button 
          onClick={() => router.push("/cart")}
          className="relative p-2.5 rounded-full shadow-md cursor-pointer active:scale-95 transition-all group bg-red-50 text-[#E23744] border-red-100"
        >
          {totalQuantity > 0 && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#E23744] to-[#ff505b] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform">{totalQuantity}</div>
          )}
          <span className="text-lg leading-none">🛒</span>
        </button>
      </div>

      <div className="px-5 mt-6 relative z-10">
        {/* 🤖 AI CHAT BOX */}
        <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-8 border border-white">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white text-lg drop-shadow">🤖</span>
             </div>
             <div>
                <h2 className="text-lg font-black text-gray-900 tracking-tight">Describe your meal</h2>
                <p className="text-xs text-gray-500 font-medium leading-snug max-w-[200px]">I will find the perfect food matching your macros, diet, & cravings.</p>
             </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {[
              "High protein veg meal",
              "Low sugar for diabetes",
              "Gym diet 700 calories",
              "Low oil lunch"
            ].map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl text-[12px] whitespace-nowrap border border-gray-100 shadow-sm active:scale-95 transition-all hover:bg-red-50 hover:text-[#E23744] hover:border-red-100"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative group">
            <textarea
              placeholder="e.g. I want 500 calories, high protein veg food, no sugar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 pl-4 pr-12 bg-gray-50/80 border border-gray-200 rounded-2xl mb-4 text-[14px] text-gray-800 font-medium placeholder-gray-400 resize-none h-24 focus:ring-4 focus:ring-red-500/10 focus:border-[#E23744] outline-none transition-all shadow-inner"
            />
            <div className="absolute bottom-6 right-4 opacity-50 text-[10px] uppercase font-black tracking-widest text-[#E23744]">Smart</div>
          </div>

          <button
            onClick={handleAIQuery}
            disabled={loading || !query.trim()}
            className="w-full bg-gradient-to-r from-gray-900 hover:from-black via-gray-800 to-gray-900 text-white font-black text-[15px] py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2 group overflow-hidden relative"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
            {loading ? (
               <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                 <span>Scanning Kitchens...</span>
               </>
            ) : (
               <>✨ Get Smart Meals</>
            )}
          </button>
        </div>

        {/* 🍽 RESULTS LIST */}
        {results.length > 0 && (
          <div className="mt-8 animate-[popIn_0.4s_ease-out_forwards]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎯</span>
              <h2 className="text-[17px] font-black text-gray-900 tracking-tight">AI Matches Found</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((meal, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(226,55,68,0.1)] transition-all duration-300 border border-gray-50 overflow-hidden flex flex-col group relative"
                >
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e: any) => {
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-white text-xs font-black shadow-lg border border-white/20 backdrop-blur-md flex items-center gap-1 ${meal.match > 80 ? 'bg-gradient-to-r from-green-600 to-green-500' : meal.match > 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-gradient-to-r from-red-600 to-red-500'}`}>
                      🔥 {meal.match}% Match
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-[20px] font-black text-white leading-tight drop-shadow-md">
                        {meal.name}
                      </h2>
                      <p className="text-white/80 text-[13px] font-medium drop-shadow-sm mt-0.5">{meal.mess}</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-end mb-4 border-b border-gray-100 border-dashed pb-3">
                      <div>
                         <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">📍 {meal.location} <span className="text-gray-300">|</span> {meal.distance}</p>
                         <div className="flex items-center gap-1.5 mt-2">
                           <div className="bg-green-600 px-1.5 py-0.5 rounded text-white text-[10px] font-bold flex items-center gap-0.5"><span className="text-[9px]">★</span> {meal.rating}</div>
                           <span className="text-[10px] text-gray-400 font-bold tracking-widest">({meal.totalReviews})</span>
                         </div>
                      </div>
                      <span className="font-black text-[22px] text-gray-900">
                        ₹{meal.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div className="flex flex-col items-center">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Cals</span>
                         <span className="text-[13px] font-black text-gray-800">🔥 {meal.totalCalories}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col items-center">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Protein</span>
                         <span className="text-[13px] font-black text-green-700">💪 {meal.totalProtein}g</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col items-center">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Time</span>
                         <span className="text-[13px] font-black text-blue-600">⏱ {meal.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {meal.tags?.map((tag, i) => (
                        <span key={i} className="bg-white border border-gray-200 shadow-sm text-gray-600 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {meal.allergens?.length > 0 && (
                      <p className="text-[11px] font-bold text-[#E23744] bg-red-50 p-2 rounded-lg border border-red-100 mt-2 mb-3">
                        ⚠ Contains {meal.allergens.join(", ")}
                      </p>
                    )}

                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium line-clamp-2 mt-auto">
                      {meal.description}
                    </p>

                    <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold tracking-wide uppercase mt-4 mb-4">
                      <span>{meal.ordersServed}+ orders</span>
                      <span>{meal.popularity}% popular</span>
                    </div>

                    {/* CART CONTROLS */}
                    <div className="mt-2 pt-4 border-t border-gray-100">
                      {(() => {
                        const cartItem = cartItems.find((i: any) => i.name === meal.name);
                        if (cartItem && cartItem.quantity > 0) {
                          return (
                            <div className="flex items-center justify-between rounded-2xl border-2 border-red-200 bg-[#fff5f6] w-full px-2 py-1.5 shadow-sm shadow-red-500/10">
                              <button onClick={() => handleRemoveFromCart(meal)} className="text-[#E23744] font-black px-4 flex items-center justify-center text-2xl leading-none active:scale-95 transition-transform hover:bg-red-100 rounded-xl w-12 h-10">-</button>
                              <span className="text-[18px] font-black text-[#E23744]">{cartItem.quantity}</span>
                              <button onClick={() => handleAddToCart(meal)} className="text-[#E23744] font-black px-4 flex items-center justify-center text-2xl leading-none active:scale-95 transition-transform hover:bg-red-100 rounded-xl w-12 h-10">+</button>
                            </div>
                          );
                        }
                        return (
                          <button
                            onClick={() => handleAddToCart(meal)}
                            className="w-full bg-[#E23744] text-white font-black py-3 rounded-2xl shadow-[0_4px_15px_rgba(226,55,68,0.25)] active:scale-95 transition-all text-center tracking-wide hover:shadow-[0_8px_25px_rgba(226,55,68,0.35)]"
                          >
                            Add to Cart
                          </button>
                        );
                      })()}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Viewer if items exist */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-40 pointer-events-none flex justify-center">
          <div className="w-full pointer-events-auto shadow-[0_10px_40px_rgba(226,55,68,0.3)] bg-gradient-to-r from-[#E23744] to-[#f0535e] rounded-2xl p-4 flex justify-between items-center animate-[popIn_0.3s_ease-out_forwards] relative overflow-hidden group border border-white/20 backdrop-blur-md">
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            <div className="flex flex-col text-white z-10">
               <span className="text-xs font-bold uppercase tracking-widest text-white/80">{totalQuantity} item{totalQuantity !== 1 ? 's' : ''} added</span>
               <span className="font-black text-xl flex items-center gap-1 drop-shadow-md">₹{totalPrice} <span className="text-[10px] font-medium uppercase mt-1 opacity-70 border-l border-white/30 pl-1 ml-1">plus taxes</span></span>
            </div>
            
            <button 
              onClick={() => router.push("/cart")} 
              className="bg-white text-[#E23744] font-black tracking-wide px-6 py-3 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 transition-transform flex items-center gap-1 z-10"
            >
              Checkout <span className="text-lg leading-none pt-0.5">›</span>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
