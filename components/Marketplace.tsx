import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface MarketplaceProps {
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart, cart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Fresh', 'Dried', 'Spawn', 'Kit'];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Mushroom Marketplace</h2>
          <p className="text-slate-500">Fresh from the farm to your table</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search mushrooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden bg-slate-100 relative">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-slate-700 shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{product.name}</h3>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm text-slate-600 font-medium">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviews})</span>
              </div>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-xl font-bold text-emerald-700">₹{product.price.toFixed(2)}</span>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};