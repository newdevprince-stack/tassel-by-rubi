
import React from 'react';
import { Category } from '../types';

interface ProductCardProps {
  title: string;
  category: Category;
  description: string;
  price: string;
  imageUrl: string;
  isNew?: boolean;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, description, price, imageUrl, isNew, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="group bg-white flex flex-col h-full luxury-shadow rounded-sm overflow-hidden border border-slate-50 hover:border-maroon/20 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Featured Badge */}
        {isNew && (
          <div className="absolute top-3 left-0">
             <span className="bg-maroon text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 shadow-md">
               New Season
             </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
           <button className="w-full py-3 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl">
             Quick View
           </button>
           <button className="w-full py-3 bg-[#25d366] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#128c7e] transition-all shadow-xl flex items-center justify-center gap-2">
             Inquiry
           </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col text-center">
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">{category}</span>
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-maroon transition-colors truncate px-2">
          {title}
        </h3>
        <div className="mt-2">
           <span className="text-sm font-bold text-maroon">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
