
import React from 'react';
import { PredictionResult, GroundwaterData, StressLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Map, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';

interface ResultDashboardProps {
  prediction: PredictionResult;
  data: GroundwaterData;
  onNext: () => void;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ prediction, data, onNext }) => {
  const isSafe = prediction.status === StressLevel.SAFE;
  const isAverage = prediction.status === StressLevel.AVERAGE;
  const isDanger = prediction.status === StressLevel.DANGER;

  // Mock data for charts
  const rainfallData = [
    { month: 'Jan', mm: data.rainfall / 12 * 0.4 },
    { month: 'Mar', mm: data.rainfall / 12 * 0.8 },
    { month: 'Jun', mm: data.rainfall / 12 * 1.5 },
    { month: 'Sep', mm: data.rainfall / 12 * 2.2 },
    { month: 'Nov', mm: data.rainfall / 12 * 1.8 },
    { month: 'Dec', mm: data.rainfall / 12 * 0.6 },
  ];

  const trendData = data.groundwaterTrend.map((depth, idx) => ({
    year: 2019 + idx,
    depth: depth
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-bold text-[#0F172A] mb-2">Groundwater Stress Prediction Result</h2>
          <p className="text-gray-500 font-medium">Based on submitted data for {prediction.district} district</p>
        </div>
        <button 
          onClick={onNext}
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-blue-200/40"
        >
          View AI Recommendations <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Status Card */}
        <div className="lg:col-span-4 space-y-8">
          <div className={`p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden ${
            isSafe ? 'bg-emerald-600' : isAverage ? 'bg-amber-500' : 'bg-rose-600'
          }`}>
            <div className="relative z-10">
              <div className="bg-white/20 w-fit p-3 rounded-2xl mb-6 backdrop-blur-sm">
                {isSafe ? <CheckCircle size={32} /> : isAverage ? <Info size={32} /> : <AlertTriangle size={32} />}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1">Current Classification</h3>
              <p className="text-6xl font-black mb-2">{prediction.status}</p>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  {prediction.confidence * 100}% Confidence
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-white/30">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm font-medium">District</span>
                  <span className="font-bold text-lg">{prediction.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm font-medium">Target Crop</span>
                  <span className="font-bold text-lg">{prediction.cropType}</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E5E7EB]">
            <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
              <AlertTriangle className="text-amber-500" size={18} /> AI Recommendation
            </h4>
            <p className="text-[#1F2933] leading-relaxed italic text-lg font-medium">
              "{prediction.recommendation}"
            </p>
          </div>

          <div className="bg-blue-50 p-7 rounded-[2.5rem] flex items-center gap-5 border border-blue-100">
            <div className="bg-[#2563EB] p-3.5 rounded-2xl text-white shadow-lg">
              <Map size={28} />
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] text-sm uppercase tracking-wide">Hydrogeological Zone</h4>
              <p className="text-xs text-gray-500 font-medium leading-tight mt-1">Analysis highlights high potential recharge zones in coastal plains.</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E5E7EB] flex flex-col h-[420px]">
            <h4 className="font-bold text-[#1F2933] mb-6 uppercase text-xs tracking-widest opacity-60">Rainfall Intensity (Estimated)</h4>
            <div className="flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '14px' }} 
                  />
                  <Bar dataKey="mm" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E5E7EB] flex flex-col h-[420px]">
            <h4 className="font-bold text-[#1F2933] mb-6 uppercase text-xs tracking-widest opacity-60">Water Table Depth Trend</h4>
            <div className="flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorDepth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} reversed unit="m" tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '14px' }}
                  />
                  <Area type="monotone" dataKey="depth" stroke="#2563EB" fillOpacity={1} fill="url(#colorDepth)" strokeWidth={4} dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 text-center uppercase font-bold tracking-tighter">Negative gradient indicates critical depletion risks</p>
          </div>

          <div className="md:col-span-2 bg-[#0F172A] p-10 rounded-[2.5rem] text-white overflow-hidden relative border border-white/10">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-grow">
                <h4 className="text-3xl font-extrabold mb-4">Regional Water Inventory</h4>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-lg font-medium">
                  Your agricultural footprint in {prediction.district} is monitored via Aqua-Intel's regional grid. 
                  Aquifers here show a {isDanger ? '9.4%' : '2.1%'} decrease in storage capacity annually.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md min-w-[140px]">
                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Daily ET</p>
                    <p className="text-2xl font-black text-white">4.2 mm</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md min-w-[140px]">
                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Recharge P.I.</p>
                    <p className="text-2xl font-black text-[#2563EB]">{isSafe ? 'OPTIMAL' : isAverage ? 'MODERATE' : 'CRITICAL'}</p>
                  </div>
                </div>
              </div>
              <div className="w-64 h-64 bg-slate-800 rounded-3xl flex items-center justify-center relative overflow-hidden flex-shrink-0 border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400" 
                  alt="Field view" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="relative w-4 h-4 bg-[#2563EB] rounded-full animate-ping"></div>
                <div className="relative w-3 h-3 bg-[#2563EB] rounded-full shadow-[0_0_15px_#2563EB]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
