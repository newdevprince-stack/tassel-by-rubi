
import React from 'react';
import { Category } from '../types';

interface AccessoryCardProps {
  title: string;
  category: Category;
  description: string;
  price: string;
  imageUrl: string;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ title, category, description, price, imageUrl }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-700 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
            {title}
          </h3>
          <span className="text-blue-600 font-bold whitespace-nowrap ml-2">{price}</span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
          {description}
        </p>
        <button className="w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-sm font-semibold rounded-lg transition-all border border-slate-200 hover:border-blue-600">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AccessoryCard;
