"use client";

import { Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import { addToCart, removeFromCart } from "../../store/cartSlice";

const menuData = {
  healthy: [
    {
      name: "Spring Veg Plater",
      price: 350,
      description: "Fresh garden vegetables served with homemade hummus and olive oil dip.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    },
    {
      name: "Plant Protein Bowl",
      price: 220,
      description: "Quinoa, roasted chickpeas, avocado, and kale drizzled with tahini.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    },
  ],
  burger: [
    {
      name: "Cheese Burger",
      price: 180,
      description: "Juicy smashed patty with double cheddar, caramelized onions, and secret sauce.",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    },
  ],
  pizza: [
    {
      name: "Margherita Pizza",
      price: 250,
      description: "Classic Neapolitan style with San Marzano tomatoes, fresh mozzarella, and basil.",
      image: "https://images.unsplash.com/photo-1601924582975-7e8a63a89c1b?w=800",
    },
  ],
  dessert: [
    {
      name: "Chocolate Cake",
      price: 150,
      description: "Decadent dark chocolate molten lava cake with a gooey center.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    },
  ],
  biryani: [
    {
      name: "Chicken Biryani",
      price: 220,
      description: "Aromatic basmati rice cooked with marinated chicken and rare spices.",
      image: "https://images.unsplash.com/photo-1604908176997-4313c28a1e76?w=800",
    },
  ],
  paneer: [
    {
      name: "Paneer Butter Masala",
      price: 200,
      description: "Cottage cheese cubes cooked in a rich, creamy, and mildly sweet gravy.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    },
  ],
  dosa: [
    {
      name: "Masala Dosa",
      price: 120,
      description: "Crispy fermented crepe wrapped around a spicy potato curry.",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
    },
  ],
  chole: [
    {
      name: "Chole Bhature",
      price: 140,
      description: "Spicy chickpea curry served with fluffy deep-fried bread.",
      image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5c?w=800",
    },
  ],
};

const categoryDetails = {
  healthy: {
    title: "Eat Healthy",
    subtitle: "Healthy food, South Indian",
    cover: "https://images.unsplash.com/photo-1490645943967-cb2eb5b80066?w=1200"
  },
  burger: {
    title: "Burger Menu",
    subtitle: "Fresh homemade burgers",
    cover: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=1200"
  },
  pizza: {
    title: "Pizza Menu",
    subtitle: "Cheesy oven-fresh picks",
    cover: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200"
  },
  dessert: {
    title: "Dessert Menu",
    subtitle: "Sweet homemade treats",
    cover: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200"
  },
  biryani: {
    title: "Biryani Menu",
    subtitle: "Fragrant rice specials",
    cover: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200"
  },
  paneer: {
    title: "Paneer Specials",
    subtitle: "Rich North Indian favorites",
    cover: "https://images.unsplash.com/photo-1565557613262-ea4aebf8bcf1?w=1200"
  },
  dosa: {
    title: "Dosa Corner",
    subtitle: "Crispy South Indian classics",
    cover: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1200"
  },
  chole: {
    title: "Chole Bhature",
    subtitle: "Street-style comfort food",
    cover: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5c?w=1200"
  },
};

function MenuContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  
  const cartItems = useSelector(
    (state: { cart: { items: Array<{ quantity: number, price: number }> } }) =>
      state.cart.items
  );

  const category = searchParams.get("category") || "healthy";
  const items = menuData[category as keyof typeof menuData] || menuData.healthy;
  const details =
    categoryDetails[category as keyof typeof categoryDetails] ||
    categoryDetails.healthy;
    
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleAddToCart = (item: (typeof items)[number]) => {
    dispatch(addToCart({ ...item, category }));
  };

  const handleRemoveFromCart = (item: (typeof items)[number]) => {
    dispatch(removeFromCart(item));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans tracking-tight pb-32">
      
      {/* Dynamic Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <button 
          onClick={() => router.push("/")} 
          className={`w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all text-xl font-light ${scrolled ? 'bg-gray-100 text-gray-800' : 'bg-black/30 backdrop-blur-md text-white border border-white/20 shadow-md'}`}
        >
          {"<"}
        </button>

        <div className={`font-black text-lg tracking-tight transition-opacity duration-300 ${scrolled ? 'opacity-100 text-gray-900' : 'opacity-0'}`}>
           {details.title}
        </div>

        <button 
          onClick={() => router.push("/cart")}
          className={`relative p-2.5 rounded-full shadow-lg cursor-pointer active:scale-95 transition-all group ${scrolled ? 'bg-red-50 text-[#E23744] border-red-100' : 'bg-black/30 backdrop-blur-md text-white border border-white/20'}`}
        >
          {totalQuantity > 0 && (
            <div className={`absolute -top-1 -right-1 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md transition-transform transform ${scrolled ? 'bg-gradient-to-tr from-[#E23744] to-[#ff505b] text-white border-2 border-white' : 'bg-white text-[#E23744] border-2 border-black/50'}`}>{totalQuantity}</div>
          )}
          <span className="text-lg leading-none">🛒</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
        <img src={details.cover} className="w-full h-full object-cover opacity-60 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-black/40 to-black/20"></div>
        
        <div className="absolute bottom-6 left-5 right-5 z-10">
           <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{details.title}</h1>
                <p className="text-sm text-gray-200 mt-1 font-medium drop-shadow-sm line-clamp-1">{details.subtitle}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 text-white flex flex-col items-center shadow-lg">
                <span className="flex items-center gap-1 font-bold"><span className="text-sm">4.8</span> <span className="text-[10px] text-yellow-400">★</span></span>
                <span className="text-[9px] uppercase tracking-widest opacity-80 font-bold border-t border-white/30 pt-0.5 mt-0.5 w-full text-center">Rating</span>
              </div>
           </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             <div className="w-1 h-5 bg-[#E23744] rounded-full"></div>
             <h2 className="text-lg font-black text-gray-900 tracking-tight">Recommended</h2>
           </div>
           <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 border border-gray-200 cursor-pointer">
             <div className="w-3 h-3 border border-green-600 rounded-[3px] bg-white flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
             </div>
             <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">VEG ONLY</span>
           </div>
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.name} className="flex gap-4 bg-white p-4 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group">
              <div className="absolute -left-10 h-32 w-20 bg-gradient-to-r from-red-50/50 to-transparent blur-xl pointer-events-none group-hover:translate-x-12 transition-transform duration-700"></div>
              
              <div className="flex-[2] py-1 pl-1">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-3.5 h-3.5 border border-green-600 flex items-center justify-center rounded-[3px]">
                     <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                   </div>
                   <div className="bg-orange-50 border border-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase shadow-sm">Bestseller</div>
                </div>
                
                <h3 className="font-extrabold text-[16px] text-gray-900 tracking-tight leading-snug">{item.name}</h3>
                <p className="text-[14px] font-bold text-gray-800 mt-1 flex items-center gap-1">
                   <span>₹{item.price}</span> 
                </p>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed line-clamp-2 pr-2 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="flex-[1] flex flex-col items-center">
                <div className="relative w-[110px] h-[110px] shadow-sm rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group-hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Absolute Cart Controls positioned over overlapping card edge */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-3 px-2 z-10 drop-shadow-lg">
                    {(() => {
                      const cartItem = cartItems.find((i: any) => i.name === item.name);
                      if (cartItem && cartItem.quantity > 0) {
                        return (
                          <div className="flex items-center justify-between rounded-xl border border-red-200 bg-[#fff5f6] w-full px-1 py-1 shadow-md">
                            <button onClick={() => handleRemoveFromCart(item)} className="text-[#E23744] font-black px-2 flex items-center justify-center text-lg leading-none active:scale-95 transition-transform w-6 h-6 rounded-lg hover:bg-red-100">-</button>
                            <span className="text-[14px] font-extrabold text-[#E23744]">{cartItem.quantity}</span>
                            <button onClick={() => handleAddToCart(item)} className="text-[#E23744] font-black px-2 flex items-center justify-center text-lg leading-none active:scale-95 transition-transform w-6 h-6 rounded-lg hover:bg-red-100">+</button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full rounded-xl border border-red-100 bg-white/95 backdrop-blur-sm shadow-[0_4px_10px_rgb(226,55,68,0.15)] font-black py-1.5 text-[13px] text-[#E23744] active:scale-95 transition-all text-center tracking-wide"
                        >
                          ADD +
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Cart Viewer if items exist */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent pointer-events-none pb-safe">
          <div className="pointer-events-auto shadow-[0_10px_40px_rgba(226,55,68,0.3)] bg-gradient-to-r from-[#E23744] to-[#f0535e] rounded-2xl p-4 flex justify-between items-center animate-[popIn_0.3s_ease-out_forwards] translate-y-10 opacity-0 relative overflow-hidden group">
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            <div className="flex flex-col text-white">
               <span className="text-xs font-bold uppercase tracking-widest text-white/80">{totalQuantity} item{totalQuantity !== 1 ? 's' : ''} added</span>
               <span className="font-black text-xl flex items-center gap-1">₹{totalPrice} <span className="text-xs font-medium uppercase mt-1 opacity-70">plus taxes</span></span>
            </div>
            
            <button 
              onClick={() => router.push("/cart")} 
              className="bg-white text-[#E23744] font-black tracking-wide px-5 py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center gap-1"
            >
              View Cart <span className="text-lg leading-none pt-0.5">›</span>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popIn {
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
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 24px);
        }
      `}} />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><div className="w-10 h-10 border-4 border-red-100 border-t-[#E23744] rounded-full animate-spin"></div></div>}>
      <MenuContent />
    </Suspense>
  );
}
