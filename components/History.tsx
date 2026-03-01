
import React, { useEffect, useState } from 'react';
import { PredictionResult, StressLevel } from '../types';
import { Calendar, MapPin, Sprout, CheckCircle, Info, AlertTriangle, Clock } from 'lucide-react';

interface HistoryProps {
  onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: StressLevel) => {
    switch (status) {
      case StressLevel.SAFE: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case StressLevel.AVERAGE: return 'bg-amber-100 text-amber-700 border-amber-200';
      case StressLevel.DANGER: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: StressLevel) => {
    switch (status) {
      case StressLevel.SAFE: return <CheckCircle size={16} />;
      case StressLevel.AVERAGE: return <Info size={16} />;
      case StressLevel.DANGER: return <AlertTriangle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-[#0F172A] mb-2">Prediction History</h2>
          <p className="text-gray-500 font-medium">Review all past groundwater stress assessments</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#1F2933] px-6 py-3 rounded-xl font-bold transition-all"
        >
          Back to Analysis
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold">Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-[#E5E7EB] shadow-sm">
          <Clock size={64} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-bold text-[#0F172A] mb-2">No History Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You haven't performed any predictions yet. Start your first analysis to see it here.
          </p>
          <button 
            onClick={onBack}
            className="bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200/50"
          >
            Start First Analysis
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <Calendar size={14} />
                    {formatDate(item.timestamp)}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-[#0F172A] font-bold">
                    <MapPin size={18} className="text-blue-600" />
                    {item.district}
                  </div>
                  <div className="flex items-center gap-2 text-[#0F172A] font-bold">
                    <Sprout size={18} className="text-emerald-600" />
                    {item.cropType}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium line-clamp-2">
                  {item.recommendation}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-2 border-t md:border-t-0 md:border-l border-[#E5E7EB] pt-6 md:pt-0 md:pl-8">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Confidence</p>
                <p className="text-3xl font-black text-[#0F172A]">{item.confidence * 100}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
