import { AiClinicalAnalysis } from '../types';

export const analyzeVernacularInput = async (text: string): Promise<AiClinicalAnalysis> => {
  // Simulate AI latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const lower = text.toLowerCase();

  // 1. CHEST PAIN / CARDIAC / RESPIRATORY EMERGENCY
  if (
    text.includes('ਛਾਤੀ') ||
    text.includes('ਸੀਨੇ') ||
    text.includes('सांस') ||
    text.includes('ਸਾਹ') ||
    text.includes('chest') ||
    text.includes('நெஞ்சு') ||
    text.includes('గుండె') ||
    text.includes('বুকে') ||
    text.includes('छातीत') ||
    text.includes('ખાતી')
  ) {
    return {
      rawText: text,
      language: text.match(/[\u0A00-\u0A7F]/) 
        ? 'Punjabi (Gurmukhi)' 
        : text.match(/[\u0900-\u097F]/) 
        ? 'Hindi (Devanagari)'
        : text.match(/[\u0B80-\u0BFF]/)
        ? 'Tamil'
        : text.match(/[\u0980-\u09FF]/)
        ? 'Bengali'
        : 'English / Vernacular',
      chiefComplaint: 'Acute Chest Pain & Dyspnea (Emergency Triage)',
      symptoms: ['Chest Pain / Tightness (ਛਾਤੀ ਵਿੱਚ ਦਰਦ)', 'Shortness of breath', 'Diaphoresis (Cold Sweats)'],
      suspectedImpression: 'Acute Coronary Syndrome / Lower Respiratory Distress',
      recommendedTriage: 'PRIORITY_1_EMERGENCY',
      urgencyReason: 'Acute chest discomfort requires immediate ECG, O2 saturation check & emergency triage',
      suggestedDepartment: 'Cardiology / Emergency Care',
    };
  }

  // 2. ABDOMINAL PAIN & GASTROENTERITIS
  if (
    text.includes('ਪੇਟ') ||
    text.includes('पेट') ||
    text.includes('ਉਲਟੀ') ||
    text.includes('उल्टी') ||
    lower.includes('abdominal') ||
    lower.includes('stomach') ||
    text.includes('வயிறு') ||
    text.includes('కడుపు') ||
    text.includes('পোট')
  ) {
    return {
      rawText: text,
      language: text.match(/[\u0A00-\u0A7F]/) 
        ? 'Punjabi (Gurmukhi)' 
        : text.match(/[\u0900-\u097F]/) 
        ? 'Hindi (Devanagari)' 
        : 'Vernacular',
      chiefComplaint: 'Abdominal Pain & Gastrointestinal Discomfort (48h)',
      symptoms: ['Severe abdominal pain', 'Emesis (Vomiting)', 'General weakness'],
      suspectedImpression: 'Acute Gastroenteritis / Abdominal Infection',
      recommendedTriage: 'PRIORITY_2_SAME_DAY',
      urgencyReason: 'Abdominal pain with vomiting requires fluid replacement & OPD consultation',
      suggestedDepartment: 'Gastroenterology / General Medicine',
    };
  }

  // 3. FEVER & PYREXIA
  if (
    text.includes('ਬੁਖਾਰ') ||
    text.includes('बुखार') ||
    text.includes('ਜ੍ਵਰ') ||
    lower.includes('fever') ||
    text.includes('જ્વર') ||
    text.includes('காய்ச்சல்') ||
    text.includes('జ్వరం')
  ) {
    return {
      rawText: text,
      language: text.match(/[\u0A00-\u0A7F]/) ? 'Punjabi (Gurmukhi)' : 'Hindi / Regional',
      chiefComplaint: 'Pyrexia (High Fever) & Generalized Myalgia (2 Days)',
      symptoms: ['High grade fever', 'Severe body aches', 'Fatigue'],
      suspectedImpression: 'Acute Viral Pyrexia / Febrile Illness',
      recommendedTriage: 'PRIORITY_2_SAME_DAY',
      urgencyReason: 'Persistent fever requires blood CBC check and medical evaluation',
      suggestedDepartment: 'General OPD / Internal Medicine',
    };
  }

  // 4. HEADACHE & VERTIGO
  if (
    text.includes('ਸਿਰ') ||
    text.includes('सिर') ||
    text.includes('ਚੱਕਰ') ||
    text.includes('चक्कर') ||
    lower.includes('headache') ||
    lower.includes('dizzy')
  ) {
    return {
      rawText: text,
      language: text.match(/[\u0A00-\u0A7F]/) ? 'Punjabi (Gurmukhi)' : 'Hindi / Regional',
      chiefComplaint: 'Severe Frontal Cephalea & Vertigo (3 Days)',
      symptoms: ['Throbbing headache', 'Dizziness on standing', 'Mild nausea'],
      suspectedImpression: 'Tension Cephalea / Hypertensive Vertigo',
      recommendedTriage: 'PRIORITY_2_SAME_DAY',
      urgencyReason: 'Requires BP evaluation and neurological check',
      suggestedDepartment: 'Neurology / General OPD',
    };
  }

  // Default fallback AI analysis
  return {
    rawText: text,
    language: 'Multilingual Vernacular Input',
    chiefComplaint: text.slice(0, 50) + (text.length > 50 ? '...' : ''),
    symptoms: ['Self-reported symptom note', 'General discomfort'],
    suspectedImpression: 'Under physician OPD evaluation',
    recommendedTriage: 'PRIORITY_2_SAME_DAY',
    urgencyReason: 'Requires physician consultation',
    suggestedDepartment: 'General Medicine / OPD',
  };
};
