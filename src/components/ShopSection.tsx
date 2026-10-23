import React, { useState } from 'react';
import { ShoppingBag, Star, Eye, Check, Truck, ShieldCheck, Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Currency } from '../types';
import { soundEffects } from '../utils/audio';

interface ShopSectionProps {
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  currency,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [calendarPreviewProduct, setCalendarPreviewProduct] = useState<Product | null>(null);
  const [previewMonthIdx, setPreviewMonthIdx] = useState(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Currency multiplier
  const currencyRate: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  };

  const formatPrice = (priceUSD: number) => {
    const { symbol, rate } = currencyRate[currency];
    const converted = Math.round(priceUSD * rate);
    return `${symbol}${converted}.00`;
  };

  const categories = ['All', 'Stationery', 'Collectibles', 'Gear'];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleAdd = (product: Product) => {
    soundEffects.playPop();
    setAddedProductId(product.id);
    onAddToCart(product);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <section id="shop" className="py-20 bg-[#F7F2EA] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Official Goods & Artifacts</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723]">
              Paco’s Picks Shop
            </h2>
            <p className="text-base text-[#665D52] mt-2 max-w-2xl">
              Authentic travel gear, handcrafted pocket companions, and the official 2026 World Travel Calendar. 5% of all proceeds support artisan weaving cooperatives in Peru.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl self-start md:self-auto border border-[#E0D8CB]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2B2723] text-white shadow-xs'
                    : 'text-[#665D52] hover:text-[#2B2723]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Hero Product Banner (The 2026 Calendar) */}
        {products.find((p) => p.id === 'paco-calendar-2026') && (
          <div className="mb-14 bg-white rounded-3xl border border-[#E0D8CB] p-6 sm:p-10 shadow-sm overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE3D6] polaroid-shadow">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setCalendarPreviewProduct(products[0]);
                      setPreviewMonthIdx(0);
                    }}
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#2B2723] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#E8734A]" />
                    Interactive 12-Month Preview
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs text-[#C85A32] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Limited 2026 Print Run · Ships Worldwide</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B2723]">
                  {products[0].name}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#2B2723]">
                    {formatPrice(products[0].priceUSD)}
                  </span>
                  <span className="text-xs text-[#206637] font-semibold bg-[#EBF5EE] px-2.5 py-0.5 rounded">
                    Free Worldwide Shipping
                  </span>
                </div>

                <p className="text-sm text-[#575046] leading-relaxed">
                  {products[0].description}
                </p>

                <ul className="space-y-2 text-xs text-[#4A433A]">
                  {products[0].features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#E8734A] font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleAdd(products[0])}
                    className="px-6 py-3.5 bg-[#E8734A] text-white font-semibold text-sm rounded-xl hover:bg-[#D55F37] shadow-sm transition-all flex items-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {addedProductId === products[0].id ? 'Added to Cart!' : `Add to Cart — ${formatPrice(products[0].priceUSD)}`}
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setCalendarPreviewProduct(products[0]);
                      setPreviewMonthIdx(0);
                    }}
                    className="px-4 py-3.5 bg-[#FAF8F5] text-[#2B2723] font-semibold text-sm rounded-xl border border-[#DED5C7] hover:bg-[#F0EAE0] transition-colors"
                  >
                    Flip Through Months
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-[#E0D8CB] overflow-hidden flex flex-col justify-between hover:border-[#C85A32] hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {prod.badge && (
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#2B2723] px-2.5 py-1 rounded-md text-[11px] font-semibold shadow-xs">
                      {prod.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Rating & Category without pills */}
                  <div className="flex items-center justify-between text-xs text-[#8C8276] mb-2 font-medium">
                    <span>{prod.category}</span>
                    <span className="flex items-center gap-1 text-[#C85A32]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {prod.rating} ({prod.reviewCount})
                    </span>
                  </div>

                  <h4 className="font-editorial text-xl font-bold text-[#2B2723] group-hover:text-[#E8734A] transition-colors line-clamp-1">
                    {prod.name}
                  </h4>

                  <p className="text-xs text-[#575046] mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#F0EBE1] mt-2 pt-4">
                <span className="text-xl font-bold text-[#2B2723]">
                  {formatPrice(prod.priceUSD)}
                </span>

                <button
                  onClick={() => handleAdd(prod)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-95 ${
                    addedProductId === prod.id
                      ? 'bg-[#206637] text-white'
                      : 'bg-[#2B2723] text-white hover:bg-[#E8734A]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {addedProductId === prod.id ? 'Added!' : 'Add to Bag'}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Ethical Shipping & Highland Artisan Note */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#EAE3D6] text-xs text-[#575046]">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#2B2723] block text-sm">Carbon-Neutral Shipping</span>
              <p className="mt-0.5 text-[#736B5F]">Shipped plastic-free in biodegradable corrugated mailers from Cusco & European hubs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#2B2723] block text-sm">Highland Artisan Support</span>
              <p className="mt-0.5 text-[#736B5F]">5% of all shop profits support children’s education & weaving cooperatives in Peru.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#2B2723] block text-sm">30-Day Wanderer Guarantee</span>
              <p className="mt-0.5 text-[#736B5F]">If you don’t adore your Paco companion or calendar, full returns are effortless.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Calendar Interactive Flip-Through Preview Modal */}
      {calendarPreviewProduct && calendarPreviewProduct.calendarPreviewMonths && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl border border-[#DED5C7] shadow-2xl overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#EAE3D6] flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#2B2723]">
                  2026 Calendar Month Preview
                </h3>
                <span className="text-xs text-[#736B5F]">
                  Month {previewMonthIdx + 1} of {calendarPreviewProduct.calendarPreviewMonths.length}
                </span>
              </div>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setCalendarPreviewProduct(null);
                }}
                className="w-8 h-8 rounded-full bg-[#EFEAE1] hover:bg-[#E0D8CB] flex items-center justify-center text-[#2B2723]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Page Viewer */}
            <div className="p-6 flex flex-col items-center">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-[#DED5C7] polaroid-shadow bg-black">
                <img
                  src={calendarPreviewProduct.calendarPreviewMonths[previewMonthIdx].image}
                  alt={calendarPreviewProduct.calendarPreviewMonths[previewMonthIdx].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4C056]">
                    {calendarPreviewProduct.calendarPreviewMonths[previewMonthIdx].month}
                  </span>
                  <h4 className="font-editorial text-lg sm:text-xl font-bold">
                    {calendarPreviewProduct.calendarPreviewMonths[previewMonthIdx].title}
                  </h4>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-5 flex items-center justify-between w-full">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setPreviewMonthIdx((prev) => 
                      prev > 0 ? prev - 1 : calendarPreviewProduct.calendarPreviewMonths!.length - 1
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#DED5C7] text-xs font-semibold text-[#2B2723] hover:bg-[#F2ECE1] flex items-center gap-1.5 shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Month
                </button>

                <div className="flex gap-1.5">
                  {calendarPreviewProduct.calendarPreviewMonths.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundEffects.playPop();
                        setPreviewMonthIdx(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        previewMonthIdx === idx ? 'bg-[#E8734A] w-6' : 'bg-[#D4CBBF]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setPreviewMonthIdx((prev) => 
                      prev < calendarPreviewProduct.calendarPreviewMonths!.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#DED5C7] text-xs font-semibold text-[#2B2723] hover:bg-[#F2ECE1] flex items-center gap-1.5 shadow-xs"
                >
                  Next Month <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 w-full pt-4 border-t border-[#EAE3D6] flex justify-between items-center">
                <span className="font-bold text-lg text-[#2B2723]">
                  {formatPrice(calendarPreviewProduct.priceUSD)}
                </span>
                <button
                  onClick={() => {
                    handleAdd(calendarPreviewProduct);
                    setCalendarPreviewProduct(null);
                  }}
                  className="px-5 py-2.5 bg-[#E8734A] text-white text-xs font-semibold rounded-xl hover:bg-[#D55F37] flex items-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add Calendar to Bag
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
