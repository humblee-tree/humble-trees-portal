import React, { useState } from 'react';
import { Leaf, User, Lock, ArrowRight, Sprout, ShoppingBag, AlertCircle, ArrowLeft } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (name: string, role: UserRole) => void;
  onBack?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call and Validation
    setTimeout(() => {
      if (isRegistering) {
        // Registration Mock (Accepts anything)
        const displayName = name || (role === 'farmer' ? 'Green Thumb Farms' : 'New User');
        onLogin(displayName, role);
      } else {
        // Login Validation
        if (email === 'admin@gmail.com' && password === 'admin123') {
          onLogin('Humble Trees Admin', 'farmer');
        } else if (email === '123@gmail.com' && password === '123456') {
          onLogin('Humble Trees Customer', 'customer');
        } else {
          setError('Invalid credentials. Please check your email and password.');
          setIsLoading(false);
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      
      {/* Back Button */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-medium transition-colors z-10"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
      )}

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in">
        
        {/* Left Side - Brand & Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-emerald-800 to-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <div>
            <div className="flex items-center gap-3 text-3xl font-bold mb-6">
              <Leaf size={32} className="text-emerald-200" />
              Humble Trees
            </div>
            <p className="text-emerald-100 text-lg leading-relaxed">
              The ultimate platform for exotic mushroom cultivation monitoring and direct-to-consumer marketplace.
            </p>
          </div>

          <div className="space-y-6 mt-12 md:mt-0">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="bg-white/20 p-3 rounded-lg">
                <Sprout size={24} className="text-emerald-200" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Smart Cultivation</h4>
                <p className="text-sm text-emerald-200">IoT monitoring & AI insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="bg-white/20 p-3 rounded-lg">
                <ShoppingBag size={24} className="text-emerald-200" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Fresh Marketplace</h4>
                <p className="text-sm text-emerald-200">Farm to table delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isRegistering ? 'Join the mycelium network' : 'Please sign in to continue'}
            </p>
          </div>

          {/* Role Switcher */}
          {isRegistering && (
            <div className="bg-slate-100 p-1 rounded-xl flex mb-8">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'customer' 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'farmer' 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Farmer / Admin
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required={isRegistering}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border-slate-700 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border-slate-700 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border-slate-700 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-200"
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  {isRegistering ? 'Create Account' : 'Sign In'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};