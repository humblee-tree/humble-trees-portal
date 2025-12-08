import React, { useState } from 'react';
import { LayoutDashboard, Store, Sprout, ShoppingBag, Menu, X, Leaf, LogOut, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { CultivationDashboard } from './components/CultivationDashboard';
import { Marketplace } from './components/Marketplace';
import { FarmerAdmin } from './components/FarmerAdmin';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { ViewState, CartItem, Product, UserProfile, UserRole } from './types';

function App() {
  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // App State
  // 'landing' state is implicit if !user and showLogin is false
  const [showLogin, setShowLogin] = useState(false);
  
  const [currentView, setCurrentView] = useState<ViewState>('marketplace');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Checkout States
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleLogin = (name: string, role: UserRole) => {
    setUser({ name, email: 'test@example.com', role });
    // Redirect based on role
    setCurrentView(role === 'farmer' ? 'cultivation' : 'marketplace');
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
    setMobileMenuOpen(false);
    setShowLogin(false); // Go back to landing page
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setCart([]); // Clear cart
      
      // Close modal after success message
      setTimeout(() => {
        setOrderComplete(false);
        setShowCheckout(false);
        setCurrentView('marketplace'); // Redirect to shop
      }, 3000);
    }, 2000);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => { setCurrentView(view); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view 
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // Unauthenticated Routing
  if (!user) {
    if (showLogin) {
      return <Login onLogin={handleLogin} onBack={() => setShowLogin(false)} />;
    }
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  // Authenticated App Layout
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans animate-fade-in">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-emerald-700 text-lg">
          <Leaf className="fill-emerald-700" /> Humble Trees
        </div>
        <div className="flex items-center gap-4">
          <button className="relative" onClick={() => setShowCart(!showCart)}>
            <ShoppingBag className="text-slate-600" />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-2 font-bold text-emerald-700 text-2xl">
          <Leaf className="fill-emerald-700" size={28} /> Humble Trees
        </div>
        
        <nav className="p-4 space-y-2 mt-4">
          <div className="text-xs font-semibold text-slate-400 uppercase px-4 mb-2 tracking-wider">Modules</div>
          
          {/* Farmer Only Links */}
          {user.role === 'farmer' && (
            <NavItem view="cultivation" icon={Sprout} label="Cultivation Monitor" />
          )}
          
          {/* Shared Links */}
          <NavItem view="marketplace" icon={Store} label="Marketplace" />
          
          {/* Farmer Only Links */}
          {user.role === 'farmer' && (
            <NavItem view="farmer-admin" icon={LayoutDashboard} label="Farmer Admin" />
          )}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
            <div className="mb-4 px-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${user.role === 'farmer' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                    {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <div className="text-sm font-semibold text-slate-700 truncate">{user.name}</div>
                    <div className="text-xs text-slate-400 capitalize">{user.role}</div>
                </div>
            </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full md:h-screen overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto">
          {currentView === 'cultivation' && user.role === 'farmer' && <CultivationDashboard />}
          {currentView === 'marketplace' && <Marketplace onAddToCart={addToCart} cart={cart} />}
          {currentView === 'farmer-admin' && user.role === 'farmer' && <FarmerAdmin />}
        </div>
      </main>

      {/* Shopping Cart Sidebar (Right) */}
      {showCart && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl p-6 transform transition-transform animate-slide-in flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart
              </h3>
              <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 mt-20">
                <p>Your cart is empty.</p>
                <button 
                  onClick={() => { setShowCart(false); setCurrentView('marketplace'); }}
                  className="mt-4 text-emerald-600 hover:underline text-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto flex-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 border-b border-slate-100 pb-4">
                      <img src={item.imageUrl} className="w-16 h-16 rounded object-cover bg-slate-100" alt={item.name} />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                          <span className="font-medium text-emerald-700">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 self-start">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-slate-100 bg-white mt-auto">
                  <div className="flex justify-between mb-4 font-bold text-lg text-slate-800">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { setShowCart(false); setShowCheckout(true); }}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                  >
                    Checkout Now
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-in">
            
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="text-emerald-600" size={20} /> Secure Checkout
              </h3>
              {!isProcessing && !orderComplete && (
                <button onClick={() => setShowCheckout(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="p-6">
              {orderComplete ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Payment Successful!</h4>
                  <p className="text-slate-500 mb-2">Your order has been placed successfully.</p>
                  <p className="text-xs text-slate-400">Redirecting to marketplace...</p>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Total Amount</label>
                      <span className="font-bold text-emerald-700">₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        pattern="\d*"
                        maxLength={19}
                        className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="MM/YY" 
                          maxLength={5}
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                        <input 
                          required 
                          type="password" 
                          placeholder="123" 
                          maxLength={3}
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> Processing...
                        </>
                      ) : (
                        `Pay ₹${cartTotal.toFixed(2)}`
                      )}
                    </button>
                    <div className="mt-3 text-center">
                        <p className="text-[10px] text-slate-400">
                          This is a secure 256-bit SSL encrypted payment.
                        </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;