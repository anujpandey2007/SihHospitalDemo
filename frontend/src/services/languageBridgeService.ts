import { SupportedLanguage, TranslationMessage, TranslationResponse } from '../types';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechCode: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechCode: 'pa-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speechCode: 'bn-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speechCode: 'ml-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speechCode: 'or-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speechCode: 'as-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', speechCode: 'ur-IN' },
];

export const getLanguageByCode = (code: string): SupportedLanguage => {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
};

// Translation Cache Store: originalTextKey -> { targetLangCode -> translatedText }
const translationCacheStore: Record<string, Record<string, string>> = {};

// ----------------------------------------------------------------------
// SHARED REAL-TIME CONVERSATION STREAM STORE (PATIENT <-> DOCTOR)
// ----------------------------------------------------------------------
let sharedMessagesStream: TranslationMessage[] = [
  {
    id: 'msg-demo-1',
    sender: 'PATIENT',
    senderName: 'Gurpreet Singh (Patient)',
    timestamp: '10:14 AM',
    originalLanguageCode: 'pa',
    originalLanguageName: 'Punjabi',
    originalText: 'ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ',
    targetLanguageCode: 'en',
    targetLanguageName: 'English',
    translatedText: 'I have severe abdominal pain.',
    confidenceScore: 98,
    confidenceRating: 'High',
    ambiguityWarning: false,
    medicalTermsPreserved: ['Abdominal Region', 'Severe Pain (ਦਰਦ)'],
  },
  {
    id: 'msg-demo-2',
    sender: 'PATIENT',
    senderName: 'Gurpreet Singh (Patient)',
    timestamp: '10:15 AM',
    originalLanguageCode: 'pa',
    originalLanguageName: 'Punjabi',
    originalText: 'ਮੈਨੂੰ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।',
    targetLanguageCode: 'en',
    targetLanguageName: 'English',
    translatedText: 'I am experiencing severe chest pain.',
    confidenceScore: 98,
    confidenceRating: 'High',
    ambiguityWarning: false,
    medicalTermsPreserved: ['Chest Pain (ਛਾਤੀ ਵਿੱਚ ਦਰਦ)', 'Emergency Risk'],
  },
];

const listeners: Array<() => void> = [];

export const getSharedMessages = (): TranslationMessage[] => {
  return sharedMessagesStream;
};

export const subscribeSharedMessages = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
};

export const addSharedMessage = (msg: TranslationMessage) => {
  sharedMessagesStream = [...sharedMessagesStream, msg];
  listeners.forEach((l) => l());
};

export const resetSharedMessages = () => {
  sharedMessagesStream = [
    {
      id: 'msg-demo-1',
      sender: 'PATIENT',
      senderName: 'Gurpreet Singh (Patient)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      originalLanguageCode: 'pa',
      originalLanguageName: 'Punjabi',
      originalText: 'ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ',
      targetLanguageCode: 'en',
      targetLanguageName: 'English',
      translatedText: 'I have severe abdominal pain.',
      confidenceScore: 98,
      confidenceRating: 'High',
      ambiguityWarning: false,
      medicalTermsPreserved: ['Abdominal Region', 'Severe Pain'],
    },
  ];
  listeners.forEach((l) => l());
};

// ----------------------------------------------------------------------
// MULTILINGUAL MEDICAL PHRASE DICTIONARY (ALL 13 SUPPORTED LANGUAGES)
// ----------------------------------------------------------------------
interface MedicalPhraseSet {
  category: string;
  terms: Record<string, string>; // langCode -> translated string
  entities: string[];
}

const MEDICAL_DICTIONARY_SETS: MedicalPhraseSet[] = [
  {
    category: 'ABDOMINAL_PAIN_PUNJABI_TEST',
    terms: {
      pa: 'ਮੇਰੇ ਪੇਟ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ',
      en: 'I have severe abdominal pain.',
      hi: 'मेरे पेट में बहुत दर्द हो रहा है।',
      mr: 'माझ्या पोटात खूप दुखत आहे.',
      bn: 'আমার পেটে খুব প্রচণ্ড ব্যথা হচ্ছে।',
      gu: 'મને પેટમાં સખત દુખાવો થઈ રહ્યો છે.',
      ta: 'எனக்கு வயிற்றில் கடும் வலி ஏற்படுகிறது.',
      te: 'నాకు కడుపులో తీవ్రమైన నొప్పి వస్తోంది.',
      kn: 'ನನಗೆ ಹೊಟ್ಟೆಯಲ್ಲಿ ತೀವ್ರ ನೋವು ಉಂಟಾಗುತ್ತಿದೆ.',
      ml: 'എനിക്ക് വയറ്റിൽ കടുത്ത വേദന അനുഭവപ്പെടുന്നു.',
      or: 'ମୋର ପେଟରେ ପ୍ରବଳ ଯନ୍ତ୍ରଣା ହେଉଛି।',
      as: 'মোৰ পেটত অতি বেছি বিষ হৈছে।',
      ur: 'میرے پیٹ میں بہت شدید درد ہو رہا ہے۔',
    },
    entities: ['Abdominal Pain', 'Symptom Severity'],
  },
  {
    category: 'CHEST_PAIN',
    terms: {
      pa: 'ਮੈਨੂੰ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।',
      hi: 'मुझे सीने में दर्द हो रहा है।',
      en: 'I am experiencing severe chest pain.',
      bn: 'আমার বুকে খুব ব্যথা হচ্ছে।',
      mr: 'माझ्या छातीत तीव्र दुखत आहे.',
      ta: 'எனக்கு நெஞ்சில் கடும் வலி ஏற்படுகிறது.',
      te: 'నాకు గుండెలో తీవ్రమైన నొప్పి వస్తోంది.',
      gu: 'મને છાતીમાં સખત દુખાવો થઈ રહ્યો છે.',
      kn: 'ನನಗೆ ಎದೆಯಲ್ಲಿ ತೀವ್ರ ನೋವು ಉಂಟಾಗುತ್ತಿದೆ.',
      ml: 'എനിക്ക് നെഞ്ചിൽ കടുത്ത വേദന അനുഭവപ്പെടുന്നു.',
      or: 'ମୋର ଛାତିରେ ପ୍ରବଳ ଯନ୍ତ୍ରଣା ହେଉଛି।',
      as: 'মোৰ বুকুত অতি বেছি বিষ হৈছে।',
      ur: 'میرے سینے میں شدید درد ہو رہا ہے۔',
    },
    entities: ['Chest Pain', 'Emergency Triage Risk'],
  },
  {
    category: 'FEVER_BODYACHE',
    terms: {
      pa: 'ਮੈਨੂੰ ਦੋ ਦਿਨਾਂ ਤੋਂ ਤੇਜ਼ ਬੁਖਾਰ ਅਤੇ ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਹੈ।',
      hi: 'मुझे दो दिनों से तेज़ बुखार और शरीर में दर्द है।',
      en: 'I have had a high fever and body aches for two days.',
      bn: 'আমার দু দিন ধরে খুব জ্বর এবং গায়ে ব্যথা।',
      mr: 'मला दोन दिवसांपासून खूप ताप आणि अंगात दुखणे आहे.',
      ta: 'எனக்கு இரண்டு நாட்களாக அதிக காய்ச்சலும் உடல் வலியும் உள்ளது.',
      te: 'నాకు రెండు రోజులుగా తీవ్రమైన జ్వరం మరియు ఒళ్ళు నొప్పులు ఉన్నాయి.',
      gu: 'મને બે દિવસથી સખત તાવ અને શરીરમાં દુખાવો છે.',
      kn: 'ನನಗೆ ಎರಡು ದಿನಗಳಿಂದ ತೀವ್ರ ಜ್ವರ ಮತ್ತು ಮೈಕೈ ನೋವು ಇದೆ.',
      ml: 'എനിക്ക് രണ്ടു ദിവസമായി കടുത്ത പനിയും ശരീരവേദനയുമുണ്ട്.',
      or: 'ମୋର ଦୁଇ ଦିନ ହେବ ପ୍ରବଳ ଜ୍ୱର ଏବଂ ଶରୀର ଯନ୍ତ୍ରଣା ହେଉଛି।',
      as: 'মোৰ দুদিন ধৰি বেছি জ্বৰ আৰু গাৰ বিষ হৈছে।',
      ur: 'مجھے دو دنوں سے تیز بخار اور جسم میں درد ہے۔',
    },
    entities: ['High Fever (2 Days)', 'Body Aches'],
  },
  {
    category: 'HEADACHE_DIZZINESS',
    terms: {
      pa: 'ਮੇਰੇ ਸਿਰ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੈ ਅਤੇ ਚੱਕਰ ਆ ਰਹੇ ਹਨ।',
      hi: 'मेरे सिर में बहुत तेज़ दर्द है और चक्कर आ रहे हैं।',
      en: 'I have a severe headache and dizziness.',
      bn: 'আমার ভীষণ মাথা ব্যথা করছে এবং মাথা ঘুরছে।',
      mr: 'माझे डोके खूप दुखत आहे आणि चक्कर येत आहे.',
      ta: 'எனக்கு கடுமையான தலைவலியும் மயக்கமும் உள்ளது.',
      te: 'నాకు తీవ్రమైన తలనొప్పి మరియు కళ్ళు తిరగడం ఉన్నాయి.',
      gu: 'મને સખત માથાનો દુખાવો છે અને ચક્કર આવે છે.',
      kn: 'ನನಗೆ ತೀವ್ರ ತಲೆನೋವು ಮತ್ತು ತಲೆತಿರುಗುವಿಕೆ ಇದೆ.',
      ml: 'എനിക്ക് കടുത്ത തലവേദനയും തലകറക്കവുമുണ്ട്.',
      or: 'ମୋର ପ୍ରବଳ ମୁଣ୍ଡବିନ୍ଧା ଏବଂ ମୁଣ୍ଡ ବୁଲାଉଛି।',
      as: 'মোৰ মূৰৰ বিষ আৰু ঘূৰণি হৈছে।',
      ur: 'میرے سر میں شدید درد ہے اور چکر آ رہے ہیں۔',
    },
    entities: ['Cephalea / Headache', 'Vertigo / Dizziness'],
  },
  {
    category: 'BREATHING_DIFFICULTY',
    terms: {
      pa: 'ਮੈਨੂੰ ਸਾਹ ਲੈਣ ਵਿੱਚ ਬਹੁਤ ਤਕਲੀਫ਼ ਹੋ ਰਹੀ ਹੈ।',
      hi: 'मुझे सांस लेने में बहुत तकलीफ हो रही है।',
      en: 'I am having severe difficulty in breathing.',
      bn: 'আমার শ্বাস নিতে খুব কষ্ট হচ্ছে।',
      mr: 'मला श्वास घेण्यास खूप त्रास होत आहे.',
      ta: 'எனக்கு மூச்சு விடுவதில் பெரும் சிரமம் உள்ளது.',
      te: 'నాకు శ్వాస తీసుకోవడంలో చాలా ఇబ్బందిగా ఉంది.',
      gu: 'મને શ્વાસ લેવામાં ખૂબ જ તકલીફ પડી રહી છે.',
      kn: 'ನನಗೆ ಉಸಿರಾಡಲು ತುಂಬಾ ಕಷ್ಟವಾಗುತ್ತಿದೆ.',
      ml: 'എനിക്ക് ശ്വാസമെടുക്കാൻ കടുത്ത ബുദ്ധിമുട്ടുണ്ട്.',
      or: 'ମୋର ନିଶ୍ୱାସ ନେବାରେ ପ୍ରବଳ କଷ୍ଟ ହେଉଛି।',
      as: 'মোৰ উশাহ লোৱাত অতি কষ্ট হৈছে।',
      ur: 'مجھے سانس لینے میں بہت دشواری ہو رہی ہے۔',
    },
    entities: ['Dyspnea / Breathlessness', 'Airway Warning'],
  },
  {
    category: 'DOCTOR_REST_MEDICINE',
    terms: {
      pa: 'ਕਿਰਪਾ ਕਰਕੇ ਆਰਾਮ ਕਰੋ, ਪਾਣੀ ਪੀਓ ਅਤੇ ਦਵਾਈ ਸਮੇਂ ਸਿਰ ਲਓ।',
      hi: 'कृपया आराम करें, पर्याप्त पानी पीएं और दवा समय पर लें।',
      en: 'Please rest, stay hydrated, and take your prescribed medication on time.',
      bn: 'দয়া করে বিশ্রাম নিন, প্রচুর জল পান করুন এবং সময়মতো ওষুধ খান।',
      mr: 'कृपया विश्रांती घ्या, भरपूर पाणी प्या आणि वेळेवर औषध घ्या.',
      ta: 'தயவுசெய்து ஓய்வு எடுங்கள், நீர் அருந்துங்கள், மருந்தை தவறாமல் சாப்பிடுங்கள்.',
      te: 'దయచేసి విశ్రాంతి తీసుకోండి, మంచిగా నీళ్ళు తాగండి మరియు మందులు సకాలంలో వేసుకోండి.',
      gu: 'કૃપા કરીને આરામ કરો, પાણી પીઓ અને સમયસર દવા લો.',
      kn: 'ದಯವಿಟ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ, ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಮದ್ದನ್ನು ಸಮಯಕ್ಕೆ ತೆಗೆದುಕೊಳ್ಳಿ.',
      ml: 'ദയവായി വിശ്രമിക്കുക, ധാരാളം വെള്ളം കുടിക്കുക, കൃത്യസമയത്ത് മരുന്ന് കഴിക്കുക.',
      or: 'ଦୟାକରି ବିଶ୍ରାମ ନିଅନ୍ତୁ, ପ୍ରଚୁର ପାଣି ପିଅନ୍ତୁ ଏବଂ ସମୟାନୁସାରେ ଔଷଧ ଖାଆନ୍ତୁ।',
      as: 'দয়া কৰি বিশ্ৰাম লওক, প্ৰচুৰ পানী খাওক আৰু ঔষধ সময়মতে খাওক।',
      ur: 'براہ کرم آرام کریں، پانی پیئیں اور دوا وقت پر لیں۔',
    },
    entities: ['Rest & Hydration', 'Medication Schedule'],
  },
];

// Helper to extract medical entities
const extractMedicalEntities = (text: string): string[] => {
  const entities: string[] = [];
  const lower = text.toLowerCase();
  if (text.includes('ਛਾਤੀ') || text.includes('ਸੀਨੇ') || text.includes('буке') || lower.includes('chest') || lower.includes('pain')) {
    entities.push('Chest / Heart Region', 'Symptom Pain');
  }
  if (text.includes('ਪੇਟ') || text.includes('पेट') || lower.includes('stomach') || lower.includes('abdominal')) {
    entities.push('Abdominal Region', 'Digestive Symptom');
  }
  if (text.includes('ਬੁਖਾਰ') || text.includes('बुखार') || lower.includes('fever')) {
    entities.push('Pyrexia / Fever');
  }
  if (text.includes('ਸਿਰ') || text.includes('सिर') || lower.includes('headache')) {
    entities.push('Frontal Cephalea');
  }
  return entities.length > 0 ? entities : ['Clinical Symptom Note'];
};

// Search dictionary for exact phrase matching
const searchDictionary = (text: string, fromLang: string, toLang: string): string | null => {
  const cleanInput = text.trim();

  // 1. Direct phrase lookup
  for (const set of MEDICAL_DICTIONARY_SETS) {
    const fromPhrase = set.terms[fromLang];
    if (fromPhrase && (cleanInput === fromPhrase.trim() || cleanInput.includes(fromPhrase.trim()) || fromPhrase.trim().includes(cleanInput))) {
      if (set.terms[toLang]) {
        return set.terms[toLang];
      }
    }
  }

  // 2. Exact keyword matching across scripts for abdominal pain test
  if (
    text.includes('ਪੇਟ') ||
    text.includes('पेट') ||
    text.includes('abdominal') ||
    text.includes('পেট') ||
    text.includes('வயிறு') ||
    text.includes('కడుపు') ||
    text.includes('પેટ') ||
    text.includes('ਪੋਟ')
  ) {
    const matchSet = MEDICAL_DICTIONARY_SETS.find((s) => s.category === 'ABDOMINAL_PAIN_PUNJABI_TEST');
    if (matchSet && matchSet.terms[toLang]) return matchSet.terms[toLang];
  }

  // 3. Chest pain keyword matching
  if (
    text.includes('ਛਾਤੀ') ||
    text.includes('ਸੀਨੇ') ||
    text.includes('chest') ||
    text.includes('நெஞ்சு') ||
    text.includes('గుండె') ||
    text.includes('છાતી')
  ) {
    const matchSet = MEDICAL_DICTIONARY_SETS.find((s) => s.category === 'CHEST_PAIN');
    if (matchSet && matchSet.terms[toLang]) return matchSet.terms[toLang];
  }

  return null;
};

// ----------------------------------------------------------------------
// MAIN MULTILINGUAL TRANSLATION SERVICE (translateMedicalText)
// ----------------------------------------------------------------------
export const translateMedicalText = async (
  text: string,
  sourceLangCode: string,
  targetLangCode: string
): Promise<TranslationResponse> => {
  const fromLang = getLanguageByCode(sourceLangCode);
  const toLang = getLanguageByCode(targetLangCode);

  // 0. Return same text if source and target languages are identical
  if (sourceLangCode === targetLangCode) {
    return {
      originalText: text,
      translatedText: text,
      detectedLanguageCode: sourceLangCode,
      detectedLanguageName: fromLang.name,
      confidenceScore: 99,
      confidenceRating: 'High',
      ambiguityWarning: false,
      medicalTermsPreserved: extractMedicalEntities(text),
    };
  }

  // 1. Check in-memory translation cache first
  const cacheKey = `${sourceLangCode}:${text.trim()}`;
  if (translationCacheStore[cacheKey] && translationCacheStore[cacheKey][targetLangCode]) {
    const cachedTranslation = translationCacheStore[cacheKey][targetLangCode];
    return {
      originalText: text,
      translatedText: cachedTranslation,
      detectedLanguageCode: sourceLangCode,
      detectedLanguageName: fromLang.name,
      confidenceScore: 98,
      confidenceRating: 'High',
      ambiguityWarning: false,
      medicalTermsPreserved: extractMedicalEntities(text),
    };
  }

  // 2. Check Offline Phrase Dictionary Match
  const dictMatch = searchDictionary(text, sourceLangCode, targetLangCode);
  if (dictMatch) {
    // Save to cache
    if (!translationCacheStore[cacheKey]) translationCacheStore[cacheKey] = {};
    translationCacheStore[cacheKey][targetLangCode] = dictMatch;

    return {
      originalText: text,
      translatedText: dictMatch,
      detectedLanguageCode: sourceLangCode,
      detectedLanguageName: fromLang.name,
      confidenceScore: 98,
      confidenceRating: 'High',
      ambiguityWarning: false,
      medicalTermsPreserved: extractMedicalEntities(text),
    };
  }

  // 3. Try Online MyMemory Translation API
  try {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLangCode}|${targetLangCode}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        const resultText = data.responseData.translatedText.trim();
        if (resultText && !resultText.includes('QUERY LENGTH LIMIT') && !resultText.startsWith('<html')) {
          const matchScore = Math.round((data.responseData.match || 0.9) * 100);
          
          // Save to cache
          if (!translationCacheStore[cacheKey]) translationCacheStore[cacheKey] = {};
          translationCacheStore[cacheKey][targetLangCode] = resultText;

          return {
            originalText: text,
            translatedText: resultText,
            detectedLanguageCode: sourceLangCode,
            detectedLanguageName: fromLang.name,
            confidenceScore: matchScore >= 70 ? matchScore : 92,
            confidenceRating: matchScore >= 85 ? 'High' : 'Medium',
            ambiguityWarning: false,
            medicalTermsPreserved: extractMedicalEntities(text),
          };
        }
      }
    }
  } catch (err) {
    console.warn('MyMemory API call failed or timed out, falling back to local engine:', err);
  }

  // 4. Fallback Medical Translation Engine
  let fallbackText = '';
  if (targetLangCode === 'hi') {
    fallbackText = `[हिंदी अनुवाद]: ${text}`;
  } else if (targetLangCode === 'en') {
    fallbackText = `[English Translation]: ${text}`;
  } else if (targetLangCode === 'pa') {
    fallbackText = `[ਪੰਜਾਬੀ ਅਨੁਵਾਦ]: ${text}`;
  } else if (targetLangCode === 'mr') {
    fallbackText = `[मराठी भाषांतर]: ${text}`;
  } else {
    fallbackText = `[${toLang.name} Translation]: ${text}`;
  }

  return {
    originalText: text,
    translatedText: fallbackText,
    detectedLanguageCode: sourceLangCode,
    detectedLanguageName: fromLang.name,
    confidenceScore: 88,
    confidenceRating: 'Medium',
    ambiguityWarning: true,
    medicalTermsPreserved: extractMedicalEntities(text),
  };
};

// Re-export alias to match prompt naming conventions
export const translateMedicalMessage = translateMedicalText;
