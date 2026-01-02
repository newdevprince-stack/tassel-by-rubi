
import React from 'react';
import { Category } from '../types';

interface CategoryIconsProps {
  activeCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
}

const categories = [
  { id: 'All', label: 'All Items', icon: 'M4 6h16M4 12h16m-7 6h7' },
  { id: Category.LATKANS, label: 'Latkans', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: Category.PRET, label: 'Pret', icon: 'M21 8l-2-2m-5 5L7 4m0 0l5 5m-5-5l3 3M3 12v7a2 2 0 002 2h14a2 2 0 002-2v-7' },
  { id: Category.UNSTITCHED, label: 'Unstitched', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: Category.SAREES, label: 'Sarees', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: Category.DUPATTAS, label: 'Dupattas', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { id: Category.BRIDAL, label: 'Bridal', icon: 'M12 21l-8.228-9.904A5 5 0 1115.814 4.41C17.85 5.993 18.916 8.427 18.916 11.05c0 2.623-1.066 5.057-3.102 6.64a5.003 5.003 0 01-3.814 3.31z' },
];

const CategoryIcons: React.FC<CategoryIconsProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="bg-white py-12 border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-6 md:gap-12 overflow-x-auto pb-4 category-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as any)}
              className="flex flex-col items-center group min-w-[80px]"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 mb-3 ${activeCategory === cat.id ? 'bg-maroon text-white scale-110 shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-maroon'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={cat.icon} />
                </svg>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest text-center transition-colors ${activeCategory === cat.id ? 'text-maroon' : 'text-slate-500'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
