"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart, removeFromCart } from "../../store/cartSlice";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const totalPrice = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  
  const deliveryCharge = 50;
  const taxes = 5;
  const donate = 3;
  const grandTotal = cartItems.length > 0 ? totalPrice + deliveryCharge + taxes + donate : 0;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-40 h-40 mb-8 rounded-full bg-white shadow-2xl shadow-red-500/10 flex items-center justify-center animate-bounce">
          <span className="text-6xl">🛒</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Cart is empty</h2>
        <p className="text-gray-500 mt-3 mb-10 text-center text-sm max-w-[250px] leading-relaxed">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        <button 
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-[#E23744] to-[#f0535e] text-white font-bold py-4 px-10 rounded-full shadow-[0_8px_30px_rgb(226,55,68,0.3)] hover:shadow-[0_8px_30px_rgb(226,55,68,0.5)] active:scale-95 transition-all duration-300"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-36 font-sans tracking-tight relative">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/")} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all text-xl font-light text-gray-700"
          >
            {"<"}
          </button>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">Eat Healthy</h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Healthy food, South Indian</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-tr from-green-600 to-green-500 px-3 py-1.5 flex items-center gap-1 rounded-xl shadow-lg shadow-green-500/20 text-white">
          <span className="font-bold text-sm">4.2</span>
          <span className="text-[10px]">★</span>
        </div>
      </div>

      {/* LOCATION */}
      <div className="bg-white mx-4 mt-4 px-5 py-4 rounded-3xl flex flex-col gap-3 shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-50">
        <div className="flex items-start gap-4 text-sm text-gray-800 font-medium">
          <div className="bg-green-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
             <span className="text-green-600 text-lg">📍</span>
          </div>
          <div className="leading-relaxed">
            <span className="font-extrabold text-gray-900">Delivery at Home</span> 
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">Flat no: 301, SVR Enclave, Hyper Nagar...</p>
          </div>
          <span className="text-gray-400 font-bold ml-auto bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform">⌵</span>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        <div className="flex items-center gap-4 text-sm text-gray-800">
          <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
             <span className="text-blue-500 text-lg">⏱</span>
          </div>
          <div className="font-medium text-gray-600 text-xs">
             Delivery expected in <span className="font-extrabold text-[#E23744] text-[13px] bg-red-50 px-2 py-0.5 rounded-md ml-1">42 mins</span>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="bg-white mx-4 mt-4 p-5 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-50">
        <h3 className="font-bold text-gray-900 mb-4 text-[15px] tracking-wide flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-[#E23744]"></span> Your Order
        </h3>
        <div className="space-y-6">
          {cartItems.map((item: any, i: number) => (
            <div key={i} className="flex items-start justify-between group">
              <div className="flex gap-4">
                <div className="mt-1 w-5 h-5 border-2 border-green-500 flex items-center justify-center rounded bg-green-50 shrink-0">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px] tracking-tight">{item.name}</h3>
                  <p className="text-gray-900 text-[14px] font-semibold mt-1.5">₹ {item.price}</p>
                  <p className="text-gray-400 text-[11px] mt-1.5 font-medium bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100">Add On: Mushroom</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 min-w-[90px]">
                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-[#fff5f6] w-full px-1.5 py-1.5 shadow-sm shadow-red-500/5 transition-all group-hover:border-red-200">
                  <button onClick={() => dispatch(removeFromCart(item))} className="text-[#E23744] font-black px-2 text-xl leading-none cursor-pointer hover:bg-red-100 rounded-lg active:scale-90 transition-all w-8 h-8 flex items-center justify-center">-</button>
                  <span className="text-[15px] font-extrabold text-[#E23744] w-4 text-center">{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart(item))} className="text-[#E23744] font-black px-2 text-xl leading-none cursor-pointer hover:bg-red-100 rounded-lg active:scale-90 transition-all w-8 h-8 flex items-center justify-center">+</button>
                </div>
                <p className="text-xs text-gray-500 font-bold mr-1 tracking-tight">Total: <span className="text-gray-900">₹ {item.price * item.quantity}</span></p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
           <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-3 border border-gray-100 focus-within:border-gray-300 focus-within:bg-white transition-all">
             <span className="text-gray-400 mr-2">✍️</span>
             <input 
               placeholder="Add cooking instructions..."
               className="w-full outline-none text-[13px] text-gray-700 bg-transparent placeholder-gray-400 font-medium"
             />
           </div>
        </div>
      </div>

      {/* OFFERS */}
      <div className="bg-white mx-4 mt-4 p-5 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h3 className="font-bold text-gray-900 mb-3 text-[15px] tracking-wide">Offers & Benefits</h3>
        <div className="flex items-center justify-between border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4 rounded-2xl cursor-pointer active:scale-[0.98] transition-all shadow-sm shadow-blue-500/5 group">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg mt-0.5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">٪</div>
            <div>
              <p className="text-[14px] font-extrabold text-gray-900 mb-1">Apply Coupon</p>
              <p className="text-[12px] text-blue-600 font-semibold bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100 w-fit">Save ₹59.70 with ZOMSAFETY</p>
            </div>
          </div>
          <div className="bg-white w-8 h-8 rounded-full shadow border border-gray-100 flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-50 transition-colors">›</div>
        </div>
      </div>

      {/* TIP */}
      <div className="bg-white mx-4 mt-4 p-5 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-50">
        <h3 className="font-bold text-gray-900 tracking-wide text-[15px]">Show some love to your valet 🛵</h3>
        <p className="text-[12px] text-gray-500 mt-1.5 mb-5 font-medium leading-relaxed">It's raining! Support your valet and make their day! 100% of your tip goes to them.</p>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl py-3 items-center justify-center flex-[1] min-w-[75px] cursor-pointer hover:border-gray-300 active:scale-95 transition-all">
             <div className="flex items-center flex-col gap-1.5"><span className="text-xl">🥤</span><span className="font-extrabold text-gray-800 text-sm">₹20</span></div>
          </div>
          <div className="border-2 border-[#E23744] bg-[#fff5f6] shadow-md shadow-red-500/10 rounded-2xl py-3 flex flex-col items-center justify-center flex-[1] min-w-[80px] relative cursor-pointer active:scale-95 transition-all transform -translate-y-1">
             <div className="absolute -top-3 bg-gradient-to-r from-[#E23744] to-[#ff505b] text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-sm tracking-widest uppercase border border-red-400">Popular</div>
             <div className="flex items-center flex-col gap-1.5 mt-2"><span className="text-xl">🧁</span><span className="font-extrabold text-[#E23744] text-sm">₹30</span></div>
          </div>
          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl py-3 items-center justify-center flex-[1] min-w-[75px] cursor-pointer hover:border-gray-300 active:scale-95 transition-all">
             <div className="flex items-center flex-col gap-1.5"><span className="text-xl">🍩</span><span className="font-extrabold text-gray-800 text-sm">₹50</span></div>
          </div>
          <div className="border border-dashed border-gray-300 bg-gray-50 rounded-2xl py-3 items-center justify-center flex-[1] min-w-[80px] cursor-pointer hover:border-gray-400 active:scale-95 transition-all">
             <div className="flex items-center flex-col gap-1.5 opacity-80"><span className="text-xl">🎁</span><span className="font-extrabold text-gray-700 text-sm">Custom</span></div>
          </div>
        </div>
      </div>

      {/* DELIVERY INSTRUCTIONS */}
      <div className="bg-white mx-4 mt-4 p-5 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-50 flex justify-between items-center group cursor-pointer active:scale-[0.99] transition-transform">
        <div>
          <p className="font-extrabold text-gray-900 text-[15px] tracking-wide">Delivery instructions</p>
          <div className="flex items-center gap-2 mt-2 bg-green-50 w-fit px-2.5 py-1.5 rounded-lg border border-green-100">
             <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-sm">✓</div>
             <span className="text-[12px] text-green-700 font-bold">Hand me the Order</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors">›</div>
      </div>

      {/* BILL DETAILS */}
      <div className="bg-white mx-4 mt-4 px-5 pt-5 pb-6 rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] border border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h3 className="font-bold text-gray-900 mb-5 text-[15px] tracking-wide flex items-center gap-2">
           🧾 Bill Summary
        </h3>
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between text-[13px] text-gray-600 font-semibold">
            <span>Item Total</span>
            <span className="text-gray-900 font-bold">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 font-semibold">
            <span className="border-b border-dashed border-gray-300 pb-0.5 cursor-pointer hover:text-gray-900 transition-colors">Delivery Charge</span>
            <span className="text-gray-900 font-bold">₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray-600 font-semibold">
            <span>Taxes & Fees</span>
            <span className="text-gray-900 font-bold">₹{taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[13px] text-gray-600 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
               <span className="text-red-500 text-sm">❤</span> 
               <span>Feeding India</span>
            </span>
            <span className="text-[#E23744] font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 cursor-pointer active:scale-95 transition-transform text-xs">Add ₹3</span>
          </div>
          
          <div className="w-full h-px bg-gray-100 my-1"></div>
          
          <div className="flex justify-between items-end pt-1">
            <div>
              <p className="font-extrabold text-gray-900 text-[17px] tracking-wide">Grand Total</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">Inclusive of all taxes</p>
            </div>
            <span className="font-black text-gray-900 text-[20px]">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-4 mb-20 px-6 text-center">
         <div className="bg-gradient-to-r from-green-50 via-green-100/50 to-green-50 px-4 py-2.5 rounded-xl border border-green-200/50 flex items-center gap-2 shadow-sm w-full justify-center">
           <span className="text-green-600 font-bold text-lg leading-none">🎉</span>
           <span className="text-[11px] text-green-700 font-bold tracking-widest uppercase">You saved ₹120 on this order!</span>
         </div>
      </div>

      {/* FIXED CHECKOUT BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-between items-center z-50 shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.06)] pb-6 pb-safe">
        <div className="flex flex-col ml-2">
          <div className="flex items-center gap-1 cursor-pointer group">
             <span className="text-[10px] font-extrabold text-gray-500 tracking-widest uppercase group-hover:text-gray-700 transition">Pay Using</span>
             <span className="text-[8px] text-gray-400 border-l border-gray-300 pl-1.5 mt-0.5 ml-0.5">▴</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 cursor-pointer">
             <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center p-1"><img src="https://developers.google.com/static/pay/api/images/brand-guidelines/google-pay-mark.png" alt="GPay" className="w-full h-full object-contain opacity-80" /></div>
             <span className="text-[14px] font-black text-gray-900 tracking-tight">Google Pay</span>
          </div>
        </div>
        
        <button 
          onClick={() => router.push("/checkout")} 
          className="bg-gradient-to-r from-[#E23744] to-[#f0535e] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between min-w-[210px] shadow-[0_8px_25px_rgb(226,55,68,0.35)] hover:shadow-[0_12px_30px_rgb(226,55,68,0.45)] active:scale-95 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <div className="flex flex-col items-start leading-[1.1]">
            <span className="text-[18px] tracking-wide font-black drop-shadow-sm">₹{grandTotal.toFixed(2)}</span>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-white/80 mt-1">Total</span>
          </div>
          <span className="flex items-center gap-2 text-[16px] tracking-wide font-bold">
            Place Order <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-inner">›</span>
          </span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
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
