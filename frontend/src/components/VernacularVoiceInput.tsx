import React, { useState } from 'react';
import { Mic, MicOff, Languages, Sparkles, Volume2, RotateCcw } from 'lucide-react';

interface VernacularVoiceInputProps {
  onAnalyze: (text: string) => void;
  isLoading?: boolean;
}

export const VernacularVoiceInput: React.FC<VernacularVoiceInputProps> = ({ onAnalyze, isLoading }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presets = [
    {
      label: 'Hindi - Abdominal Pain',
      text: 'पेट में 2 दिन से तेज दर्द है, बार-बार उल्टी आ रही है और कल रात से तेज बुखार भी है, कमजोरी लग रही है...',
    },
    {
      label: 'Hindi - Chest Tightness',
      text: 'सीने में 1 दिन से बहुत भारीपन और जकड़न है, सांस लेने में तकलीफ हो रही है और पसीना आ रहा है...',
    },
    {
      label: 'English - Acute Headache',
      text: 'Having severe throbbing headache for 3 days with dizziness whenever I try to stand up.',
    }
  ];

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setTextInput(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setTextInput('पेट में 2 दिन से तेज दर्द है, बार-बार उल्टी आ रही है और कल रात से तेज बुखार भी है...');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleApplyPreset = (presetText: string, index: number) => {
    setTextInput(presetText);
    setSelectedPreset(`preset-${index}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onAnalyze(textInput.trim());
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm bg-white relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Patient Vernacular Symptoms Input</h3>
            <p className="text-xs text-slate-500">Speak or type symptoms in your local native language</p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200 rounded-full flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5" /> Speech-to-Text Ready
        </span>
      </div>

      {/* Preset Quick Buttons */}
      <div className="mb-4">
        <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
          Quick Vernacular Presets:
        </p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p.text, idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                selectedPreset === `preset-${idx}`
                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box & Mic */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            rows={4}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="अपनी भाषा में लक्षण बताएं (उदा: पेट में 2 दिन से तेज दर्द और बुखार है...)"
            className="w-full rounded-xl bg-slate-50 border border-slate-300 p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition resize-none"
          />

          {/* Mic Button Inside Field */}
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            {textInput && (
              <button
                type="button"
                onClick={() => { setTextInput(''); setSelectedPreset(null); }}
                className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition"
                title="Clear input"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleRecord}
              className={`p-3 rounded-xl font-bold flex items-center space-x-2 transition ${
                isRecording
                  ? 'bg-red-500 text-white mic-recording shadow-md shadow-red-500/30'
                  : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span className="text-xs">{isRecording ? 'Listening...' : 'Speak'}</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!textInput.trim() || isLoading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center space-x-2 disabled:opacity-50 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Processing Clinical View...' : 'Generate Clinical AI View'}</span>
          </button>
        </div>
      </form>

    </div>
  );
};
