import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, TrendingUp, Users, Plus, Star } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { getMarketplaceTrends } from '../services/geminiService';

export const FarmerAdmin: React.FC = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [marketTrends, setMarketTrends] = useState<string>('');
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);

  // Mock Sales Data (Scaled for INR)
  const salesData = [
    { name: 'Mon', sales: 12500 },
    { name: 'Tue', sales: 15400 },
    { name: 'Wed', sales: 18200 },
    { name: 'Thu', sales: 11000 },
    { name: 'Fri', sales: 24500 },
    { name: 'Sat', sales: 32000 },
    { name: 'Sun', sales: 28500 },
  ];

  const handleGetTrends = async () => {
    setIsLoadingTrends(true);
    const trends = await getMarketplaceTrends(products);
    setMarketTrends(trends);
    setIsLoadingTrends(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Farmer Dashboard</h2>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign size={20} className="text-emerald-500" /> Total Revenue
          </div>
          <div className="text-2xl font-bold text-slate-800">₹4,50,000</div>
          <div className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12}/> +15% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Package size={20} className="text-blue-500" /> Total Orders
          </div>
          <div className="text-2xl font-bold text-slate-800">342</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users size={20} className="text-purple-500" /> Active Customers
          </div>
          <div className="text-2xl font-bold text-slate-800">1,205</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Star size={20} className="text-amber-500" /> Avg Rating
          </div>
          <div className="text-2xl font-bold text-slate-800">4.8</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-6">Weekly Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-400" /> Market Insights
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Use AI to analyze your inventory against global trends to find new opportunities.
          </p>
          <button 
            onClick={handleGetTrends}
            disabled={isLoadingTrends}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors mb-4 disabled:opacity-50"
          >
            {isLoadingTrends ? 'Analyzing...' : 'Generate Insights'}
          </button>
          {marketTrends && (
            <div className="bg-white/10 p-4 rounded-lg text-sm text-slate-200 border border-white/10">
              {marketTrends}
            </div>
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700">Inventory Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Product Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                  <td className="px-6 py-4 text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 text-slate-500">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-500">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};