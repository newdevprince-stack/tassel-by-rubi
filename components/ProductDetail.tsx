
import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  relatedProducts: Product[];
  onSelectProduct: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, relatedProducts, onSelectProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  
  const whatsappUrl = `https://wa.me/923000000000?text=Hi, I am interested in ${product.title} (Price: ${product.price}). Is it available?`;

  const mockReviews = [
    { id: 1, user: "Amina K.", rating: 5, date: "2 days ago", comment: "The quality of the silk and the intricate work on the tassels is just breathtaking. Exactly like the pictures!", verified: true },
    { id: 2, user: "Sara Khan", rating: 4, date: "1 week ago", comment: "Beautiful design. Delivery took 4 days to Karachi, but the packaging was very luxury.", verified: true },
    { id: 3, user: "Zoya Ahmed", rating: 5, date: "2 weeks ago", comment: "Rubi's designs never disappoint. The emerald color is so rich in person.", verified: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-10">
        <button onClick={onBack} className="hover:text-maroon transition-colors">HOME</button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">{product.category.toUpperCase()}</span>
        <span className="text-slate-300">/</span>
        <span className="text-maroon truncate max-w-[200px]">{product.title.toUpperCase()}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-[3/4] rounded-sm overflow-hidden bg-slate-50 luxury-shadow group">
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className={`aspect-square bg-slate-50 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${i === 1 ? 'border-maroon opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={product.imageUrl} alt="Variant" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex text-yellow-400 text-xs">
                {"★★★★★".split('').map((s, i) => <span key={i}>{s}</span>)}
             </div>
             <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">(12 Reviews)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold serif text-slate-900 mb-6 leading-tight tracking-tight">{product.title}</h1>
          
          <div className="mb-8">
            <span className="text-3xl font-bold text-maroon">{product.price}</span>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Tax included. Shipping calculated at checkout.</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Quantity Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Quantity</label>
              <div className="flex items-center border border-slate-200 w-32 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors text-slate-600"
                >-</button>
                <input 
                  type="text" 
                  value={quantity} 
                  readOnly 
                  className="w-full text-center text-sm font-bold outline-none" 
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors text-slate-600"
                >+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-white border border-slate-900 text-slate-900 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
                Add To Cart
              </button>
              <button className="w-full py-4 bg-maroon text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg">
                Buy It Now
              </button>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                className="w-full py-4 bg-[#25d366] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#128c7e] transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Inquiry on WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col gap-6">
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-maroon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth="1.5"/></svg>
                </div>
                <div>
                   <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-1">Authentic Craftsmanship</h4>
                   <p className="text-[10px] text-slate-500 font-medium">Every piece is hand-checked for quality perfection.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-maroon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5"/></svg>
                </div>
                <div>
                   <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-1">Global Shipping</h4>
                   <p className="text-[10px] text-slate-500 font-medium">Worldwide delivery via premium couriers (DHL/FedEx).</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="mb-24">
        <div className="flex justify-center border-b border-slate-100 gap-12">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'description' ? 'text-maroon after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maroon' : 'text-slate-400'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'reviews' ? 'text-maroon after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maroon' : 'text-slate-400'}`}
          >
            Reviews (12)
          </button>
        </div>

        <div className="py-12 max-w-4xl mx-auto">
          {activeTab === 'description' ? (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <h3 className="text-xl font-bold serif text-slate-900 mb-6">About this Ensemble</h3>
               <p className="text-slate-600 leading-relaxed font-light mb-8">
                 {product.description} This signature piece from Tassel Design by Rubi combines heritage artisanal techniques with contemporary luxury silhouettes. Each stitch tells a story of craftsmanship passed down through generations.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-maroon">Material & Care</h4>
                     <ul className="text-sm text-slate-500 space-y-2 list-disc pl-4 font-light">
                        <li>100% Pure Raw Silk / Premium Organza</li>
                        <li>Dry clean only</li>
                        <li>Handle with care due to delicate handwork</li>
                        <li>Keep in a moisture-free dust bag</li>
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-maroon">Design Highlights</h4>
                     <ul className="text-sm text-slate-500 space-y-2 list-disc pl-4 font-light">
                        <li>Intricate Zardosi work</li>
                        <li>Signature Rubi Tassels</li>
                        <li>Hand-painted details (selected variants)</li>
                        <li>Premium lining for comfort</li>
                     </ul>
                  </div>
               </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex flex-col md:flex-row items-center gap-10 mb-16 p-8 bg-slate-50 rounded-sm">
                  <div className="text-center">
                     <div className="text-5xl font-bold text-slate-900 mb-2">4.9</div>
                     <div className="flex text-yellow-400 text-lg justify-center mb-1">
                        {"★★★★★".split('').map((s, i) => <span key={i}>{s}</span>)}
                     </div>
                     <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Based on 12 reviews</div>
                  </div>
                  <div className="flex-grow w-full space-y-2">
                     {[5,4,3,2,1].map(star => (
                       <div key={star} className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-slate-600 w-4">{star}</span>
                          <div className="flex-grow h-1.5 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-maroon rounded-full" style={{ width: star === 5 ? '85%' : star === 4 ? '12%' : '1%' }}></div>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400 w-8">{star === 5 ? '85%' : star === 4 ? '12%' : '1%'}</span>
                       </div>
                     ))}
                  </div>
                  <button className="whitespace-nowrap px-8 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-maroon transition-all">
                     Write a Review
                  </button>
               </div>

               <div className="space-y-10">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border-b border-slate-100 pb-10">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className="text-sm font-bold text-slate-900">{review.user}</span>
                                {review.verified && (
                                  <span className="flex items-center gap-1 text-[9px] text-green-600 font-bold uppercase tracking-wider">
                                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                                     Verified Buyer
                                  </span>
                                )}
                             </div>
                             <div className="flex text-yellow-400 text-[10px]">
                                {"★★★★★".split('').map((s, i) => <span key={i} className={i < review.rating ? "opacity-100" : "opacity-20"}>{s}</span>)}
                             </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                       </div>
                       <p className="text-sm text-slate-600 font-light italic">"{review.comment}"</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-slate-100 pt-20">
          <h3 className="text-2xl font-bold serif text-slate-900 mb-12 text-center uppercase tracking-[0.2em]">Complete The Look</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {relatedProducts.slice(0, 4).map(p => (
              <ProductCard 
                key={p.id}
                title={p.title}
                category={p.category}
                description={p.description}
                price={p.price}
                imageUrl={p.imageUrl}
                onSelect={() => onSelectProduct(p.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
