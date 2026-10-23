import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Check, ShieldCheck, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency } from '../types';
import { soundEffects } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout flow state: 'cart' | 'shipping' | 'confirmation'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'confirmation'>('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Wanderer Jane',
    email: 'jane.wanderer@gmail.com',
    address: '144 Mountain View Ave',
    city: 'Alpine Valley',
    country: 'United States',
  });
  const [orderNumber, setOrderNumber] = useState('');

  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  };

  const { symbol, rate } = currencyRates[currency];

  const formatPrice = (amountUSD: number) => {
    return `${symbol}${(amountUSD * rate).toFixed(2)}`;
  };

  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const discountAmountUSD = (subtotalUSD * discountPercent) / 100;
  const freeShippingThresholdUSD = 45;
  const isFreeShipping = subtotalUSD >= freeShippingThresholdUSD;
  const shippingFeeUSD = items.length > 0 && !isFreeShipping ? 6 : 0;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD + shippingFeeUSD);

  const handleApplyPromo = () => {
    soundEffects.playPop();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FLUFFY10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Fluffy Explorer discount applied!');
      setPromoError('');
    } else if (clean === 'PACOTRAVEL') {
      setDiscountPercent(15);
      setPromoSuccess('15% Globetrotter discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "FLUFFY10" or "PACOTRAVEL"');
      setPromoSuccess('');
    }
  };

  const handleCompleteOrder = () => {
    soundEffects.playSuccess();
    const randomOrder = `PACO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrder);
    setCheckoutStep('confirmation');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2D9CC] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E8734A]" />
            <h3 className="font-editorial text-xl font-bold text-[#2B2723]">
              {checkoutStep === 'confirmation'
                ? 'Expedition Dispatched!'
                : checkoutStep === 'shipping'
                ? 'Delivery Coordinates'
                : `Travel Bag (${items.reduce((s, i) => s + i.quantity, 0)})`}
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              if (checkoutStep === 'confirmation') {
                onClearCart();
                setCheckoutStep('cart');
              }
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] flex items-center justify-center text-[#2B2723]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Bar (in cart step) */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="bg-[#FAF0E6] px-5 py-3 border-b border-[#EAD5C7] text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium text-[#A64A26]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {isFreeShipping ? (
                  <span className="font-bold text-[#206637]">You’ve unlocked Free Worldwide Shipping! 🎉</span>
                ) : (
                  <span>Add {formatPrice(freeShippingThresholdUSD - subtotalUSD)} more for Free Shipping</span>
                )}
              </span>
              <span>{Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100))}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2D0C0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E8734A] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotalUSD / freeShippingThresholdUSD) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#EFEAE1] flex items-center justify-center text-3xl">
                    🦙
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg font-bold text-[#2B2723]">Your bag is currently empty</h4>
                    <p className="text-xs text-[#736B5F] mt-1 max-w-xs">
                      Pack the 2026 World Travel Calendar or a handcrafted pocket alpaca companion before you depart!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-[#E8734A] text-white text-xs font-semibold rounded-xl hover:bg-[#D55F37] transition-all"
                  >
                    Browse Paco’s Picks
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#E0D8CB] flex gap-3 items-center shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#FAF8F5] shrink-0 border border-[#EAE3D6]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#2B2723] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#8C8276] mt-0.5">
                          {formatPrice(item.product.priceUSD)} each
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#DED5C7] rounded-lg bg-[#FAF8F5]">
                            <button
                              onClick={() => {
                                soundEffects.playPop();
                                onUpdateQuantity(item.product.id, item.quantity - 1);
                              }}
                              className="p-1 hover:text-[#E8734A]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#2B2723]">{item.quantity}</span>
                            <button
                              onClick={() => {
                                soundEffects.playPop();
                                onUpdateQuantity(item.product.id, item.quantity + 1);
                              }}
                              className="p-1 hover:text-[#E8734A]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              soundEffects.playPop();
                              onRemoveItem(item.product.id);
                            }}
                            className="p-1 text-[#A89F91] hover:text-rose-600 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right font-bold text-xs text-[#2B2723]">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (e.g. FLUFFY10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A] uppercase font-mono"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-3.5 py-2 bg-[#2B2723] text-white text-xs font-semibold rounded-xl hover:bg-[#403B35]"
                      >
                        Apply
                      </button>
                    </div>
                    {promoSuccess && (
                      <p className="text-[11px] text-[#206637] font-medium mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3" /> {promoSuccess}
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-rose-600 font-medium mt-1">{promoError}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING FORM */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#FAF0E6] p-3 rounded-xl text-[#A64A26]">
                <span className="font-bold block mb-0.5">Worldwide Expedition Dispatch</span>
                <span>Paco packs all parcels with an official expedition stamp and postcard!</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-[#575046] block mb-1">Full Explorer Name</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#575046] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#575046] block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#575046] block mb-1">City</label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#575046] block mb-1">Country</label>
                    <input
                      type="text"
                      value={customerInfo.country}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method simulation */}
              <div className="pt-2 border-t border-[#EAE3D6] space-y-2">
                <span className="font-bold text-[#2B2723] block">Payment Method</span>
                <div className="p-3 bg-white rounded-xl border border-[#DED5C7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💳</span>
                    <span className="font-semibold text-[#2B2723]">Encrypted Travel Card ending in •••• 4242</span>
                  </div>
                  <span className="text-[10px] text-[#206637] font-bold">VERIFIED</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {checkoutStep === 'confirmation' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#206637] flex items-center justify-center mx-auto text-2xl shadow-sm">
                🦙
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#2B2723]">
                ¡Muchas Gracias, {customerInfo.name.split(' ')[0]}!
              </h4>
              <p className="text-xs text-[#575046] max-w-xs mx-auto leading-relaxed">
                Your travel artifact package is being hand-wrapped in eco-friendly paper. A shipping confirmation has been dispatched to <strong>{customerInfo.email}</strong>.
              </p>

              <div className="bg-white p-4 rounded-2xl border border-[#DED5C7] text-left text-xs space-y-2 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Tracking Code:</span>
                  <span className="font-mono font-bold text-[#2B2723]">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Estimated Delivery:</span>
                  <span className="font-semibold text-[#2B2723]">3–5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8276]">Destination:</span>
                  <span className="font-semibold text-[#2B2723]">{customerInfo.city}, {customerInfo.country}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0EBE1] font-bold">
                  <span>Total Paid:</span>
                  <span className="text-[#E8734A]">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF0E6] rounded-xl text-[11px] text-[#A64A26] max-w-xs mx-auto">
                5% of your order has been donated to highland Andean weaving co-ops in Peru!
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer with Totals & Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D6] bg-white space-y-3">
            {checkoutStep !== 'confirmation' && (
              <div className="space-y-1.5 text-xs text-[#575046]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2B2723]">{formatPrice(subtotalUSD)}</span>
                </div>
                {discountAmountUSD > 0 && (
                  <div className="flex justify-between text-[#206637] font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Shipping</span>
                  <span className="font-semibold text-[#2B2723]">
                    {shippingFeeUSD === 0 ? 'FREE' : formatPrice(shippingFeeUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2B2723] pt-2 border-t border-[#F0EBE1]">
                  <span>Total</span>
                  <span className="text-[#E8734A]">{formatPrice(totalUSD)}</span>
                </div>
              </div>
            )}

            {/* Actions depending on step */}
            {checkoutStep === 'cart' && (
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setCheckoutStep('shipping');
                }}
                className="w-full py-3.5 bg-[#E8734A] text-white font-semibold text-xs rounded-xl hover:bg-[#D55F37] shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout ({formatPrice(totalUSD)})
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {checkoutStep === 'shipping' && (
              <div className="space-y-2">
                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-3.5 bg-[#206637] text-white font-semibold text-xs rounded-xl hover:bg-[#164d27] shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirm & Place Order ({formatPrice(totalUSD)})
                </button>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setCheckoutStep('cart');
                  }}
                  className="w-full py-2 text-xs font-semibold text-[#736B5F] hover:text-[#2B2723]"
                >
                  ← Back to Bag
                </button>
              </div>
            )}

            {checkoutStep === 'confirmation' && (
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onClearCart();
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3.5 bg-[#2B2723] text-white font-semibold text-xs rounded-xl hover:bg-[#403B35] transition-colors"
              >
                Continue Exploring Paco’s World
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
