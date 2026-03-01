
import React from 'react';
import { Target, ShieldCheck, PieChart, Globe, RefreshCcw } from 'lucide-react';

interface AboutProps {
  onRestart: () => void;
}

const About: React.FC<AboutProps> = ({ onRestart }) => {
  const impactCards = [
    {
      title: "Crop Planning",
      desc: "Empowers farmers to choose crops that match their soil's real-time water availability metrics.",
      icon: <Target className="text-rose-500" />,
      color: "bg-rose-50",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Risk Prevention",
      desc: "Identifies early warning signs of well failure to prevent financial losses for rural households.",
      icon: <ShieldCheck className="text-[#2563EB]" />,
      color: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Policy Support",
      desc: "Enables state-level authorities to plan equitable water distribution via data-driven mapping.",
      icon: <PieChart className="text-purple-500" />,
      color: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1454165833767-027ffea7028c?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Global Standards",
      desc: "Fully aligned with UN Sustainable Development Goal 6 (Clean Water) and Goal 2 (Food Security).",
      icon: <Globe className="text-emerald-500" />,
      color: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-black text-[#0F172A] tracking-tight">Why Aqua-Intel Matters</h2>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium">
          Digitalizing groundwater intelligence for 3.8 million agricultural stakeholders in Tamil Nadu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {impactCards.map((card, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] shadow-sm border border-[#E5E7EB] flex flex-col hover:-translate-y-2 transition-transform overflow-hidden">
            <div className="h-40 w-full relative">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div className="p-8 pt-0 -mt-8 relative z-10">
              <div className={`${card.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                {React.cloneElement(card.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative rounded-[3rem] overflow-hidden bg-white border border-[#E5E7EB] flex flex-col lg:flex-row shadow-xl">
        <div className="lg:w-1/2 p-12 md:p-16 space-y-8 bg-white relative z-10">
          <h3 className="text-4xl font-black text-[#0F172A]">Resilient TN Agriculture</h3>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            In semi-arid zones, precision is our greatest resource. Aqua-Intel provides the predictive clarity needed to transform Tamil Nadu into a water-surplus agricultural leader.
          </p>
          <ul className="space-y-5">
            {["Real-time Stress Indexing", "Historical Aquifer Mapping", "District-Specific Advisories"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#1F2933] font-bold">
                <div className="bg-emerald-500 rounded-full p-1"><ShieldCheck size={14} className="text-white" /></div>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={onRestart}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 flex items-center gap-3 transition-all"
          >
            <RefreshCcw size={22} /> Run New Prediction
          </button>
        </div>
        <div className="lg:w-1/2 relative min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" 
            alt="Field success" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block"></div>
        </div>
      </div>
      
      <div className="mt-20 text-center text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
        Proprietary Model • Agriculture Hackathon 2024 • Tamil Nadu State
      </div>
    </div>
  );
};

export default About;
