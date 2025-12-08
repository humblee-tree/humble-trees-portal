import React from 'react';
import { Leaf, Facebook, Instagram, Twitter } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden relative">
      
      {/* Background Image Area (Right Side) - Desktop Only 
          z-0 ensures it is at the base. 
      */}
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1595856552281-705b6826d2cb?q=80&w=2070&auto=format&fit=crop" 
          alt="Sustainable Farming"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for better text readability if it overlaps, though here it's side-by-side */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90"></div>
      </div>

      {/* The Wave Shape Overlay 
          z-10 ensures it sits on top of the image but behind the content 
      */}
      <div className="absolute top-0 right-[40%] w-[20%] h-full z-10 hidden md:block pointer-events-none">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-white fill-current transform scale-x-150 origin-right">
            <path d="M 0 0 L 100 0 L 100 100 L 0 100 C 50 70 80 40 0 0 Z" />
         </svg>
      </div>
      
      {/* Solid White Block to cover left side 
          z-10 matches the wave to create a seamless white area
      */}
      <div className="absolute top-0 left-0 right-[60%] h-full bg-white z-10 hidden md:block"></div>

      {/* Main Content Container 
          z-20 ensures all interactive elements are clickable and text is on top
      */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-screen flex flex-col">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center py-8">
           <div className="flex items-center gap-2 font-bold text-emerald-950 text-2xl tracking-tight">
             <Leaf className="fill-emerald-600 text-emerald-950" size={28} /> 
             <span>Humble Trees</span>
           </div>
           
           <div className="flex items-center gap-8">
             <div className="hidden md:flex gap-8 text-emerald-950 font-medium text-sm">
               <button className="hover:text-emerald-600 transition-colors">Home</button>
               <button className="hover:text-emerald-600 transition-colors">About</button>
               <button className="hover:text-emerald-600 transition-colors">Contact</button>
             </div>
             <button 
               onClick={onLoginClick}
               className="bg-emerald-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-900/10"
             >
               Shop Now
             </button>
           </div>
        </nav>

        {/* Hero Text Section */}
        <div className="flex-1 flex flex-col justify-center max-w-xl lg:pl-4">
           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-emerald-950 leading-[1.05] mb-8 tracking-tight">
            Plant for <br/>
            <span className="text-emerald-600">the future</span>
           </h1>
           
           <p className="text-slate-500 text-lg mb-10 leading-relaxed font-light">
             Experience the finest exotic mushrooms grown with smart technology. From our intelligent farms directly to your table, ensuring sustainability and premium quality in every harvest.
           </p>
           
           <div className="flex gap-4">
             <button 
               onClick={onLoginClick}
               className="bg-emerald-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1"
             >
               Learn More
             </button>
           </div>

           {/* Mobile Image Fallback */}
           <div className="md:hidden mt-8 rounded-2xl overflow-hidden shadow-xl mb-8">
             <img src="https://images.unsplash.com/photo-1595856552281-705b6826d2cb?q=80&w=800&auto=format&fit=crop" alt="Farming" className="w-full h-64 object-cover" />
           </div>

           {/* Footer / Socials */}
           <div className="flex flex-col md:flex-row md:items-center gap-6 mt-auto md:mt-16 pb-8 md:pb-12">
            <button className="flex items-center gap-3 text-emerald-950 font-bold text-sm group">
               <div className="bg-emerald-900 text-white p-1.5 rounded transition-transform group-hover:scale-110"><Facebook size={14} /></div> Facebook
            </button>
            <button className="flex items-center gap-3 text-emerald-950 font-bold text-sm group">
               <div className="bg-emerald-900 text-white p-1.5 rounded transition-transform group-hover:scale-110"><Instagram size={14} /></div> Instagram
            </button>
            <button className="flex items-center gap-3 text-emerald-950 font-bold text-sm group">
               <div className="bg-emerald-900 text-white p-1.5 rounded transition-transform group-hover:scale-110"><Twitter size={14} /></div> Twitter
            </button>
           </div>
        </div>

      </div>

    </div>
  );
};