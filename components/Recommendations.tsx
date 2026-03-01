
import React from 'react';
import { StressLevel } from '../types';
import { Droplets, RefreshCw, LayoutGrid, CheckCircle2, ChevronRight, Share2, Printer } from 'lucide-react';

interface RecommendationsProps {
  status: StressLevel;
  onNext: () => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ status, onNext }) => {
  const isSafe = status === StressLevel.SAFE;
  const isAverage = status === StressLevel.AVERAGE;
  
  const recommendations = [
    {
      title: "Micro-Irrigation Tech",
      desc: isSafe 
        ? "Switch to automated drip systems to maintain your surplus status and reduce farm labor costs."
        : isAverage 
        ? "Replace flood irrigation with precision drip systems to save up to 45% more water per hectare."
        : "Immediately halt overhead irrigation; prioritize direct-to-root moisture delivery via sub-surface systems.",
      icon: <Droplets className="text-[#2563EB]" />,
      tag: "INFRASTRUCTURE"
    },
    {
      title: "Climate-Smart Crops",
      desc: isSafe 
        ? "Continue successful rotations; consider adding pulses like green gram to improve soil nutrients naturally."
        : isAverage 
        ? "Shift 30% of paddy land to millets (Ragi/Kambu) which thrive with minimal supplemental groundwater."
        : "Switch entire harvest to short-duration drought-resistant pulses or small millets to secure seasonal yield.",
      icon: <LayoutGrid className="text-emerald-500" />,
      tag: "CROP PLANNING"
    },
    {
      title: "Rainwater Systems",
      desc: isSafe 
        ? "Maintain existing percolation pits; clear recharge shafts before the Northeast monsoon peak."
        : isAverage 
        ? "Construct sunken recharge ponds to capture peak monsoon runoff and directly feed local borewells."
        : "Urgent: Deploy injection wells for direct aquifer recharge to combat localized dry-well scenarios.",
      icon: <RefreshCw className="text-amber-500" />,
      tag: "RECOVERY"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-4">
          <span className="bg-blue-100 text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
            AI Advisory Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A]">
            AI Recommendations
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl font-medium">
            Custom-tailored management actions based on your field's hydro-geological signature.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="p-4 bg-white border border-[#E5E7EB] rounded-2xl hover:bg-gray-50 transition-colors shadow-sm text-gray-700">
            <Share2 size={20} />
          </button>
          <button className="p-4 bg-white border border-[#E5E7EB] rounded-2xl hover:bg-gray-50 transition-colors shadow-sm text-gray-700">
            <Printer size={20} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {recommendations.map((rec, i) => (
          <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#E5E7EB] flex flex-col hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
            <div className="bg-[#F8FAFC] w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border border-[#F1F5F9] group-hover:scale-110 transition-transform">
              {React.cloneElement(rec.icon as React.ReactElement, { size: 36 })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB] mb-2">{rec.tag}</span>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-4">{rec.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8 flex-grow font-medium">
              {rec.desc}
            </p>
            <button className="flex items-center gap-2 font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors uppercase text-xs tracking-wider">
              Implementation Guide <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#0F172A] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-10 border border-white/5">
        <div className="bg-emerald-500 p-8 rounded-[2rem] flex-shrink-0 shadow-lg shadow-emerald-500/30 animate-pulse">
          <CheckCircle2 size={64} className="text-white" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-black mb-4 italic leading-tight">"Sustainability is not a choice, it's our heritage."</h3>
          <p className="text-gray-400 text-lg max-w-2xl mb-8 font-medium">
            Join 12,000+ Tamil Nadu farmers who have stabilized their groundwater levels using Aqua-Intel advisories.
          </p>
          <button 
            onClick={onNext}
            className="bg-[#2563EB] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#1E40AF] transition-all shadow-xl shadow-blue-500/20"
          >
            Finish & See Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
