
import React from 'react';
import { CloudRain, Sprout, MapPin, Database, Loader2 } from 'lucide-react';

const Processing: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        
        <Loader2 className="w-24 h-24 text-blue-600 animate-spin relative z-10" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce">Analyzing groundwater stress...</h2>
      <p className="text-gray-500 text-lg max-w-md mx-auto mb-12">
        Our AI engine is processing district statistics, soil properties, and historical trends to determine water availability.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl w-full">
        <div className="flex flex-col items-center gap-3 group">
          <div className="bg-blue-50 p-6 rounded-3xl text-blue-600 transform transition-transform group-hover:scale-110">
            <CloudRain size={32} />
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rainfall</span>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="bg-green-50 p-6 rounded-3xl text-green-600 transform transition-transform group-hover:scale-110">
            <Sprout size={32} />
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Crop Mix</span>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="bg-orange-50 p-6 rounded-3xl text-orange-600 transform transition-transform group-hover:scale-110">
            <Database size={32} />
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Soil Data</span>
        </div>
        <div className="flex flex-col items-center gap-3 group">
          <div className="bg-purple-50 p-6 rounded-3xl text-purple-600 transform transition-transform group-hover:scale-110">
            <MapPin size={32} />
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">District</span>
        </div>
      </div>

      <div className="mt-16 w-full max-w-xl bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full animate-[loading_2.5s_ease-in-out_infinite]"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Processing;
