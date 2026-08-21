import React, { useState, useEffect, useRef } from 'react';
import { 
  SUPPORTED_LANGUAGES, 
  getLanguageByCode, 
  translateMedicalText, 
  getSharedMessages,
  subscribeSharedMessages,
  addSharedMessage,
  resetSharedMessages
} from '../services/languageBridgeService';
import { TranslationMessage } from '../types';
import { 
  Languages, 
  Mic, 
  MicOff, 
  Volume2, 
  ShieldAlert, 
  Send, 
  RotateCcw, 
  ArrowDown,
  User,
  Stethoscope,
  Copy,
  Check
} from 'lucide-react';

interface LanguageBridgeProps {
  initialRolePerspective?: 'PATIENT' | 'DOCTOR' | 'BOTH';
}

export const LanguageBridge: React.FC<LanguageBridgeProps> = ({ initialRolePerspective = 'BOTH' }) => {
  // Role perspective flags
  const isPatientPortal = initialRolePerspective === 'PATIENT';
  const isDoctorDesk = initialRolePerspective === 'DOCTOR';
  const isSharedOverview = initialRolePerspective === 'BOTH';

  // --------------------------------------------------------------------
  // TWO COMPLETELY INDEPENDENT LANGUAGE VARIABLES (SOURCE vs TARGET)
  // --------------------------------------------------------------------
  const [patientLanguage, setPatientLanguage] = useState<string>('pa'); // Punjabi default
  const [doctorLanguage, setDoctorLanguage] = useState<string>('en'); // English default

  // Shared messages stream
  const [messages, setMessages] = useState<TranslationMessage[]>(getSharedMessages());

  // Input Box States (Patient input)
  const [messageText, setMessageText] = useState<string>('ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speechActiveId, setSpeechActiveId] = useState<string | null>(null);

  // Active translation cache for Doctor View
  const [doctorTranslations, setDoctorTranslations] = useState<Record<string, string>>({});
  const [isLoadingDoctorTrans, setIsLoadingDoctorTrans] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  // Subscribe to shared real-time messages
  useEffect(() => {
    const unsubscribe = subscribeSharedMessages(() => {
      setMessages([...getSharedMessages()]);
    });
    return () => unsubscribe();
  }, []);

  // --------------------------------------------------------------------
  // DOCTOR LANGUAGE SWITCHING (CRITICAL DEMO REQUIREMENT)
  // When doctorLanguage changes (e.g., English -> Marathi -> Hindi -> English),
  // originalText & patientLanguage REMAIN UNCHANGED.
  // ONLY doctorLanguage translation is updated dynamically!
  // --------------------------------------------------------------------
  useEffect(() => {
    updateDoctorTranslations();
  }, [doctorLanguage, messages]);

  const updateDoctorTranslations = async () => {
    setIsLoadingDoctorTrans(true);
    setTranslationError(null);

    try {
      const newCache: Record<string, string> = { ...doctorTranslations };

      for (const msg of messages) {
        // Source is msg.originalLanguageCode, Target is doctorLanguage
        const res = await translateMedicalText(msg.originalText, msg.originalLanguageCode, doctorLanguage);
        newCache[msg.id] = res.translatedText;
      }

      setDoctorTranslations(newCache);
    } catch (err) {
      setTranslationError('Translation service temporary offline. Original patient message remains preserved.');
    } finally {
      setIsLoadingDoctorTrans(false);
    }
  };

  // --------------------------------------------------------------------
  // VOICE INPUT (STT with patientLanguage.speechCode)
  // --------------------------------------------------------------------
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const activeLangConfig = isDoctorDesk ? getLanguageByCode(doctorLanguage) : getLanguageByCode(patientLanguage);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = activeLangConfig.speechCode;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0])
          .map((res: any) => res.transcript)
          .join('');
        setMessageText(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } else {
      setIsRecording(true);
      setTimeout(() => {
        if (isDoctorDesk) {
          setMessageText('कृपया आराम करें और दवा समय पर लें।');
        } else {
          setMessageText('ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ');
        }
        setIsRecording(false);
      }, 1500);
    }
  };

  // Text-To-Speech (TTS)
  const handleListenText = (text: string, langCode: string, msgId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langConfig = getLanguageByCode(langCode);
      utterance.lang = langConfig.speechCode;

      setSpeechActiveId(msgId);
      utterance.onend = () => setSpeechActiveId(null);
      utterance.onerror = () => setSpeechActiveId(null);

      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Audio Playback (${langCode}): ${text}`);
    }
  };

  // Copy to Clipboard
  const handleCopyText = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Submit Patient Input
  const handleSendPatientMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || isTranslating) return;

    setIsTranslating(true);
    const sender = isDoctorDesk ? 'DOCTOR' : 'PATIENT';
    const sourceCode = isDoctorDesk ? doctorLanguage : patientLanguage;
    const targetCode = isDoctorDesk ? patientLanguage : doctorLanguage;

    const fromLang = getLanguageByCode(sourceCode);
    const toLang = getLanguageByCode(targetCode);

    try {
      const res = await translateMedicalText(messageText.trim(), sourceCode, targetCode);

      const newMsg: TranslationMessage = {
        id: `msg-${Date.now()}`,
        sender,
        senderName: isDoctorDesk ? 'Dr. Anuj Pandey (OPD)' : 'Gurpreet Singh (Patient)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        originalLanguageCode: sourceCode,
        originalLanguageName: fromLang.name,
        originalText: messageText.trim(),
        targetLanguageCode: targetCode,
        targetLanguageName: toLang.name,
        translatedText: res.translatedText,
        confidenceScore: res.confidenceScore,
        confidenceRating: res.confidenceRating,
        ambiguityWarning: res.ambiguityWarning,
        medicalTermsPreserved: res.medicalTermsPreserved,
      };

      addSharedMessage(newMsg);
      setMessageText('');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleResetDemo = () => {
    resetSharedMessages();
    setMessageText('ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ');
  };

  return (
    <div className="glass-card rounded-2xl border border-teal-200 shadow-lg bg-white overflow-hidden font-sans">
      
      {/* 🌐 Header Card Bar */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 p-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                <span>🌐 MediLink Language Bridge</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 rounded-full border border-white/30">
                  Real-Time Medical Translation
                </span>
              </h3>
              <p className="text-xs text-teal-100 mt-0.5 font-medium">
                Preserves patient's original statement while allowing doctor to switch reading languages.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetDemo}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-xs flex items-center space-x-1.5 transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TWO INDEPENDENT LANGUAGE SELECTORS BAR */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PATIENT LANGUAGE (SOURCE) */}
        <div className={`p-3 rounded-xl border ${isPatientPortal || isSharedOverview ? 'bg-teal-50/70 border-teal-200' : 'bg-white border-slate-200'}`}>
          <label className="block text-xs font-extrabold text-teal-900 mb-1 flex items-center space-x-1.5 uppercase tracking-wider">
            <User className="w-4 h-4 text-teal-600" />
            <span>Patient Language (Source)</span>
          </label>
          
          {isDoctorDesk ? (
            /* Doctor Desk: Static display of patient's language */
            <div className="text-sm font-bold text-teal-800 flex items-center space-x-2 py-1">
              <span>{getLanguageByCode(patientLanguage).flag}</span>
              <span>{getLanguageByCode(patientLanguage).name} ({getLanguageByCode(patientLanguage).nativeName})</span>
            </div>
          ) : (
            /* Patient / Shared: Editable Patient Language Selector */
            <select
              value={patientLanguage}
              onChange={(e) => setPatientLanguage(e.target.value)}
              className="w-full rounded-lg bg-white border border-teal-300 p-2 text-xs font-extrabold text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          )}
          <p className="text-[11px] text-teal-700 mt-1 font-medium">Language used by patient for symptom input.</p>
        </div>

        {/* DOCTOR'S LANGUAGE (TARGET) */}
        <div className={`p-3 rounded-xl border ${isDoctorDesk || isSharedOverview ? 'bg-sky-50/70 border-sky-200' : 'bg-white border-slate-200'}`}>
          <label className="block text-xs font-extrabold text-sky-900 mb-1 flex items-center space-x-1.5 uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-sky-600" />
            <span>Doctor's Language (Target)</span>
          </label>

          {isPatientPortal ? (
            /* Patient Portal: Static display of Doctor's target setting */
            <div className="text-sm font-bold text-sky-800 flex items-center space-x-2 py-1">
              <span>{getLanguageByCode(doctorLanguage).flag}</span>
              <span>{getLanguageByCode(doctorLanguage).name} ({getLanguageByCode(doctorLanguage).nativeName})</span>
            </div>
          ) : (
            /* Doctor / Shared: Editable Doctor Language Selector */
            <select
              value={doctorLanguage}
              onChange={(e) => setDoctorLanguage(e.target.value)}
              className="w-full rounded-lg bg-white border border-sky-300 p-2 text-xs font-extrabold text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-sm"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          )}
          <p className="text-[11px] text-sky-700 mt-1 font-medium">Doctor independently chooses reading language.</p>
        </div>

      </div>

      {/* Error / Loading Indicator */}
      {translationError && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{translationError}</span>
          </div>
          <button onClick={updateDoctorTranslations} className="text-amber-900 underline font-bold">Retry</button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PATIENT ↔ DOCTOR CARDS STREAM */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-6 space-y-6 max-h-[520px] overflow-y-auto bg-slate-50/60">
        
        {messages.map((msg) => {
          const isPatient = msg.sender === 'PATIENT';
          const srcLang = getLanguageByCode(msg.originalLanguageCode);
          
          // Current Doctor target language for this message
          const targetLangCode = isPatient ? doctorLanguage : patientLanguage;
          const targetLang = getLanguageByCode(targetLangCode);
          
          // Current translated text for this target language
          const activeTranslation = isPatient 
            ? (doctorTranslations[msg.id] || msg.translatedText)
            : msg.translatedText;

          return (
            <div key={msg.id} className="glass-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              
              {/* Card Title & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    isPatient ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-sky-50 text-sky-800 border-sky-200'
                  }`}>
                    {isPatient ? `Patient Input (${srcLang.name})` : `Doctor Response (${srcLang.name})`}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{msg.timestamp}</span>
                </div>

                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  Original Message Preserved
                </span>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* ORIGINAL PATIENT INPUT SECTION */}
              {/* ------------------------------------------------------------ */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>ORIGINAL PATIENT INPUT ({srcLang.name} {srcLang.flag})</span>
                  </span>

                  <button
                    onClick={() => handleListenText(msg.originalText, msg.originalLanguageCode, `${msg.id}-orig`)}
                    className="flex items-center space-x-1 text-teal-700 hover:text-teal-900 transition font-bold"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${speechActiveId === `${msg.id}-orig` ? 'animate-bounce text-teal-600' : ''}`} />
                    <span>Listen ({srcLang.name})</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base font-extrabold leading-relaxed">
                  "{msg.originalText}"
                </div>
              </div>

              {/* Down Arrow Divider */}
              <div className="flex justify-center my-1 text-teal-600">
                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 text-teal-600" />
                </div>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* TRANSLATED FOR DOCTOR SECTION */}
              {/* ------------------------------------------------------------ */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                    <span>TRANSLATED FOR {isPatient ? "DOCTOR" : "PATIENT"} ({targetLang.name} {targetLang.flag})</span>
                  </span>

                  <div className="flex items-center space-x-3 text-xs">
                    <button
                      onClick={() => handleListenText(activeTranslation, targetLangCode, `${msg.id}-trans`)}
                      className="flex items-center space-x-1 text-sky-700 hover:text-sky-900 transition font-bold"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${speechActiveId === `${msg.id}-trans` ? 'animate-bounce text-sky-600' : ''}`} />
                      <span>Listen</span>
                    </button>

                    <button
                      onClick={() => handleCopyText(activeTranslation, msg.id)}
                      className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition font-bold"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 text-base font-extrabold leading-relaxed">
                  {isLoadingDoctorTrans ? (
                    <span className="text-xs text-teal-700 animate-pulse font-bold">Translating patient information to {targetLang.name}...</span>
                  ) : (
                    `"${activeTranslation}"`
                  )}
                </div>
              </div>

            </div>
          );
        })}

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PATIENT / DOCTOR INPUT FORM */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>
            Input Mode: <strong className={isDoctorDesk ? 'text-sky-600' : 'text-teal-600'}>
              {isDoctorDesk ? `Doctor (${getLanguageByCode(doctorLanguage).name})` : `Patient (${getLanguageByCode(patientLanguage).name})`}
            </strong>
          </span>
          <span className="text-slate-400 font-medium">🎤 Voice input uses {isDoctorDesk ? getLanguageByCode(doctorLanguage).speechCode : getLanguageByCode(patientLanguage).speechCode}</span>
        </div>

        <form onSubmit={handleSendPatientMessage} className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={
                isDoctorDesk
                  ? `Enter clinical response in ${getLanguageByCode(doctorLanguage).name} (e.g. कृपया आराम करें और दवा लें)...`
                  : `ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੋ (${getLanguageByCode(patientLanguage).name} e.g. ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ)...`
              }
              className="w-full rounded-xl bg-slate-50 border border-slate-300 p-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
            />

            {/* Microphone Button */}
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition ${
                  isRecording
                    ? 'bg-red-500 text-white mic-recording shadow-md shadow-red-500/30'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Listening...' : '🎤 Speak'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Translating preserves patient's original statement while converting for doctor's viewing language.
            </p>

            <button
              type="submit"
              disabled={!messageText.trim() || isTranslating}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center space-x-2 disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
              <span>{isTranslating ? 'Translating...' : 'Submit Symptoms'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
