"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { clearCart } from "../../store/cartSlice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "An error occurred");
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setProcessing(false);
    } else {
      // Payment succeeded
      dispatch(clearCart());
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="bg-white/50 p-2 rounded-2xl">
        <PaymentElement />
      </div>
      {error && (
        <div className="bg-red-50 text-[#E23744] text-sm font-medium p-4 rounded-xl flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
      <button
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-[#E23744] to-[#f0535e] text-white font-extrabold text-lg py-4 rounded-2xl shadow-[0_8px_30px_rgb(226,55,68,0.3)] mt-6 disabled:opacity-70 disabled:shadow-none hover:shadow-[0_12px_40px_rgb(226,55,68,0.5)] active:scale-[0.98] transition-all relative overflow-hidden group"
      >
        <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
        {processing ? (
          <span className="flex items-center justify-center gap-3">
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing Securely...
          </span>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  
  const cartItems = useSelector((state: any) => state.cart?.items || []);
  const totalPrice = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  const deliveryCharge = 50;
  const taxes = 5;
  const donate = 3;
  const grandTotal = cartItems.length > 0 ? totalPrice + deliveryCharge + taxes + donate : 0;

  useEffect(() => {
    if (grandTotal === 0) {
      router.push("/");
      return;
    }

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: grandTotal }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [grandTotal, router]);

  if (!clientSecret && grandTotal > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -ml-32 -mt-32 w-64 h-64 bg-red-400/10 rounded-full blur-[80px] origin-center animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-gray-100 border-t-[#E23744] rounded-full animate-spin shadow-lg"></div>
        <p className="mt-6 text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse flex items-center gap-2">
          <span>🔒</span> Initiating Secure Payment
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-4 pb-24 font-sans relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none -mt-20 -mr-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -mb-20 -ml-20"></div>

      <div className="flex items-center px-6 mb-8 mt-2">
        <button 
          onClick={() => router.back()} 
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-[0_2px_15px_rgb(0,0,0,0.05)] hover:bg-gray-50 active:scale-95 transition-all text-xl font-light text-gray-800"
        >
          {"<"}
        </button>
        <h1 className="text-xl font-black flex-1 text-center pr-12 text-gray-900 tracking-tight">Complete Order</h1>
      </div>

      <div className="px-5 max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-3xl p-6 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/50 mb-6">
          <div className="mb-4">
             <div className="flex items-center gap-2 mb-3">
               <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">📍</span>
               <h3 className="font-bold text-gray-900 tracking-tight">Delivery Address</h3>
             </div>
             <textarea 
               className="w-full bg-gray-50/50 p-4 rounded-2xl border border-gray-100 outline-none text-[14px] font-medium text-gray-800 resize-none h-24 focus:ring-2 focus:ring-red-100 transition-all shadow-inner"
               defaultValue="Flat no: 301, SVR Enclave, Hyper Nagar, vasavi layout, Madhapur, Hyderabad, 500081"
             />
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-3xl p-6 rounded-3xl shadow-[0_10px_50px_rgb(0,0,0,0.06)] border border-white">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 border-dashed">
            <div>
              <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Amount to pay</span>
              <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                <span>₹</span>{grandTotal.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#fff5f6] text-[#E23744] px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-red-50 flex items-center gap-2">
               <span>🛍️</span> Verify Cart
            </div>
          </div>

          {clientSecret && (
            <div className="mt-2">
              <Elements options={{ 
                clientSecret, 
                appearance: { 
                  theme: 'flat', 
                  variables: { 
                    colorPrimary: '#E23744',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    colorBackground: '#ffffff',
                    colorText: '#1f2937',
                    colorDanger: '#df1b41',
                    spacingUnit: '4px',
                    borderRadius: '12px',
                  },
                  rules: {
                    '.Input': {
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      border: '1px solid #f3f4f6',
                      transition: 'all 0.2s ease',
                    },
                    '.Input:focus': {
                      boxShadow: '0 0 0 2px rgba(226,55,68,0.1)',
                      border: '1px solid #E23744',
                    }
                  }
                } 
              }} stripe={stripePromise}>
                <CheckoutForm amount={grandTotal} />
              </Elements>
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center flex flex-col items-center gap-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Powered by ultra-secure pathways</p>
          <div className="flex gap-4 justify-center items-center opacity-40 grayscale mix-blend-multiply">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-5" />
             <div className="w-px h-6 bg-gray-400"></div>
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5" />
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
