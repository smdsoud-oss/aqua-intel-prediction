
import React from 'react';
import { ArrowRight, Waves } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onViewHow: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onViewHow }) => {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-[#F5F7FA] to-green-50/50 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center md:text-left">
          <div>
            <span className="inline-block py-1 px-4 bg-blue-100 text-[#2563EB] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              AI-Powered Agriculture
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] leading-tight">
              Aqua-Intel
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
              Predictive Groundwater Stress System for <br className="hidden lg:block" /> 
              Tamil Nadu Agriculture
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={onStart}
              className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200/50 transition-all transform hover:-translate-y-1"
            >
              Start Analysis <ArrowRight size={20} />
            </button>
            <button 
              onClick={onViewHow}
              className="flex items-center justify-center gap-2 bg-white border border-[#CBD5E1] hover:border-[#2563EB] text-[#1F2933] px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all"
            >
              View How It Works
            </button>
          </div>

          <div className="flex items-center gap-6 justify-center md:justify-start pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/100/100?random=${i + 10}`} 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                  alt="User avatar" 
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-semibold">
              Trusted by 5,000+ farmers across TN
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#2563EB]/5 rounded-3xl transform rotate-3 scale-105 group-hover:rotate-1 transition-transform"></div>
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" 
            alt="Tamil Nadu farmers working in fields" 
            className="relative rounded-3xl shadow-xl object-cover aspect-[4/3] w-full border border-white"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-[#E5E7EB] animate-bounce">
            <div className="bg-blue-50 p-2.5 rounded-full text-[#2563EB]">
              <Waves size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Water Level</p>
              <p className="text-lg font-bold text-[#0F172A]">+12.4% Recovery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
