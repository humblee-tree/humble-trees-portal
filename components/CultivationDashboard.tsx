import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Thermometer, Droplets, Wind, Activity, Plus, Trash2, Sprout } from 'lucide-react';
import { Batch, GrowthStage, SensorReading } from '../types';
import { MOCK_BATCHES } from '../constants';
import { analyzeBatchHealth } from '../services/geminiService';

export const CultivationDashboard: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(MOCK_BATCHES[0].id);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newBatchSpecies, setNewBatchSpecies] = useState('');
  const [newBatchStrain, setNewBatchStrain] = useState('');

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  // Simulation Logic: Updates sensor readings every 3 seconds to mimic IoT push
  useEffect(() => {
    const interval = setInterval(() => {
      setBatches(prevBatches => {
        return prevBatches.map(batch => {
          // Simulate slight random fluctuations
          const tempFluctuation = (Math.random() - 0.5) * 0.5;
          const humFluctuation = (Math.random() - 0.5) * 1.5;
          const co2Fluctuation = (Math.random() - 0.5) * 10;

          const newReading: SensorReading = {
            timestamp: new Date().toLocaleTimeString(),
            temperature: parseFloat((batch.currentReading.temperature + tempFluctuation).toFixed(1)),
            humidity: parseFloat((Math.min(100, Math.max(0, batch.currentReading.humidity + humFluctuation))).toFixed(1)),
            co2: Math.floor(batch.currentReading.co2 + co2Fluctuation)
          };

          // Keep only last 20 readings for the chart
          const updatedHistory = [...batch.readings, newReading].slice(-20);

          return {
            ...batch,
            currentReading: newReading,
            readings: updatedHistory
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const advice = await analyzeBatchHealth(selectedBatch);
    setAiAnalysis(advice);
    setLoadingAi(false);
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: Batch = {
      id: `b-${Date.now()}`,
      speciesName: newBatchSpecies,
      strain: newBatchStrain,
      startDate: new Date().toISOString().split('T')[0],
      growthStage: GrowthStage.INOCULATION,
      notes: 'New batch initialized',
      readings: [],
      currentReading: { timestamp: new Date().toISOString(), temperature: 22, humidity: 80, co2: 800 }
    };
    setBatches([...batches, newBatch]);
    setShowAddModal(false);
    setNewBatchSpecies('');
    setNewBatchStrain('');
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
    if (selectedBatchId === id && batches.length > 1) {
      setSelectedBatchId(batches.find(b => b.id !== id)?.id || '');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Smart Cultivation Monitor</h2>
          <p className="text-slate-500">Real-time IoT Environmental Tracking</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-[600px] overflow-y-auto">
          <h3 className="font-semibold text-slate-700 mb-4">Active Batches</h3>
          <div className="space-y-3">
            {batches.map(batch => (
              <div 
                key={batch.id}
                onClick={() => { setSelectedBatchId(batch.id); setAiAnalysis(""); }}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedBatchId === batch.id 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{batch.speciesName}</h4>
                    <p className="text-xs text-slate-500">{batch.strain}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    batch.growthStage === GrowthStage.FRUITING ? 'bg-purple-100 text-purple-700' :
                    batch.growthStage === GrowthStage.HARVEST ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {batch.growthStage}
                  </span>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1"><Thermometer size={12}/> {batch.currentReading.temperature}°C</span>
                  <span className="flex items-center gap-1"><Droplets size={12}/> {batch.currentReading.humidity}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Details Area */}
        {selectedBatch && (
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-rose-500 mb-2 font-semibold">
                  <Thermometer size={20} /> Temperature
                </div>
                <div className="text-3xl font-bold text-slate-800">{selectedBatch.currentReading.temperature}°C</div>
                <div className="text-xs text-slate-400 mt-1">Target: 20-25°C</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-blue-500 mb-2 font-semibold">
                  <Droplets size={20} /> Humidity
                </div>
                <div className="text-3xl font-bold text-slate-800">{selectedBatch.currentReading.humidity}%</div>
                <div className="text-xs text-slate-400 mt-1">Target: 85-95%</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 mb-2 font-semibold">
                  <Wind size={20} /> CO2 Level
                </div>
                <div className="text-3xl font-bold text-slate-800">{selectedBatch.currentReading.co2}</div>
                <div className="text-xs text-slate-400 mt-1">PPM (Parts Per Million)</div>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                <Activity size={18} /> Live Environmental Data
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedBatch.readings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="timestamp" hide />
                    <YAxis yAxisId="left" domain={['auto', 'auto']} />
                    <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f43f5e" strokeWidth={2} dot={false} name="Temp (°C)" />
                    <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={false} name="Humidity (%)" />
                    <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#64748b" strokeWidth={2} dot={false} name="CO2 (PPM)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Advisor */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                  <Sprout className="text-indigo-600" /> AI Mycologist Analysis
                </h3>
                <button 
                  onClick={handleAiAnalysis}
                  disabled={loadingAi}
                  className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loadingAi ? 'Analyzing...' : 'Analyze Now'}
                </button>
              </div>
              <div className="bg-white/60 p-4 rounded-lg text-indigo-800 min-h-[80px]">
                {aiAnalysis ? (
                  <p className="leading-relaxed">{aiAnalysis}</p>
                ) : (
                  <p className="text-indigo-400 italic">Click analyze to get real-time growth optimization advice from Gemini AI.</p>
                )}
              </div>
            </div>

             <div className="flex justify-end">
                <button 
                  onClick={() => handleDeleteBatch(selectedBatch.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete Batch
                </button>
             </div>

          </div>
        )}
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Start New Cultivation Batch</h3>
            <form onSubmit={handleAddBatch}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Species Name</label>
                <input 
                  required
                  type="text" 
                  value={newBatchSpecies}
                  onChange={(e) => setNewBatchSpecies(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g., King Oyster"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Strain</label>
                <input 
                  required
                  type="text" 
                  value={newBatchStrain}
                  onChange={(e) => setNewBatchStrain(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g., P. eryngii K7"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Start Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};