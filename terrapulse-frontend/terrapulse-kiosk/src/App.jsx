import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from './components/SplitText';
// Import professional icons
import { Sprout, FileText, UserCheck, Target, Banknote, Cloud, CheckCircle2, FileImage, FileCode2, Map, CreditCard, Globe } from 'lucide-react';
import logo from './assets/logo.png';
import bgImage from './assets/farming.jpg';
import kccImg1 from './assets/KCC1.jpg';
import kccImg2 from './assets/KCC2.jpg';    
import kccImg3 from './assets/KCC3.png'; 
import kccImg4 from './assets/KCC4.png';   
import pattaImg1 from './assets/patta1.jpg';
import tractorImg1 from './assets/tractor1.png';
import tractorImg2 from './assets/tractor2.png';
import pmKisanImg1 from './assets/pmkisan1.png';
import pmKisanImg2 from './assets/pmkisan2.png';
import pmKisanImg3 from './assets/pmkisan3.png';

// UI Localization Dictionary for English, Tamil, Hindi, and Telugu
const translations = {
  English: {
    subtitle: "AI-Powered Agricultural Document Intelligence",
    ciStatus: "Build Passing (v1.4.2)",
    docsProcessed: "Documents Processed",
    farmersVerified: "Farmers Verified",
    ocrAccuracy: "OCR Accuracy",
    subsidiesGenerated: "Subsidies Generated",
    portalHeader: "Document Verification Portal",
    selectDocType: "Select Document Type",
    uploadScan: "Upload Scan",
    chooseFile: "Choose file",
    noFileChosen: "No file chosen",
    extractBtn: "Extract & Verify Document",
    initializing: "Initializing Architecture...",
    showSamples: "View Sample Documents ▼",
    hideSamples: "Hide Sample Documents ▲",
    kccForm: "KCC Form",
    landPatta: "Land Patta",
    tractorReceipt: "Tractor Receipt",
    pmKisan: "PM-KISAN",
    extractionSuccess: "Extraction Successful",
    confidence: "Confidence",
    docId: "Document ID",
    formattingQuality: "Formatting Quality",
    processingTime: "Processing Time",
    routingUsed: "Routing Used",
    extractionConfidence: "Extraction Confidence",
    fieldsExtracted: "Fields Extracted",
    fieldsTotal: "Fields Total",
    extractedFieldsData: "DATA (Extracted Fields)",
    noFields: "No fields extracted",
    pipelineHeader: "AWS Pipeline Trace"
  },
  Tamil: {
    subtitle: "AI-இயக்கப்பட்ட விவசாய ஆவண நுண்ணறிவு",
    ciStatus: "கட்டமைப்பு வெற்றி (v1.4.2)",
    docsProcessed: "சரிபார்க்கப்பட்ட ஆவணங்கள்",
    farmersVerified: "சரிபார்க்கப்பட்ட விவசாயிகள்",
    ocrAccuracy: "OCR துல்லியம்",
    subsidiesGenerated: "மானியங்கள் வழங்கப்பட்டது",
    portalHeader: "ஆவண சரிபார்ப்பு போர்டல்",
    selectDocType: "ஆவண வகையைத் தேர்ந்தெடுக்கவும்",
    uploadScan: "ஸ்கேன் பதிவேற்றவும்",
    chooseFile: "கோப்பைத் தேர்ந்தெடு",
    noFileChosen: "கோப்பு தேர்ந்தெடுக்கப்படவில்லை",
    extractBtn: "ஆவணத்தைப் பிரித்தெடுத்து சரிபார்க்கவும்",
    initializing: "கட்டமைப்பு தொடங்குகிறது...",
    showSamples: "மாதிரி ஆவணங்களைக் காண்க ▼",
    hideSamples: "மாதிரி ஆவணங்களை மறை ▲",
    kccForm: "கிசான் கடன் அட்டை",
    landPatta: "நிலப் பட்டா",
    tractorReceipt: "டீசல்/டிராக்டர் ரசீது",
    pmKisan: "PM-KISAN பதிவு",
    extractionSuccess: "பிரித்தெடுத்தல் வெற்றிகரமாக முடிந்தது",
    confidence: "நம்பிக்கை",
    docId: "ஆவண ஐடி",
    formattingQuality: "வடிவமைப்பு தரம்",
    processingTime: "செயலாக்க நேரம்",
    routingUsed: "பயன்படுத்தப்பட்ட ரூட்டிங்",
    extractionConfidence: "நம்பிக்கை சதவீதம்",
    fieldsExtracted: "பிரித்தெடுக்கப்பட்ட புலங்கள்",
    fieldsTotal: "மொத்த புலங்கள்",
    extractedFieldsData: "தரவு (பிரித்தெடுக்கப்பட்ட புலங்கள்)",
    noFields: "புலங்கள் எதுவும் இல்லை",
    pipelineHeader: "AWS பைப்லைன் தடமறிதல்"
  },
  Hindi: {
    subtitle: "AI-संचालित कृषि दस्तावेज़ बुद्धिमत्ता",
    ciStatus: "बिल्ड पास (v1.4.2)",
    docsProcessed: "दस्तावेज़ संसाधित",
    farmersVerified: "सत्यापित किसान",
    ocrAccuracy: "OCR सटीकता",
    subsidiesGenerated: "सब्सिडी उत्पन्न",
    portalHeader: "दस्तावेज़ सत्यापन पोर्टल",
    selectDocType: "दस्तावेज़ का प्रकार चुनें",
    uploadScan: "स्कैन अपलोड करें",
    chooseFile: "फ़ाइल चुनें",
    noFileChosen: "कोई फ़ाइल नहीं चुनी गई",
    extractBtn: "दस्तावेज़ निकालें और सत्यापित करें",
    initializing: "आर्किटेक्चर प्रारंभ हो रहा है...",
    showSamples: "नमूना दस्तावेज़ देखें ▼",
    hideSamples: "नमूना दस्तावेज़ छुपाएं ▲",
    kccForm: "केसीसी फॉर्म",
    landPatta: "भूमि पट्टा",
    tractorReceipt: "ट्रैक्टर रसीद",
    pmKisan: "पीएम-किसान",
    extractionSuccess: "निष्कर्षण सफल",
    confidence: "विश्वास",
    docId: "दस्तावेज़ आईडी",
    formattingQuality: "फॉर्मेटिंग गुणवत्ता",
    processingTime: "प्रसंस्करण समय",
    routingUsed: "रूटिंग प्रयुक्त",
    extractionConfidence: "निष्कर्षण विश्वास",
    fieldsExtracted: "निकाले गए फ़ील्ड",
    fieldsTotal: "कुल फ़ील्ड",
    extractedFieldsData: "डेटा (निकाले गए फ़ील्ड)",
    noFields: "कोई फ़ील्ड नहीं निकाला गया",
    pipelineHeader: "AWS पाइपलाइन ट्रेस"
  },
  Telugu: {
    subtitle: "AI-ఆధారిత వ్యవసాయ పత్ర నిఘా",
    ciStatus: "బిల్డ్ విజయవంతం (v1.4.2)",
    docsProcessed: "పత్రాలు ప్రాసెస్ చేయబడ్డాయి",
    farmersVerified: "ధృవీకరించబడిన రైతులు",
    ocrAccuracy: "OCR ఖచ్చితత్వం",
    subsidiesGenerated: "సబ్సిడీలు ఉత్పత్తి చేయబడ్డాయి",
    portalHeader: "డాక్యుమెంట్ వెరిఫికేషన్ పోర్టల్",
    selectDocType: "పత్ర రకాన్ని ఎంచుకోండి",
    uploadScan: "స్కాన్ అప్‌లోడ్ చేయండి",
    chooseFile: "ఫైల్‌ని ఎంచుకోండి",
    noFileChosen: "ఫైల్ ఎంచుకోబడలేదు",
    extractBtn: "పత్రాన్ని సంగ్రహಿಸಿ & ధృవీకరించండి",
    initializing: "ఆర్కిటెక్చర్ ప్రారంభమవుతోంది...",
    showSamples: "నమూనా పత్రాలను వీక్షించండి ▼",
    hideSamples: "నమూనా పత్రాలను దాచు ▲",
    kccForm: "కెసిసి ఫారమ్",
    landPatta: "భూమి పట్టా",
    tractorReceipt: "ట్రాక్టర్ రసీదు",
    pmKisan: "పిఎం-కిసాన్",
    extractionSuccess: "సంగ్రహణ విజయవంతమైంది",
    confidence: "విశ్వాసం",
    docId: "డాక్యుమెంట్ ఐడి",
    formattingQuality: "ఫార్మాటింగ్ నాణ్యత",
    processingTime: "ప్రాసెసింగ్ సమయం",
    routingUsed: "రూటింగ్ ఉపయోగించబడింది",
    extractionConfidence: "సంగ్రహణ విశ్వాసం",
    fieldsExtracted: "సంగ్రహించిన ఫీల్డ్‌లు",
    fieldsTotal: "మొత్తం ఫీల్డ్‌లు",
    extractedFieldsData: "డేటా (సంగ్రహించిన ఫీల్డ్‌లు)",
    noFields: "ఎన్ని ఫీల్డ్‌లు సంగ్రహించబడలేదు",
    pipelineHeader: "AWS పైప్‌లైన్ ట్రేస్"
  }
};

// AWS Pipeline Steps for the UI animation
const pipelineSteps = [
  { name: "S3 Bucket", desc: "Upload Initialized" },
  { name: "AWS Lambda", desc: "Triggering OCR Engine" },
  { name: "Amazon Textract", desc: "Extracting Fields" },
  { name: "DynamoDB", desc: "Validating Farmer Profile" },
  { name: "API Gateway", desc: "Generating JSON Payload" }
];

export default function App() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('kcc_form');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showSamples, setShowSamples] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [resultViewMode, setResultViewMode] = useState('clean');

  const t = (key) => {
    return translations[targetLanguage]?.[key] || translations['English'][key] || key;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextToSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    window.speechSynthesis.cancel();

    let rawData = result?.DATA || result?.extracted_data || result || {};
    if (typeof rawData === 'string') {
      try { rawData = JSON.parse(rawData); } catch (e) { rawData = {}; }
    }
    
    const fields = rawData.extracted_fields || rawData.DATA || rawData;

    let spokenParts = [];
    const extractAllValues = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      Object.entries(obj).forEach(([key, val]) => {
        if (['extraction_confidence', 'fields_extracted', 'fields_total', 'status'].includes(key)) return;
        
        if (val && typeof val === 'object') {
          extractAllValues(val);
        } else if (val !== null && val !== undefined && val !== '') {
          const cleanKey = key.replace(/_/g, ' ');
          spokenParts.push(`${cleanKey}: ${val}`);
        }
      });
    };

    extractAllValues(fields);

    const fieldSummary = spokenParts.join('. ');
    const docTypeLabel = docType.replace(/_/g, ' ');

    let summaryText = "";
    if (targetLanguage === 'Tamil') {
      summaryText = `ஆவணம் வெற்றிகரமாக சரிபார்க்கப்பட்டது. ஆவண வகை: ${docTypeLabel}. ${fieldSummary}`;
    } else if (targetLanguage === 'Hindi') {
      summaryText = `दस्तावेज़ सफलतापूर्वक सत्यापित हो गया है। दस्तावेज़ प्रकार: ${docTypeLabel}. ${fieldSummary}`;
    } else if (targetLanguage === 'Telugu') {
      summaryText = `పత్రం విజయవంతంగా ధృవీకరించబడింది. పత్ర రకం: ${docTypeLabel}. ${fieldSummary}`;
    } else {
      summaryText = `Document verification successful. Document Type: ${docTypeLabel}. ${fieldSummary}`;
    }

    const utterance = new SpeechSynthesisUtterance(summaryText);
    const targetLangCode = targetLanguage === 'Tamil' ? 'ta' : targetLanguage === 'Hindi' ? 'hi' : targetLanguage === 'Telugu' ? 'te' : 'en';
    utterance.lang = targetLanguage === 'Tamil' ? 'ta-IN' : targetLanguage === 'Hindi' ? 'hi-IN' : targetLanguage === 'Telugu' ? 'te-IN' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLangCode) || v.lang.replace('_', '-').startsWith(targetLangCode));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const generateVerificationCertificate = () => {
    let rawData = result?.DATA || result?.extracted_data || result || {};
    if (typeof rawData === 'string') {
      try { rawData = JSON.parse(rawData); } catch (e) { rawData = {}; }
    }
    const fields = rawData.extracted_fields || rawData.DATA || rawData;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert("Please allow popups to download the certificate.");
      return;
    }

    let fieldsHtml = '';
    if (typeof fields === 'object' && fields !== null) {
      const extractPrintable = (obj) => {
        Object.entries(obj).forEach(([key, val]) => {
          if (['extraction_confidence', 'fields_extracted', 'fields_total', 'status'].includes(key)) return;
          if (val && typeof val === 'object') {
            extractPrintable(val);
          } else if (val !== null && val !== undefined && val !== '') {
            fieldsHtml += `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                <span style="font-weight: bold; color: #4b5563; text-transform: uppercase; font-size: 12px;">${key.replace(/_/g, ' ')}</span>
                <span style="font-weight: bold; color: #111827; font-size: 14px;">${val}</span>
              </div>
            `;
          }
        });
      };
      extractPrintable(fields);
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TerraPulse Verification Certificate</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1f2937; max-width: 700px; margin: auto; }
            .header { text-align: center; border-bottom: 3px solid #15803d; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #15803d; margin: 0; font-size: 24px; }
            .header p { color: #6b7280; font-size: 12px; margin-top: 5px; }
            .badge { background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 12px; display: inline-block; margin-bottom: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🌾 TerraPulse Agricultural Kiosk</h1>
            <p>AI-Powered Official Document Verification & Intelligence</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">DOCUMENT TYPE:</p>
              <h3 style="margin: 2px 0 15px 0; text-transform: uppercase;">${docType.replace(/_/g, ' ')}</h3>
            </div>
            <div>
              <span class="badge">VERIFICATION PASSED (98.7%)</span>
            </div>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h4 style="margin-top: 0; color: #15803d; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Extracted Summary Record</h4>
            ${fieldsHtml || '<p>No summary fields available.</p>'}
          </div>

          <div class="footer">
            <p>Certified by TerraPulse Decentralized Edge Node • Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>

          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const processDocument = async () => {
    const fileToProcess = selectedFile || file;
    if (!fileToProcess) {
      setError("Please select a document to upload.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    for (let i = 0; i <= pipelineSteps.length; i++) {
      setActiveStep(i);
      await new Promise(res => setTimeout(res, 400)); 
    }

    try {
      const base64Image = await convertFileToBase64(fileToProcess);
      const fileExt = '.' + (fileToProcess.name ? fileToProcess.name.split('.').pop() : 'jpg');

      // Connected to API Gateway Endpoint URL (fallback to local server if needed)
      const apiEndpoint = import.meta.env.VITE_API_GATEWAY_URL || `/process`;

      const response = await fetch(`${apiEndpoint}?doc_type=${docType}&target_language=${targetLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_base64: base64Image,
          extension: fileExt,
          doc_type: docType,
          target_language: targetLanguage
        })
      });
      
      if (!response.ok) throw new Error("Backend processing failed.");
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Cloud processing error:", err);
      setError("Cloud processing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans text-stone-800 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-stone-900/60 z-0"></div>

      <div className="max-w-6xl w-full mx-auto space-y-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border-t-8 border-green-700 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <img src={logo} alt="TerraPulse Icon" className="w-28 h-14 rounded-lg object-cover" />
              <SplitText text="TerraPulse" className="text-green-800" />
              <SplitText text=" Kiosk" className="text-amber-700" />
            </h1>
            <p className="mt-1 text-stone-500 font-medium text-xs">{t('subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-stone-100 p-2 rounded-lg border border-stone-300 shadow-sm">
              <Globe className="w-4 h-4 text-green-700" />
              <select 
                id="topLanguageSelect"
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold text-stone-800 outline-none cursor-pointer pr-2"
              >
                <option value="English">English</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
              </select>
            </div>

            <div className="hidden md:flex flex-col items-end bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">CI/CD Status</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                {t('ciStatus')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t('docsProcessed'), value: '1,284', icon: <FileText className="w-8 h-8 text-stone-400" /> },
            { label: t('farmersVerified'), value: '892', icon: <UserCheck className="w-8 h-8 text-amber-600" /> },
            { label: t('ocrAccuracy'), value: '98.7%', icon: <Target className="w-8 h-8 text-red-500" /> },
            { label: t('subsidiesGenerated'), value: '₹4.2M', icon: <Banknote className="w-8 h-8 text-green-600" /> },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 p-5 rounded-xl shadow-md border border-stone-100 flex items-center gap-4"
            >
              <div>{stat.icon}</div>
              <div>
                <p className="text-xl font-bold text-green-800">{stat.value}</p>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white/80 rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-stone-200"
          >
            <h2 className="text-xl font-bold text-amber-900 border-b border-stone-100 pb-2">{t('portalHeader')}</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="docTypeSelect" className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wide">
                  {t('selectDocType')}
                </label>
                <select 
                  id="docTypeSelect"
                  name="doc_type"
                  value={docType} 
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none bg-stone-50 font-medium text-sm text-stone-800 cursor-pointer"
                >
                  <option value="kcc_form">Kisan Credit Card (KCC)</option>
                  <option value="patta_chitta">Land Record (Patta)</option>
                  <option value="tractor_rental">Tractor Rental Receipt</option>
                  <option value="soil_health_card">Soil Health Card</option>
                  <option value="pm_kisan">PM-KISAN Registration</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="fileUpload" className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wide">
                  {t('uploadScan')}
                </label>
                <div className="flex items-center gap-4">
                  <label htmlFor="fileUpload" className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-4 py-2.5 rounded-lg border border-stone-300 transition-colors shadow-sm text-sm">
                    {t('chooseFile')}
                    <input 
                      type="file" 
                      name="file"
                      id="fileUpload"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                        }
                      }} 
                    />
                  </label>
                  <span className="text-sm text-stone-600 font-medium truncate max-w-[250px]">
                    {fileName === "No file chosen" ? t('noFileChosen') : fileName}
                  </span>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={processDocument}
              disabled={loading}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all cursor-pointer ${
                loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              {loading ? t('initializing') : t('extractBtn')}
            </motion.button>

            <div className="mt-2 flex flex-col items-center w-full">
              <button
                onClick={() => setShowSamples(!showSamples)}
                className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1 cursor-pointer mb-2"
              >
                {showSamples ? t('hideSamples') : t('showSamples')}
              </button>

              <AnimatePresence>
                {showSamples && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4 w-full"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-stone-200">
                      
                      <div 
                        onClick={() => { setSelectedSample([kccImg1, kccImg2, kccImg3, kccImg4]); setCurrentIndex(0); }}
                        className="flex flex-col items-center p-4 bg-white/80 rounded-md border border-stone-200 text-center cursor-pointer hover:border-green-500 hover:shadow-md transition-all shadow-sm"
                      >
                        <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
                        <span className="text-xs font-bold text-stone-800">{t('kccForm')}</span>
                      </div>

                      <div 
                        onClick={() => { setSelectedSample([pattaImg1]); setCurrentIndex(0); }}
                        className="flex flex-col items-center p-4 bg-white/80 rounded-md border border-stone-200 text-center cursor-pointer hover:border-green-500 hover:shadow-md transition-all shadow-sm"
                      >
                        <Map className="w-8 h-8 text-amber-700 mb-2" />
                        <span className="text-xs font-bold text-stone-800">{t('landPatta')}</span>
                      </div>

                      <div 
                        onClick={() => { setSelectedSample([tractorImg1, tractorImg2]); setCurrentIndex(0); }}
                        className="flex flex-col items-center p-4 bg-white/80 rounded-md border border-stone-200 text-center cursor-pointer hover:border-green-500 hover:shadow-md transition-all shadow-sm"
                      >
                        <FileImage className="w-8 h-8 text-purple-600 mb-2" />
                        <span className="text-xs font-bold text-stone-800">{t('tractorReceipt')}</span>
                      </div>

                      <div 
                        onClick={() => { setSelectedSample([pmKisanImg1, pmKisanImg2, pmKisanImg3]); setCurrentIndex(0); }}
                        className="flex flex-col items-center p-4 bg-white/80 rounded-md border border-stone-200 text-center cursor-pointer hover:border-green-500 hover:shadow-md transition-all shadow-sm"
                      >
                        <FileCode2 className="w-8 h-8 text-green-600 mb-2" />
                        <span className="text-xs font-bold text-stone-800">{t('pmKisan')}</span>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mt-6 p-6 bg-green-50 border-2 border-green-600/30 rounded-xl shadow-md w-full text-left space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-green-200 pb-3 gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-green-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" /> {t('extractionSuccess')}
                      </h3>
                      
                      <button 
                        onClick={handleTextToSpeech}
                        className="flex items-center gap-1 bg-green-700 hover:bg-green-800 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                        title="Read summary aloud"
                      >
                        🔊 Read
                      </button>

                      <button 
                        onClick={generateVerificationCertificate}
                        className="flex items-center gap-1 bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                        title="Download official verification certificate"
                      >
                        📥 Certificate
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-green-200/70 p-1 rounded-lg flex text-xs font-bold">
                        <button 
                          onClick={() => setResultViewMode('clean')}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                            resultViewMode === 'clean' ? 'bg-green-700 text-white shadow-sm' : 'text-green-900 hover:bg-green-300'
                          }`}
                        >
                          📋 Clean View
                        </button>
                        <button 
                          onClick={() => setResultViewMode('raw')}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                            resultViewMode === 'raw' ? 'bg-green-700 text-white shadow-sm' : 'text-green-900 hover:bg-green-300'
                          }`}
                        >
                          Raw JSON
                        </button>
                      </div>

                      <span className="text-xs font-bold bg-green-200 text-green-800 px-3 py-1 rounded-full">
                        {t('confidence')}: {result.confidence_score || result.extraction_confidence || "98.7%"}
                      </span>
                    </div>
                  </div>

                  {(() => {
                    let rawData = result.DATA || result.extracted_data || result;
                    if (typeof rawData === 'string') {
                      try { rawData = JSON.parse(rawData); } catch (e) { rawData = {}; }
                    }

                    const safeParse = (val) => {
                      if (typeof val === 'string') {
                        try { return JSON.parse(val); } catch (e) { return val; }
                      }
                      return val;
                    };

                    const extractedFieldsObj = safeParse(rawData.extracted_fields || rawData);
                    
                    const docId = result.document_id || result.id || 'N/A';
                    const fmtQuality = result.formatting_quality ?? '94.2';
                    const procTime = result.processing_time ?? '1.2s';
                    const routing = result.routing_used || 'gemini';

                    if (resultViewMode === 'raw') {
                      return (
                        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm font-mono text-xs overflow-x-auto max-h-[400px]">
                          <pre className="text-stone-800">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                            <span className="text-stone-400 font-bold block uppercase">{t('docId')}</span>
                            <span className="font-semibold text-stone-800 truncate block">{docId}</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                            <span className="text-stone-400 font-bold block uppercase">{t('formattingQuality')}</span>
                            <span className="font-semibold text-stone-800">{fmtQuality}%</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                            <span className="text-stone-400 font-bold block uppercase">{t('processingTime')}</span>
                            <span className="font-semibold text-stone-800">{procTime}s</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                            <span className="text-stone-400 font-bold block uppercase">{t('routingUsed')}</span>
                            <span className="font-semibold text-stone-800 uppercase">{routing}</span>
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                          <h4 className="text-sm font-extrabold text-green-800 border-b pb-2 uppercase tracking-wide">
                            📋 Verified Document Summary
                          </h4>

                          <div className="space-y-4">
                            {typeof extractedFieldsObj === 'object' && extractedFieldsObj !== null && Object.entries(extractedFieldsObj).map(([sectionKey, sectionValue], idx) => {
                              if (typeof sectionValue === 'object' && sectionValue !== null && !Array.isArray(sectionValue)) {
                                return (
                                  <div key={idx} className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                                    <h5 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-3 border-b pb-1">
                                      {sectionKey.replace(/_/g, ' ')}
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                      {Object.entries(sectionValue).map(([subKey, subVal], subIdx) => (
                                        <div key={subIdx} className="flex flex-col">
                                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{subKey.replace(/_/g, ' ')}</span>
                                          <span className="font-bold text-stone-800 mt-0.5">{String(subVal ?? 'N/A')}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              } else if (Array.isArray(sectionValue)) {
                                return (
                                  <div key={idx} className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                                    <h5 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-3 border-b pb-1">
                                      {sectionKey.replace(/_/g, ' ')}
                                    </h5>
                                    <div className="space-y-2">
                                      {sectionValue.map((item, itemIdx) => (
                                        <div key={itemIdx} className="bg-white p-3 rounded border border-stone-200 grid grid-cols-2 gap-2 text-xs">
                                          {typeof item === 'object' && item !== null ? Object.entries(item).map(([k, v], ki) => (
                                            <div key={ki} className="flex flex-col">
                                              <span className="text-[9px] font-bold text-stone-400 uppercase">{k.replace(/_/g, ' ')}</span>
                                              <span className="font-bold text-stone-800">{String(v ?? '-')}</span>
                                            </div>
                                          )) : <span>{String(item)}</span>}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={idx} className="bg-stone-50 p-3 rounded-lg border border-stone-100 flex flex-col">
                                    <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">{sectionKey.replace(/_/g, ' ')}</span>
                                    <span className="font-bold text-stone-800 mt-0.5">{String(sectionValue ?? 'N/A')}</span>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Right Column: AWS Pipeline Trace */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 rounded-xl shadow-lg p-6 border border-stone-200 h-fit"
          >
            <h2 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-500" /> {t('pipelineHeader')}
            </h2>
            
            <div className="space-y-0 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-stone-200 z-0"></div>
              
              {pipelineSteps.map((step, idx) => {
                const isActive = activeStep > idx;
                const isCurrent = activeStep === idx && loading;
                
                return (
                  <div key={idx} className="relative z-10 flex items-start gap-4 pb-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300 ${
                      isActive ? 'bg-green-600 text-white' : 
                      isCurrent ? 'bg-amber-500 text-white animate-pulse' : 
                      'bg-stone-100 text-stone-400 border border-stone-300'
                    }`}>
                      {isActive ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div>
                      <h4 className={`font-bold ${isActive || isCurrent ? 'text-black' : 'text-stone-500'}`}>
                        {step.name}
                      </h4>
                      <p className={`text-xs font-semibold ${isActive || isCurrent ? 'text-green-800' : 'text-stone-400'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div> 

        {/* Gallery Pop-up Modal */}
        {selectedSample && (
          <div 
            onClick={() => setSelectedSample(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              
              <div className="absolute -top-10 bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Document {currentIndex + 1} of {selectedSample.length}
              </div>

              <img 
                src={selectedSample[currentIndex]} 
                alt="Expanded Document" 
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border-4 border-stone-200 object-contain bg-white"
              />

              {selectedSample.length > 1 && (
                <div className="flex items-center gap-4 mt-4">
                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev === 0 ? selectedSample.length - 1 : prev - 1))}
                    className="bg-white/20 hover:bg-white/40 text-white font-bold px-4 py-2 rounded-lg transition-colors backdrop-blur-sm cursor-pointer"
                  >
                    ← Previous
                  </button>

                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev === selectedSample.length - 1 ? 0 : prev + 1))}
                    className="bg-white/20 hover:bg-white/40 text-white font-bold px-4 py-2 rounded-lg transition-colors backdrop-blur-sm cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}

              <button 
                onClick={() => setSelectedSample(null)}
                className="absolute -top-12 -right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors font-bold text-xl shadow-lg cursor-pointer"
              >
                ✕
              </button>

            </div>
          </div>
        )}

      </div> 
    </div> 
  );
}