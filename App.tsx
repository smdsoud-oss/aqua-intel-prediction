
import React, { useState, useEffect } from 'react';
import { AppScreen, GroundwaterData, PredictionResult, StressLevel } from './types';
import Home from './components/Home';
import DataInput from './components/DataInput';
import Processing from './components/Processing';
import ResultDashboard from './components/ResultDashboard';
import Recommendations from './components/Recommendations';
import About from './components/About';
import History from './components/History';
import { getAIAnalysis } from './services/gemini';
import { Layout } from './components/Layout';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [inputData, setInputData] = useState<GroundwaterData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleStart = () => setCurrentScreen(AppScreen.DATA_INPUT);
  const handleViewImpact = () => setCurrentScreen(AppScreen.ABOUT);

  const handleDataSubmit = async (data: GroundwaterData) => {
    setInputData(data);
    setCurrentScreen(AppScreen.PROCESSING);
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Prediction failed');
      
      const result = await response.json();
      setPrediction(result);
      setCurrentScreen(AppScreen.RESULTS);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get prediction from server.');
      setCurrentScreen(AppScreen.DATA_INPUT);
    }
  };

  const reset = () => {
    setInputData(null);
    setPrediction(null);
    setCurrentScreen(AppScreen.HOME);
  };

  const renderScreen = () => {
    let content;
    switch (currentScreen) {
      case AppScreen.HOME:
        content = <Home onStart={handleStart} onViewHow={handleViewImpact} />;
        break;
      case AppScreen.DATA_INPUT:
        content = <DataInput onSubmit={handleDataSubmit} />;
        break;
      case AppScreen.PROCESSING:
        content = <Processing />;
        break;
      case AppScreen.RESULTS:
        content = prediction && inputData ? (
          <ResultDashboard 
            prediction={prediction} 
            data={inputData} 
            onNext={() => setCurrentScreen(AppScreen.RECOMMENDATIONS)} 
          />
        ) : null;
        break;
      case AppScreen.RECOMMENDATIONS:
        content = prediction ? (
          <Recommendations 
            status={prediction.status} 
            onNext={() => setCurrentScreen(AppScreen.ABOUT)}
          />
        ) : null;
        break;
      case AppScreen.ABOUT:
        content = <About onRestart={reset} />;
        break;
      case AppScreen.HISTORY:
        content = <History onBack={() => setCurrentScreen(AppScreen.DATA_INPUT)} />;
        break;
      default:
        content = <Home onStart={handleStart} onViewHow={handleViewImpact} />;
    }

    return (
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={(s) => setCurrentScreen(s)}>
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
