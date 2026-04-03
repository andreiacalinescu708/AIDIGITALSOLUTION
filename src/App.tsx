import { useState, useEffect, useRef } from 'react'
import { 
  Bot, 
  FileText, 
  Users, 
  Mail, 
  FolderKanban, 
  UserPlus, 
  Package, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Ticket, 
  Share2, 
  FileSignature, 
  UserCheck, 
  Bell,
  ChevronDown,
  ChevronUp,

  Menu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  TrendingUp,
  Clock,
  Euro,
  Search,
  Code,
  Rocket,

  Smartphone,

  Send,
  X,
  MessageCircle,



} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import './App.css'

// Translation types
type Language = 'ro' | 'en'

interface Translations {
  [key: string]: {
    ro: string
    en: string
  }
}

const translations: Translations = {
  // Navigation
  nav_services: { ro: 'Servicii', en: 'Services' },
  nav_how: { ro: 'Cum Funcționează', en: 'How It Works' },
  nav_contact: { ro: 'Contact', en: 'Contact' },
  nav_faq: { ro: 'FAQ', en: 'FAQ' },
  
  // Hero
  hero_title: { 
    ro: 'Economisește 3 ore pe zi. Automatizare facturi OCR pentru contabili.', 
    en: 'Automated Invoice OCR for Accountants. Save 3 hours daily.' 
  },
  hero_subtitle: { 
    ro: 'Procesează automat 500+ facturi/lună. Validare CIF prin ANAF + integrare SAGA/WizCount/CIEL. Demo live în 15 minute.', 
    en: 'Automatically process 500+ invoices/month. CIF validation via ANAF + SAGA/WizCount/CIEL integration. 15-min live demo.' 
  },
  hero_cta: { ro: 'Vreau Demo Live', en: 'Book Live Demo' },
  hero_cta2: { ro: 'Calculator Economii', en: 'Savings Calculator' },
  hero_badge: { ro: 'Soluții AI pentru contabili', en: 'AI Solutions for Accountants' },
  hero_stats_1: { ro: 'Facturi procesate', en: 'Invoices processed' },
  hero_stats_2: { ro: 'Ore economisite/zi', en: 'Hours saved daily' },
  hero_stats_3: { ro: 'Contabili mulțumiți', en: 'Happy accountants' },
  
  // Calculator Section
  calc_title: { ro: 'Calculator de Economii', en: 'Savings Calculator' },
  calc_subtitle: { 
    ro: 'Descoperă cât poți economisi cu automatizările noastre', 
    en: 'Discover how much you can save with our automations' 
  },
  calc_employees: { ro: 'Facturi procesate lunar', en: 'Invoices processed monthly' },
  calc_hours: { ro: 'Ore repetitive/săptămână', en: 'Repetitive hours/week' },
  calc_hourly: { ro: 'Cost oră (EUR)', en: 'Hourly cost (EUR)' },
  calc_result_title: { ro: 'Economii Anuale Estimate', en: 'Estimated Annual Savings' },
  calc_result_hours: { ro: 'Ore economisite/an', en: 'Hours saved/year' },
  calc_result_money: { ro: 'Economii financiare', en: 'Financial savings' },
  calc_cta: { ro: 'Solicită Ofertă Personalizată', en: 'Request Custom Quote' },
  
  // How It Works
  how_title: { ro: 'Cum Funcționează', en: 'How It Works' },
  how_subtitle: { 
    ro: 'Patru pași simpli pentru a transforma afacerea ta', 
    en: 'Four simple steps to transform your business' 
  },
  how_step1_title: { ro: '1. Analiză', en: '1. Analysis' },
  how_step1_desc: { 
    ro: 'Identificăm procesele repetitive și oportunitățile de automatizare din afacerea ta.', 
    en: 'We identify repetitive processes and automation opportunities in your business.' 
  },
  how_step2_title: { ro: '2. Dezvoltare', en: '2. Development' },
  how_step2_desc: { 
    ro: 'Construim soluția personalizată folosind cele mai noi tehnologii AI.', 
    en: 'We build the custom solution using the latest AI technologies.' 
  },
  how_step3_title: { ro: '3. Implementare', en: '3. Implementation' },
  how_step3_desc: { 
    ro: 'Integrăm soluția în sistemele tale existente și oferim training.', 
    en: 'We integrate the solution into your existing systems and provide training.' 
  },
  how_step4_title: { ro: '4. Rezultate', en: '4. Results' },
  how_step4_desc: { 
    ro: 'Vezi economiile de timp și bani în timp real.', 
    en: 'See time and money savings in real-time.' 
  },
  
  // Services Section
  services_title: { ro: 'Soluții Pentru Contabili', en: 'Solutions For Accountants' },
  services_subtitle: { 
    ro: 'Automatizare facturi OCR + validare ANAF + integrare SAGA. Economisește 3 ore pe zi și elimină 100% erorile de introducere.',
    en: 'Invoice OCR automation + ANAF validation + SAGA integration. Save 3 hours daily and eliminate 100% data entry errors.' 
  },
  services_click_info: { 
    ro: 'Click pe orice soluție pentru a vedea detaliile', 
    en: 'Click on any solution to see details' 
  },
  
  // FAQ
  faq_title: { ro: 'Întrebări Frecvente', en: 'Frequently Asked Questions' },
  faq_subtitle: { 
    ro: 'Răspunsuri la cele mai comune întrebări', 
    en: 'Answers to the most common questions' 
  },
  
  // Contact Section
  contact_title: { ro: 'Contactează-ne', en: 'Contact Us' },
  contact_subtitle: { 
    ro: 'Gata să transformi afacerea? Hai să discutăm despre soluțiile tale personalizate.', 
    en: 'Ready to transform your business? Let\'s discuss your custom solutions.' 
  },
  contact_whatsapp: { ro: 'WhatsApp', en: 'WhatsApp' },
  contact_email: { ro: 'Email', en: 'Email' },
  contact_hours: { ro: 'Program', en: 'Hours' },
  contact_hours_value: { ro: 'Luni - Vineri: 09:00 - 18:00', en: 'Monday - Friday: 09:00 - 18:00' },
  contact_form_name: { ro: 'Numele tău', en: 'Your name' },
  contact_form_email: { ro: 'Email', en: 'Email' },
  contact_form_phone: { ro: 'Telefon', en: 'Phone' },
  contact_form_company: { ro: 'Numele companiei', en: 'Company name' },
  contact_form_message: { ro: 'Mesajul tău', en: 'Your message' },
  contact_form_submit: { ro: 'Trimite Mesajul', en: 'Send Message' },
  contact_form_success: { ro: 'Mesaj trimis cu succes!', en: 'Message sent successfully!' },
  contact_cta: { ro: 'Solicită Ofertă', en: 'Request Quote' },
  
  // Cookie Consent
  cookie_text: { 
    ro: 'Folosim cookie-uri pentru a îmbunătăți experiența ta. Continuând, ești de acord cu politica noastră.', 
    en: 'We use cookies to improve your experience. By continuing, you agree to our policy.' 
  },
  cookie_accept: { ro: 'Accept', en: 'Accept' },
  cookie_learn: { ro: 'Află mai multe', en: 'Learn more' },
  
  // Chat
  chat_title: { ro: 'Asistent AI', en: 'AI Assistant' },
  chat_placeholder: { ro: 'Scrie un mesaj...', en: 'Type a message...' },
  chat_welcome: { 
    ro: 'Bună! Sunt asistentul AI Digital Solutions. Cu ce te pot ajuta?', 
    en: 'Hello! I am the AI Digital Solutions assistant. How can I help you?' 
  },
  
  // Footer
  footer_rights: { ro: 'Toate drepturile rezervate.', en: 'All rights reserved.' },
  footer_tagline: { 
    ro: 'Transformăm afaceri prin inteligență artificială', 
    en: 'Transforming businesses through artificial intelligence' 
  },
  footer_powered: { 
    ro: 'Powered by AI Digital Solutions', 
    en: 'Powered by AI Digital Solutions' 
  },
  footer_openbill: {
    ro: 'www.openbill.ro - Platformă de facturare dezvoltată de AI Digital Solutions',
    en: 'www.openbill.ro - Invoicing platform developed by AI Digital Solutions'
  },
  footer_privacy: { ro: 'Politica de Confidențialitate', en: 'Privacy Policy' },
  footer_terms: { ro: 'Termeni și Condiții', en: 'Terms and Conditions' },
  
  // Modal
  modal_benefits: { ro: 'Beneficii', en: 'Benefits' },
  modal_features: { ro: 'Funcționalități', en: 'Features' },
  modal_price: { ro: 'Preț orientativ', en: 'Estimated price' },
  modal_contact: { ro: 'Contactează-ne pentru detalii', en: 'Contact us for details' },
}

// Services Data
interface Service {
  id: string
  icon: JSX.Element
  title: { ro: string; en: string }
  shortDesc: { ro: string; en: string }
  fullDesc: { ro: string; en: string }
  features: { ro: string[]; en: string[] }
  benefits: { ro: string[]; en: string[] }
  price: { ro: string; en: string }
}

const services: Service[] = [
  {
    id: 'ocr-invoices',
    icon: <FileText className="w-8 h-8" />,
    title: { 
      ro: 'Procesare Facturi OCR', 
      en: 'Invoice OCR Processing' 
    },
    shortDesc: { 
      ro: 'Extrage automat date din facturi în 3 secunde cu 99% acuratețe', 
      en: 'Automatically extract invoice data in 3 seconds with 99% accuracy' 
    },
    fullDesc: { 
      ro: 'Sistem care procesează automat facturi PDF, scanate sau foto folosind OCR avansat. Extrage CIF, serie factură, dată, valoare, TVA și linii de produse. Se integrează direct cu SAGA, WizCount și CIEL pentru import automat fără introducere manuală.',
      en: 'System that automatically processes PDF, scanned or photo invoices using advanced OCR. Extracts CIF, invoice series, date, value, VAT and product lines. Integrates directly with SAGA, WizCount and CIEL for automatic import without manual entry.'
    },
    features: {
      ro: ['OCR avansat 99% acuratețe', 'Suport facturi PDF/foto', 'Extragere automată CIF + TVA', 'Validare date ANAF în timp real', 'Arhivare digitală 10 ani'],
      en: ['Advanced OCR 99% accuracy', 'Support PDF/photo invoices', 'Automatic CIF + VAT extraction', 'Real-time ANAF data validation', 'Digital archiving 10 years']
    },
    benefits: {
      ro: ['Economisire 15+ ore/săptămână', 'Eliminare 100% erori umane', 'Procesare 500+ facturi/lună'],
      en: ['Save 15+ hours/week', 'Eliminate 100% human errors', 'Process 500+ invoices/month']
    },
    price: { ro: 'începând de la 300 EUR', en: 'starting from 300 EUR' }
  {
    id: 'anaf-validation',
    icon: <UserCheck className="w-8 h-8" />,
    title: { 
      ro: 'Validare CIF ANAF', 
      en: 'ANAF CIF Validation' 
    },
    shortDesc: { 
      ro: 'Verificare automată CIF în baza de date ANAF și alerte TVA la plată', 
      en: 'Automatic CIF verification in ANAF database and VAT payment alerts' 
    },
    fullDesc: { 
      ro: 'Validare automată a CIF-urilor din facturi prin conexiune directă cu API-ul ANAF. Verifică dacă firma este înregistrată în scopuri de TVA, identifică firme cu risc și trimite alerte automate pentru TVA la plată sau de recuperat.',
      en: 'Automatic validation of CIFs from invoices through direct connection with ANAF API. Verifies if the company is VAT registered, identifies high-risk companies and sends automatic alerts for VAT to be paid or recovered.'
    },
    features: {
      ro: ['Conexiune directă ANAF API', 'Verificare TVA în timp real', 'Alerte TVA plată/recuperare', 'Lista firme cu risc', 'Export rapoarte D394-ready'],
      en: ['Direct ANAF API connection', 'Real-time VAT verification', 'VAT payment/recovery alerts', 'High-risk company list', 'D394-ready report export']
    },
    benefits: {
      ro: ['Conformitate ANAF 100%', 'Evitare amenzi și penalități', 'Identificare riscuri în avans'],
      en: ['100% ANAF compliance', 'Avoid fines and penalties', 'Identify risks in advance']
    },
    price: { ro: 'începând de la 150 EUR', en: 'starting from 150 EUR' }
  },
  {
    id: 'saga-sync',
    icon: <Users className="w-8 h-8" />,
    title: { 
      ro: 'Sincronizare SAGA/WizCount/CIEL', 
      en: 'SAGA/WizCount/CIEL Sync' 
    },
    shortDesc: { 
      ro: 'Import automat facturi în soft-ul de contabilitate fără intervenție manuală', 
      en: 'Automatic invoice import into accounting software without manual intervention' 
    },
    fullDesc: { 
      ro: 'Conector direct între sistemul nostru OCR și soft-urile de contabilitate populare (SAGA, WizCount, CIEL). Facturile procesate sunt importate automat în nomenclatoare, jurnale de cumpărări și stocuri cu 0 introducere manuală.',
      en: 'Direct connector between our OCR system and popular accounting software (SAGA, WizCount, CIEL). Processed invoices are automatically imported into catalogs, purchase journals and stock with 0 manual entry.'
    },
    features: {
      ro: ['Conector SAGA direct', 'Import automat furnizori', 'Import jurnal cumpărări', 'Actualizare stocuri', 'Suport WizCount și CIEL'],
      en: ['Direct SAGA connector', 'Auto supplier import', 'Purchase journal import', 'Stock updates', 'WizCount and CIEL support']
    },
    benefits: {
      ro: ['Eliminare 100% erori de import', 'Actualizare în timp real', 'Funcționează cu soft-ul existent'],
      en: ['Eliminate 100% import errors', 'Real-time updates', 'Works with existing software']
    },
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
  },
  {
    id: 'caen-classification',
    icon: <FolderKanban className="w-8 h-8" />,
    title: { 
      ro: 'Clasificare Cheltuieli CAEN', 
      en: 'CAEN Expense Classification' 
    },
    shortDesc: { 
      ro: 'Clasificare automată a cheltuielilor pe coduri CAEN și analiză deductibilitate', 
      en: 'Automatic classification of expenses by CAEN codes and deductibility analysis' 
    },
    fullDesc: { 
      ro: 'Sistem care citește fiecare linie din facturi și clasifică automat cheltuielile pe coduri CAEN corecte. Analizează deductibilitatea TVA și a cheltuielilor, și generează rapoarte pentru declarații fiscale.',
      en: 'System that reads every line from invoices and automatically classifies expenses into correct CAEN codes. Analyzes VAT and expense deductibility, and generates reports for tax declarations.'
    },
    features: {
      ro: ['AI clasificare cheltuieli', 'Bază date CAEN completă', 'Analiză deductibilitate TVA', 'Rapoarte fiscale ready', 'Reguli personalizabile'],
      en: ['AI expense classification', 'Complete CAEN database', 'VAT deductibility analysis', 'Tax-ready reports', 'Customizable rules']
    },
    benefits: {
      ro: ['Conformitate fiscală maximă', 'Economisire 5+ ore/săptămână', 'Zero erori de clasificare'],
      en: ['Maximum tax compliance', 'Save 5+ hours/week', 'Zero classification errors']
    },
    price: { ro: 'începând de la 250 EUR', en: 'starting from 250 EUR' }
  },
  {
    id: 'legal-archive',
    icon: <Bot className="w-8 h-8" />,
    title: { 
      ro: 'Arhivare Digitală Legală', 
      en: 'Legal Digital Archiving' 
    },
    shortDesc: { 
      ro: 'Arhivare facturi conform Legea 135/2023 cu semnătură și timestamp digital', 
      en: 'Invoice archiving according to Law 135/2023 with digital signature and timestamp' 
    },
    fullDesc: { 
      ro: 'Soluție completă de arhivare digitală conform legislației românești. Fiecare factură este stocată cu semnătură electronică, timestamp întărit și hash criptografic. Acces rapid la orice document în 3 secunde, eliminând nevoia arhivei fizice.',
      en: 'Complete digital archiving solution according to Romanian legislation. Each invoice is stored with electronic signature, reinforced timestamp and cryptographic hash. Fast access to any document in 3 seconds, eliminating the need for physical archives.'
    },
    features: {
      ro: ['Semnătură digitală legală', 'Timestamp întărit', 'Criptare AES-256', 'Acces rapid documente', 'Audit trail complet'],
      en: ['Legal digital signature', 'Reinforced timestamp', 'AES-256 encryption', 'Fast document access', 'Complete audit trail']
    },
    benefits: {
      ro: ['Conformitate Legea 135/2023', 'Reducere spațiu cu 90%', 'Acces instant orice factură'],
      en: ['Law 135/2023 compliance', '90% space reduction', 'Instant access to any invoice']
    },
    price: { ro: 'începând de la 180 EUR', en: 'starting from 180 EUR' }
  }
]

// FAQ Data
const faqData = {
  ro: [
    {
      question: 'Cât durează implementarea unei soluții?',
      answer: 'Durata implementării variază în funcție de complexitatea proiectului. O soluție simplă (ex: chatbot) poate fi gata în 1-2 săptămâni, în timp ce un sistem complex (ex: CRM complet) poate dura 1-2 luni. Oferim un timeline detaliat în oferta personalizată.'
    },
    {
      question: 'Se integrează cu sistemele existente?',
      answer: 'Da, soluțiile noastre se integrează cu majoritatea sistemelor populare: QuickBooks, Xero, Salesforce, HubSpot, Shopify, WooCommerce, Slack, Microsoft Teams, Google Workspace și multe altele. Dacă aveți un sistem custom, putem dezvolta integrări specifice.'
    },
    {
      question: 'Ce se întâmplă dacă ceva nu funcționează?',
      answer: 'Oferim garanție de 30 de zile pentru remedierea oricăror erori. După această perioadă, avem pachete de suport și mentenanță care includ monitorizare 24/7, rezolvare incidente și actualizări. Suntem disponibili telefonic și pe email pentru urgențe.'
    },
    {
      question: 'Cât costă mentenanța?',
      answer: 'Mentenanța costă între 15-25% din valoarea proiectului anual, în funcție de complexitate. Acest pachet include: monitorizare, backup-uri, actualizări de securitate, suport tehnic și mici îmbunătățiri. Oferim și suport pay-as-you-go pentru nevoile ocazionale.'
    },
    {
      question: 'Datele mele sunt în siguranță?',
      answer: 'Absolut. Folosim criptare SSL/TLS, stocare securizată în cloud (AWS, Azure sau Google Cloud), și respectăm complet GDPR. Toate datele sunt backup-ate zilnic și puteți solicita ștergerea completă a datelor oricând. Semnăm și NDA la cerere.'
    },
    {
      question: 'Oferiți training pentru angajați?',
      answer: 'Da, fiecare proiect include sesiuni de training pentru echipa dumneavoastră. Oferim: documentație completă, video tutoriale, sesiuni live de training și suport post-implementare. Ne asigurăm că toată lumea se simte confortabil cu noua soluție.'
    },
    {
      question: 'Ce se întâmplă după ce plătesc?',
      answer: 'După plată, începem cu o sesiune de discovery pentru a înțelege perfect nevoile dumneavoastră. Apoi, creăm un plan detaliat, dezvoltăm soluția, o testăm împreună și apoi o lansăm. Suntem alături de dumneavoastră în fiecare pas.'
    }
  ],
  en: [
    {
      question: 'How long does implementation take?',
      answer: 'Implementation time varies depending on project complexity. A simple solution (e.g., chatbot) can be ready in 1-2 weeks, while a complex system (e.g., full CRM) may take 1-2 months. We provide a detailed timeline in the personalized offer.'
    },
    {
      question: 'Does it integrate with existing systems?',
      answer: 'Yes, our solutions integrate with most popular systems: QuickBooks, Xero, Salesforce, HubSpot, Shopify, WooCommerce, Slack, Microsoft Teams, Google Workspace and many more. If you have a custom system, we can develop specific integrations.'
    },
    {
      question: 'What happens if something doesn\'t work?',
      answer: 'We offer a 30-day warranty for fixing any errors. After this period, we have support and maintenance packages that include 24/7 monitoring, incident resolution and updates. We are available by phone and email for emergencies.'
    },
    {
      question: 'How much does maintenance cost?',
      answer: 'Maintenance costs between 15-25% of the project value annually, depending on complexity. This package includes: monitoring, backups, security updates, technical support and small improvements. We also offer pay-as-you-go support for occasional needs.'
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. We use SSL/TLS encryption, secure cloud storage (AWS, Azure or Google Cloud), and fully comply with GDPR. All data is backed up daily and you can request complete data deletion at any time. We also sign NDAs upon request.'
    },
    {
      question: 'Do you provide employee training?',
      answer: 'Yes, each project includes training sessions for your team. We offer: complete documentation, video tutorials, live training sessions and post-implementation support. We make sure everyone feels comfortable with the new solution.'
    },
    {
      question: 'What happens after I pay?',
      answer: 'After payment, we start with a discovery session to perfectly understand your needs. Then we create a detailed plan, develop the solution, test it together and then launch it. We are with you every step of the way.'
    }
  ]
}

// Pricing Data

// Visual Savings Calculator Component
function VisualSavingsCalculator({ lang }: { lang: Language }) {
  const [employees, setEmployees] = useState(5)
  const [hoursPerDay, setHoursPerDay] = useState(3)
  const [hourlyRate, setHourlyRate] = useState(15)
  
  const monthlyHours = hoursPerDay * 22 * employees
  const monthlyCost = monthlyHours * hourlyRate
  const yearlySavings = Math.round(monthlyCost * 12 * 0.7)
  const hoursSaved = Math.round(monthlyHours * 0.7)
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-8">
          {/* Employees Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-zinc-300 font-medium">
                {lang === 'ro' ? 'Număr angajați' : 'Number of employees'}
              </Label>
              <span className="text-cyan-400 font-bold text-xl">{employees}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>
          
          {/* Hours Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-zinc-300 font-medium">
                {lang === 'ro' ? 'Ore repetitive/zi' : 'Repetitive hours/day'}
              </Label>
              <span className="text-cyan-400 font-bold text-xl">{hoursPerDay}h</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>
          
          {/* Rate Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-zinc-300 font-medium">
                {lang === 'ro' ? 'Cost oră (EUR)' : 'Hourly rate (EUR)'}
              </Label>
              <span className="text-cyan-400 font-bold text-xl">€{hourlyRate}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>€5</span>
              <span>€100</span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-800/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            {lang === 'ro' ? 'Economii Anuale Estimate' : 'Estimated Annual Savings'}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-zinc-400 text-sm">{lang === 'ro' ? 'Ore economisite/an' : 'Hours saved/year'}</span>
              </div>
              <p className="text-3xl font-bold text-cyan-400">{hoursSaved.toLocaleString()}</p>
            </div>
            
            <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Euro className="w-5 h-5 text-green-400" />
                <span className="text-zinc-400 text-sm">{lang === 'ro' ? 'Economii financiare' : 'Money saved'}</span>
              </div>
              <p className="text-3xl font-bold text-green-400">€{yearlySavings.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-zinc-400 text-sm mb-4">
              {lang === 'ro' 
                ? 'Echivalentul a ☕ ' + Math.round(yearlySavings / 5) + ' cafele sau 🏖️ ' + Math.round(hoursSaved / 160) + ' săptămâni de vacanță'
                : 'Equivalent to ☕ ' + Math.round(yearlySavings / 5) + ' coffees or 🏖️ ' + Math.round(hoursSaved / 160) + ' weeks of vacation'}
            </p>
            <Button 
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {lang === 'ro' ? 'Solicită Ofertă Personalizată' : 'Request Custom Quote'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Section Component
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Chat Widget Component
function ChatWidget({ lang }: { lang: Language }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string; isUser: boolean; loading?: boolean}[]>([
    { text: lang === 'ro' 
      ? 'Bună! Sunt asistentul AI Digital Solutions. Cu ce te pot ajuta?' 
      : 'Hello! I am the AI Digital Solutions assistant. How can I help you?', 
      isUser: false 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Chatbot rule-based îmbunătățit
  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase()
    
    if (lang === 'ro') {
      // Bot Telegram specific
      if (msg.includes('bot telegram') || msg.includes('telegram') || msg.includes('chatbot telegram')) {
        return '🤖 **Chatbot Telegram** - de la 200 EUR\n\nCe face:\n• Răspunde automat la întrebări clienți 24/7\n• Preia comenzi și programări\n• Trimite notificări și reminder-e\n• Se integrează cu CRM-ul tău\n• Transferă conversațiile complexe către tine\n\n💡 **Exemplu**: Un client întreabă "Cât costă produsul X?" → Botul răspunde instant cu prețul și stocul.'
      }
      
      // Prețuri specifice pe serviciu
      if (msg.includes('preț') || msg.includes('cost') || msg.includes('cât costă') || msg.includes('cat costa')) {
        if (msg.includes('website') || msg.includes('site')) {
          return '💻 **Website-uri și Aplicații Android** - de la 100 EUR\n\nInclude:\n• Design modern și responsive\n• Optimizare SEO\n• Panou de administrare\n• Suport tehnic\n\nPentru magazine online sau aplicații complexe, prețul variază în funcție de funcționalități.'
        }
        if (msg.includes('factur') || msg.includes('ocr')) {
          return '📄 **Automatizare Facturi OCR** - de la 200 EUR\n\nCe face:\n• Citește automat facturile scanate\n• Extrage datele (furnizor, sumă, dată)\n• Introduce automat în contabilitate\n• Elimină introducerea manuală\n\n💰 **Economisesti**: 15+ ore pe săptămână'
        }
        if (msg.includes('crm')) {
          return '👥 **CRM Automatizat** - de la 200 EUR\n\nFuncționalități:\n• Captare lead-uri automată\n• Scorare și prioritizare clienți\n• Follow-up automat pe email\n• Rapoarte de vânzări în timp real\n\n📈 Creștere medie: 40% în conversii'
        }
        if (msg.includes('email') || msg.includes('marketing')) {
          return '📧 **Automatizare Email Marketing** - de la 200 EUR\n\nCe include:\n• Setup platformă email (Mailchimp/SendGrid)\n• șabloane email personalizate\n• Automatizări (bun venit, coș abandonat, follow-up)\n• Segmentare liste\n• Raportare și optimizare\n\n💰 Abonament lunar platformă: ~20-50 EUR (depinde de număr contacte)'
        }
        if (msg.includes('chatbot') || msg.includes('telegram') || msg.includes('bot')) {
          return '🤖 **Chatbot Telegram** - de la 200 EUR\n\nCe include:\n• Configurare bot și integrare Telegram\n• Scenarii conversație (până la 20 întrebări/răspunsuri)\n• Integrare cu CRM sau bază de date\n• Notificări pe email când intervine operatorul\n• Training inițial\n\n💡 **Extra**: +50 EUR pentru fiecare 10 scenarii adiționale'
        }
        return '💰 **Prețuri orientative:**\n• Website-uri: de la 100 EUR\n• Chatbot Telegram: de la 200 EUR\n• Automatizare Facturi OCR: de la 200 EUR\n• CRM Automatizat: de la 200 EUR\n• Email Marketing: de la 200 EUR\n• Gestiune Stocuri: de la 200 EUR\n• Aplicații Android: de la 100 EUR\n\nPentru o ofertă exactă, contactează-ne pe WhatsApp: +40 771 123 522'
      }
      
      // Ce face un anumit serviciu
      if (msg.includes('ce face') || msg.includes('cum funcționează') || msg.includes('despre') || msg.includes('funcționalități') || msg.includes('cum merge')) {
        
        // Email Marketing
        if (msg.includes('email') || msg.includes('marketing')) {
          return '📧 **Automatizare Email Marketing** - de la 200 EUR\n\n**Ce face:**\n• Trimite email-uri automat bazate pe acțiunile utilizatorilor\n• Segmentare automată a clienților\n• A/B testing pentru subiecte și conținut\n• Personalizare dinamică (nume, oferte, recomandări)\n• Recuperare coș abandonat automat\n• Raportare detaliată (deschideri, click-uri, conversii)\n\n📈 **Beneficii:**\n• Creștere cu 30-50% a ratei de deschidere\n• Economisire 10+ ore/săptămână\n• Mai mulți clienți fideli\n\n💡 **Exemple:**\n• Client nou → Email de bun venit automat\n• Coș abandonat → Reminder cu reducere după 24h\n• Aniversare → Ofertă specială personalizată'
        }
        
        // Facturi OCR
        if (msg.includes('factur') || msg.includes('ocr')) {
          return '📄 **Automatizare Facturi OCR** - de la 200 EUR\n\n**Cum funcționează:**\n1. Fotografiezi sau încarci factura în sistem\n2. OCR-ul citește automat toate datele\n3. Sistemul extrage: furnizor, sumă, dată, CUI\n4. Datele sunt introduse automat în contabilitate\n5. Primești confirmare și raport\n\n✅ **Beneficii**: Fără erori de introducere, 10x mai rapid, arhivare digitală'
        }
        
        // CRM
        if (msg.includes('crm')) {
          return '👥 **CRM Automatizat** - de la 200 EUR\n\n**Cum funcționează:**\n1. Lead-urile sunt capturate automat (de pe site, Facebook, etc.)\n2. Sistemul scorază lead-urile după șansele de conversie\n3. Trimite automat email-uri de follow-up\n4. Îți arată pipeline-ul de vânzări în timp real\n5. Alertă când un client hotărât trebuie contactat\n\n📈 **Rezultat**: 40% mai multe conversii, 50% timp economisit'
        }
        
        // Website
        if (msg.includes('website') || msg.includes('site')) {
          return '💻 **Website-uri și Aplicații Android** - de la 100 EUR\n\n**Funcționalități disponibile:**\n• Design modern, adaptabil pe mobil/tabletă\n• Optimizare SEO (apari în Google)\n• Panou admin ușor de folosit\n• Formulare de contact și chat live\n• Integrare cu rețele sociale\n• Certificat SSL inclus (siguranță)\n• Găzduire rapidă\n\n**Tipuri de site-uri:**\n• Site de prezentare\n• Magazin online (e-commerce)\n• Landing page\n• Blog\n• Aplicație web complexă\n\n⏱️ **Timp de realizare**: 1-2 săptămâni'
        }
        
        // HR
        if (msg.includes('hr') || msg.includes('recrutare')) {
          return '👔 **Automatizare HR** - de la 200 EUR\n\n**Proces automat:**\n1. Primești CV-uri în sistem\n2. AI-ul scanează și extrage experiența, skill-urile\n3. Compară cu cerințele jobului\n4. Îți arată top 10 candidați potriviți\n5. Programează automat interviuri\n\n⏱️ **Economisesti**: 80% din timpul de recrutare'
        }
        
        // Gestiune stocuri
        if (msg.includes('stoc') || msg.includes('inventar') || msg.includes('depozit')) {
          return '📦 **Gestiune Stocuri Inteligentă** - de la 200 EUR\n\n**Ce face:**\n• Urmărește stocul în timp real\n• Predicție cerere bazată pe istoric\n• Alertă automată când stocul e sub minim\n• Comenzi automate către furnizori\n• Sincronizare între magazine online și fizice\n• Raportare vânzări și tendințe\n\n📈 **Beneficii**: Zero rupturi de stoc, cash flow optimizat'
        }
        
        // Chatbot
        if (msg.includes('chatbot') || msg.includes('bot')) {
          return '🤖 **Chatbot Inteligent** - de la 200 EUR\n\n**Funcționalități:**\n• Răspunde automat 24/7 la întrebări frecvente\n• Preia comenzi și programări\n• Colectează lead-uri și date de contact\n• Integrează cu CRM și baze de date\n• Transferă la operator uman când e necesar\n• Învață din conversații (machine learning)\n\n**Platforme:** Telegram, Facebook Messenger, Website\n\n💰 **ROI**: Reducere 70% din timpul de suport client'
        }
        
        // Social Media
        if (msg.includes('social') || msg.includes('facebook') || msg.includes('instagram')) {
          return '📱 **Automatizare Social Media** - de la 200 EUR\n\n**Ce automatizează:**\n• Postare programată pe multiple platforme\n• Răspuns automat la comentarii comune\n• Monitorizare mențiuni brand\n• Raportare engagement și reach\n• Sugestii conținut viral\n\n📈 Economisești 5-10 ore/săptămână pe management social media'
        }
        
        // Dacă nu găsește serviciu specific
        return '🤔 Nu am înțeles exact despre ce serviciu vrei informații.\n\nTe pot ajuta cu detalii despre:\n• **Chatbot** Telegram (răspuns automat 24/7)\n• **Facturi OCR** (citire automată facturi)\n• **CRM Automatizat** (gestiune clienți)\n• **Email Marketing** (email-uri automate)\n• **Website-uri** (de la 100 EUR)\n• **Gestiune Stocuri** (monitorizare inventar)\n• **Social Media** (postare automată)\n\nDespre care dorești să știi mai multe?'
      }
      
      // Toate serviciile
      if (msg.includes('servicii') || msg.includes('ce oferiți') || msg.includes('lista')) {
        return '🚀 **Serviciile AI Digital Solutions:**\n\n🤖 **Chatbot-uri**\n• Telegram (de la 200 EUR)\n• Website (de la 200 EUR)\n\n📊 **Automatizări Business**\n• Procesare Facturi OCR (de la 200 EUR)\n• CRM Automatizat (de la 200 EUR)\n• Email Marketing automat (de la 200 EUR)\n• Gestiune Stocuri (de la 200 EUR)\n• Raportări Financiare (de la 200 EUR)\n\n👔 **HR & Management**\n• Automatizare HR & Recrutare (de la 200 EUR)\n• Management Proiecte (de la 200 EUR)\n• Programări și Calendar (de la 200 EUR)\n\n💻 **Dezvoltare**\n• Website-uri (de la 100 EUR)\n• Aplicații Android (de la 100 EUR)\n\n📱 **Platforma noastră**: www.openbill.ro (facturare online)'
      }
      
      // Contact
      if (msg.includes('contact') || msg.includes('email') || msg.includes('telefon') || msg.includes('whatsapp')) {
        return '📞 **Contact AI Digital Solutions**\n\n💬 **WhatsApp**: +40 771 123 522 (cel mai rapid)\n📧 **Email**: contact.aidigitals@gmail.com\n🌐 **Website**: www.aidigitalsolutions.ro\n📍 **Program**: Luni-Vineri, 09:00 - 18:00\n\nPlatforma noastră de facturare: www.openbill.ro\n\n💡 **Recomandare**: Pentru o discuție rapidă, scrie-ne pe WhatsApp!'
      }
      
      // OpenBill
      if (msg.includes('openbill') || msg.includes('facturare')) {
        return '📄 **OpenBill.ro** - Platforma noastră de facturare\n\n**Funcționalități:**\n• Emitere facturi electronic\n• Gestiune clienți și produse\n• Rapoarte financiare automate\n• Trimite facturi pe email/WhatsApp\n• Integrare cu contabilitate\n• Acces de oriunde (cloud)\n\n🌐 www.openbill.ro\n\nDezvoltată 100% de AI Digital Solutions.'
      }
      
      // Salut
      if (msg.includes('salut') || msg.includes('buna') || msg.includes('bună') || msg.includes('hei') || msg.includes('ciao')) {
        return 'Bună! 👋 Sunt asistentul AI Digital Solutions.\n\nCu ce te pot ajuta?\n• Informații despre **chatbot Telegram** 🤖\n• Prețuri pentru **website-uri** sau **automatizări** 💰\n• Detalii despre **facturare OCR** 📄\n• Contact rapid pe **WhatsApp** 📞\n\nScrie-mi ce te interesează!'
      }
      
      // Timp realizare
      if (msg.includes('cât durează') || msg.includes('timp') || msg.includes('când e gata')) {
        return '⏱️ **Timp de implementare:**\n\n• Website simple: 1-2 săptămâni\n• Chatbot Telegram: 1-2 săptămâni\n• Automatizare Facturi OCR: 2-3 săptămâni\n• CRM complet: 2-4 săptămâni\n\nTotul depinde de complexitate și cât de repede ne furnizezi informațiile necesare.'
      }
      
      // Default - încearcă să fie mai util
      return 'Înțeleg întrebarea. Pentru informații complete, te pot ajuta cu:\n\n• Detalii despre un anumit serviciu\n• Prețuri personalizate\n• Programare o discuție\n\nSau contactează-ne direct:\n💬 WhatsApp: +40 771 123 522\n📧 Email: contact.aidigitals@gmail.com'
      
    } else {
      // English responses
      if (msg.includes('telegram bot') || msg.includes('telegram') || msg.includes('chatbot')) {
        return '🤖 **Telegram Chatbot** - from 200 EUR\n\nFeatures:\n• Auto-reply to customer questions 24/7\n• Take orders and appointments\n• Send notifications and reminders\n• Integrates with your CRM\n• Escalates complex chats to you\n\n💡 **Example**: A customer asks "How much is product X?" → Bot replies instantly with price and stock.'
      }
      
      if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
        return '💰 **Pricing:**\n• Websites: from 100 EUR\n• Telegram Chatbots: from 200 EUR\n• Invoice OCR Automation: from 200 EUR\n• Automated CRM: from 200 EUR\n• Android Apps: from 100 EUR\n\nFor exact pricing, contact us on WhatsApp: +40 771 123 522'
      }
      
      if (msg.includes('services') || msg.includes('what do you offer')) {
        return '🚀 **AI Digital Solutions Services:**\n\n🤖 **Chatbots**\n• Telegram (from 200 EUR)\n• Website (from 200 EUR)\n\n📊 **Business Automation**\n• Invoice OCR Processing (from 200 EUR)\n• Automated CRM (from 200 EUR)\n• Email Marketing (from 200 EUR)\n• Inventory Management (from 200 EUR)\n\n💻 **Development**\n• Websites (from 100 EUR)\n• Android Apps (from 100 EUR)\n\n🌐 **Our platform**: www.openbill.ro (invoicing)'
      }
      
      if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
        return '📞 **Contact AI Digital Solutions**\n\n💬 WhatsApp: +40 771 123 522 (fastest)\n📧 Email: contact.aidigitals@gmail.com\n🌐 Website: www.aidigitalsolutions.ro\n📍 Hours: Monday-Friday, 09:00 - 18:00\n\n💡 **Tip**: WhatsApp is the quickest way to reach us!'
      }
      
      if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return 'Hello! 👋 I am the AI Digital Solutions assistant.\n\nHow can I help you?\n• Info about **Telegram chatbots** 🤖\n• Pricing for **websites** or **automation** 💰\n• Details about **OCR invoice processing** 📄\n• Quick contact on **WhatsApp** 📞\n\nJust tell me what you need!'
      }
      
      return 'I understand. For more details about our automation solutions, please contact us on WhatsApp at +40 771 123 522 or fill out the contact form on our website.'
    }
  }

  const callKimiAPI = async (conversationHistory: {text: string, isUser: boolean}[]): Promise<string> => {
    try {
      console.log('[Chatbot] Calling server API with', conversationHistory.length, 'messages');
      
      // Apelăm serverul nostru proxy în loc de API-ul Kimi direct
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: conversationHistory
        })
      })
      
      console.log('[Chatbot] Server response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[Chatbot] Server error:', errorData);
        throw new Error(`Server error: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('[Chatbot] Server response received');
      return data.reply
    } catch (error) {
      console.error('[Chatbot] API error:', error)
      // Fallback la rule-based în caz de eroare
      const lastUserMessage = conversationHistory.filter(m => m.isUser).pop()
      return getBotResponse(lastUserMessage?.text || '')
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    
    // Adăugăm mesajul utilizatorului în conversație
    const updatedMessages = [...messages, { text: userMessage, isUser: true }]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    
    // Add loading indicator
    setMessages([...updatedMessages, { text: '...', isUser: false, loading: true }])
    
    // Call Kimi API cu istoricul conversației
    const aiResponse = await callKimiAPI(updatedMessages)
    
    // Remove loading and add real response
    setMessages([...updatedMessages, { text: aiResponse, isUser: false }])
    
    setIsLoading(false)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black p-4 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-44 right-6 z-50 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            style={{ bottom: '100px' }}
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isUser 
                        ? 'bg-cyan-500 text-black rounded-br-md font-medium' 
                        : msg.loading
                          ? 'bg-zinc-800 text-zinc-500 rounded-bl-md italic'
                          : 'bg-zinc-800 text-zinc-300 rounded-bl-md'
                    }`}
                  >
                    {msg.loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-zinc-800 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLoading 
                  ? (lang === 'ro' ? 'Se încarcă...' : 'Loading...') 
                  : (lang === 'ro' ? 'Scrie un mesaj...' : 'Type a message...')
                }
                disabled={isLoading}
                className="flex-1 bg-zinc-800 border-zinc-700 text-white disabled:opacity-50"
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                disabled={isLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-black disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Cookie Consent Component
function CookieConsent({ lang }: { lang: Language }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')
    if (!accepted) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 text-white p-4 z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400 text-center sm:text-left">
          {lang === 'ro' 
            ? 'Folosim cookie-uri pentru a îmbunătăți experiența ta. Continuând, ești de acord cu politica noastră.' 
            : 'We use cookies to improve your experience. By continuing, you agree to our policy.'}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            {lang === 'ro' ? 'Află mai multe' : 'Learn more'}
          </Button>
          <Button size="sm" onClick={accept} className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
            {lang === 'ro' ? 'Accept' : 'Accept'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const [lang, setLang] = useState<Language>('ro')
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = (key: string) => translations[key]?.[lang] || key

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactFormSubmitted(true)
    setTimeout(() => setContactFormSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img src="/assets/logo.png" alt="AI Digital Solutions" className="w-16 h-auto object-contain" />
              <span className="text-xl font-bold text-white">AI Digital Solutions</span>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('services')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_services')}
              </button>
              <button onClick={() => scrollToSection('how')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_how')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_faq')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_contact')}
              </button>
              
              <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                <button
                  onClick={() => setLang('ro')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${lang === 'ro' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  RO
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${lang === 'en' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  EN
                </button>
              </div>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#0a0a0a] border-zinc-800">
                <div className="flex flex-col gap-4 mt-8">
                  <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_services')}
                  </button>
                  <button onClick={() => scrollToSection('how')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_how')}
                  </button>
                  <button onClick={() => scrollToSection('faq')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_faq')}
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_contact')}
                  </button>
                  <Separator className="bg-zinc-800" />
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500">{lang === 'ro' ? 'Limba:' : 'Language:'}</span>
                    <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                      <button
                        onClick={() => setLang('ro')}
                        className={`px-4 py-2 rounded-md font-medium transition-all ${lang === 'ro' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500'}`}
                      >
                        RO
                      </button>
                      <button
                        onClick={() => setLang('en')}
                        className={`px-4 py-2 rounded-md font-medium transition-all ${lang === 'en' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500'}`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#0a0a0a] to-zinc-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
          <motion.div 
            className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-cyan-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero_badge')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              {t('hero_title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
            >
              {t('hero_subtitle')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button 
                size="lg" 
                onClick={() => scrollToSection('visual-calculator')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t('hero_cta')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('examples')}
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 px-8 py-6 text-lg rounded-xl font-semibold"
              >
                {lang === 'ro' ? 'Vezi exemple' : 'See examples'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Life Examples - Storytelling Section */}
      <section id="examples" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {lang === 'ro' ? 'Cum arată o zi cu automatizări' : 'What a day looks like with automation'}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {lang === 'ro' ? 'Povești reale ale clienților noștri - înainte și după implementare' : 'Real stories from our clients - before and after implementation'}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Maria - Contabila */}
            <AnimatedSection>
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
                    <div>
                      <CardTitle className="text-white text-lg">Maria</CardTitle>
                      <p className="text-zinc-500 text-sm">{lang === 'ro' ? 'Contabilă' : 'Accountant'}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
                    <p className="text-red-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'ÎNAINTE:' : 'BEFORE:'}</p>
                    <p className="text-zinc-400 text-sm">
                      {lang === 'ro' 
                        ? 'Petreceam 4 ore zilnic să introduc facturi manual în Excel. Eram stresată și făceam erori.' 
                        : 'I spent 4 hours daily entering invoices manually in Excel. I was stressed and made errors.'}
                    </p>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4">
                    <p className="text-cyan-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'DUPĂ:' : 'AFTER:'}</p>
                    <p className="text-zinc-300 text-sm">
                      {lang === 'ro' 
                        ? 'Sistemul citește automat facturile cu OCR. Eu doar verific. Economisesc 3 ore pe zi.' 
                        : 'The system automatically reads invoices with OCR. I just verify. I save 3 hours daily.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Andrei - Magazin Online */}
            <AnimatedSection>
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
                    <div>
                      <CardTitle className="text-white text-lg">Andrei</CardTitle>
                      <p className="text-zinc-500 text-sm">{lang === 'ro' ? 'Manager Magazin Online' : 'E-commerce Manager'}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
                    <p className="text-red-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'ÎNAINTE:' : 'BEFORE:'}</p>
                    <p className="text-zinc-400 text-sm">
                      {lang === 'ro' 
                        ? 'Răspundeam personal la 50+ mesaje pe zi pe Facebook/WhatsApp. Eram blocat în telefon.' 
                        : 'I personally answered 50+ messages daily on Facebook/WhatsApp. I was glued to my phone.'}
                    </p>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4">
                    <p className="text-cyan-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'DUPĂ:' : 'AFTER:'}</p>
                    <p className="text-zinc-300 text-sm">
                      {lang === 'ro' 
                        ? 'Chatbot-ul răspunde instant la întrebări despre stoc și livrare. Eu mă ocup doar de cazurile complexe.' 
                        : 'Chatbot answers instantly about stock and delivery. I only handle complex cases.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Elena - HR */}
            <AnimatedSection>
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">E</div>
                    <div>
                      <CardTitle className="text-white text-lg">Elena</CardTitle>
                      <p className="text-zinc-500 text-sm">{lang === 'ro' ? 'HR Manager' : 'HR Manager'}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
                    <p className="text-red-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'ÎNAINTE:' : 'BEFORE:'}</p>
                    <p className="text-zinc-400 text-sm">
                      {lang === 'ro' 
                        ? 'Citeam 100 CV-uri manual pentru un post. Dura săptămâni să găsesc candidatul potrivit.' 
                        : 'I read 100 CVs manually for one position. It took weeks to find the right candidate.'}
                    </p>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4">
                    <p className="text-cyan-400 font-semibold text-sm mb-2">{lang === 'ro' ? 'DUPĂ:' : 'AFTER:'}</p>
                    <p className="text-zinc-300 text-sm">
                      {lang === 'ro' 
                        ? 'Sistemul scanează CV-urile și îmi arată top 10 candidați potriviți. Economisesc 80% din timp.' 
                        : 'System scans CVs and shows me top 10 matching candidates. I save 80% of the time.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Visual Savings Calculator Section */}
      <section id="visual-calculator" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {lang === 'ro' ? 'Cât Economisești?' : 'How Much Do You Save?'}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {lang === 'ro' ? 'Mută cursorul și vezi economiile în timp real' : 'Move the slider and see savings in real time'}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <VisualSavingsCalculator lang={lang} />
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('how_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('how_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Search className="w-8 h-8" />, title: t('how_step1_title'), desc: t('how_step1_desc') },
              { icon: <Code className="w-8 h-8" />, title: t('how_step2_title'), desc: t('how_step2_desc') },
              { icon: <Rocket className="w-8 h-8" />, title: t('how_step3_title'), desc: t('how_step3_desc') },
              { icon: <TrendingUp className="w-8 h-8" />, title: t('how_step4_title'), desc: t('how_step4_desc') },
            ].map((step, idx) => (
              <AnimatedSection key={idx}>
                <motion.div 
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center h-full"
                  whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400">{step.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* You vs System Comparison Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {lang === 'ro' ? 'Tu vs Sistemul Automatizat' : 'You vs The Automated System'}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {lang === 'ro' ? 'Comparație clară: ce faci manual vs ce face sistemul' : 'Clear comparison: what you do manually vs what the system does'}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 bg-zinc-800">
                <div className="p-4 text-center border-r border-zinc-700">
                  <p className="text-red-400 font-bold text-lg">{lang === 'ro' ? 'TU faci manual' : 'YOU do manually'}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-cyan-400 font-bold text-lg">{lang === 'ro' ? 'SISTEMUL face automat' : 'SYSTEM does automatically'}</p>
                </div>
              </div>

              {/* Rows */}
              {[
                {
                  manual: lang === 'ro' ? 'Introduci facturi manual în SAGA/CIEL 5h/zi' : 'Manually enter invoices into SAGA/CIEL 5h/day',
                  auto: lang === 'ro' ? 'OCR extrage și importă automat 500 facturi/zi' : 'OCR extracts and auto-imports 500 invoices/day',
                  icon: <FileText className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Verifici manual CIF pe site-ul ANAF' : 'Manually check CIF on ANAF website',
                  auto: lang === 'ro' ? 'Validare automată CIF + alerte TVA în timp real' : 'Auto CIF validation + real-time VAT alerts',
                  icon: <UserCheck className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Clasifici cheltuieli manual pe coduri CAEN' : 'Manually classify expenses by CAEN codes',
                  auto: lang === 'ro' ? 'AI clasifică automat pe CAEN cu 99% acuratețe' : 'AI auto-classifies by CAEN with 99% accuracy',
                  icon: <FolderKanban className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Cauți facturi în arhiva fizică 30+ minute' : 'Search invoices in physical archive 30+ minutes',
                  auto: lang === 'ro' ? 'Acces digital la orice factură în 3 secunde' : 'Digital access to any invoice in 3 seconds',
                  icon: <Search className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Pregătești rapoarte pentru D394 manual' : 'Manually prepare D394 reports',
                  auto: lang === 'ro' ? 'Generează rapoarte D394-ready automat' : 'Auto-generates D394-ready reports',
                  icon: <BarChart3 className="w-5 h-5" />
                }
              ].map((row, idx) => (
                <motion.div 
                  key={idx}
                  className="grid grid-cols-2 border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 border-r border-zinc-700 flex items-center gap-3">
                    <span className="text-red-400">{row.icon}</span>
                    <p className="text-zinc-400">{row.manual}</p>
                  </div>
                  <div className="p-6 flex items-center gap-3">
                    <span className="text-cyan-400">{row.icon}</span>
                    <p className="text-zinc-200 font-medium">{row.auto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('services_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('services_subtitle')}
              </p>
              <p className="text-sm text-zinc-500 mt-4">
                {t('services_click_info')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <AnimatedSection key={service.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 border-2 ${expandedService === service.id ? 'border-cyan-500 shadow-lg shadow-cyan-500/10' : 'border-zinc-800 hover:border-cyan-500/30'} h-full bg-zinc-900`}
                    onClick={() => toggleService(service.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-xl bg-zinc-800 text-cyan-400">
                          {service.icon}
                        </div>
                        {expandedService === service.id ? (
                          <ChevronUp className="w-5 h-5 text-zinc-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-zinc-500" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-semibold text-white mt-4">
                        {service.title[lang]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-400">
                        {service.shortDesc[lang]}
                      </p>
                      
                      <AnimatePresence>
                        {expandedService === service.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-zinc-800 overflow-hidden"
                          >
                            <p className="text-zinc-400 mb-6">
                              {service.fullDesc[lang]}
                            </p>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                {t('modal_features')}
                              </h4>
                              <ul className="space-y-2">
                                {service.features[lang].map((feature, fidx) => (
                                  <li key={fidx} className="text-sm text-zinc-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                {t('modal_benefits')}
                              </h4>
                              <ul className="space-y-2">
                                {service.benefits[lang].map((benefit, bidx) => (
                                  <li key={bidx} className="text-sm text-zinc-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                              <div>
                                <span className="text-sm text-zinc-500">{t('modal_price')}</span>
                                <p className="text-lg font-bold text-cyan-400">{service.price[lang]}</p>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  scrollToSection('contact')
                                }}
                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                              >
                                {t('modal_contact')}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('faq_title')}
              </h2>
              <p className="text-xl text-zinc-400">
                {t('faq_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <Accordion type="single" collapsible className="w-full">
              {faqData[lang].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-zinc-800">
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-cyan-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('contact_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('contact_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card className="text-center bg-zinc-900 border-zinc-800 hover:border-green-500/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <a href="https://wa.me/40771123522" target="_blank" rel="noopener noreferrer">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-green-400 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                        </svg>
                      </div>
                      <CardTitle className="text-lg text-white hover:text-green-400 transition-colors">{t('contact_whatsapp')}</CardTitle>
                    </a>
                  </CardHeader>
                  <CardContent>
                    <a href="https://wa.me/40771123522" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-green-400 hover:text-green-300">
                      +40 771 123 522
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-lg text-white">{t('contact_email')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:contact.aidigitals@gmail.com" className="text-sm font-bold text-cyan-400 hover:text-cyan-300">
                      contact.aidigitals@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-lg text-white">{t('contact_hours')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 text-sm">{t('contact_hours_value')}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">{t('contact_cta')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {contactFormSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-cyan-400">{t('contact_form_success')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-zinc-400">{t('contact_form_name')}</Label>
                          <Input id="name" required className="bg-zinc-800 border-zinc-700 text-white" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-zinc-400">{t('contact_form_email')}</Label>
                          <Input id="email" type="email" required className="bg-zinc-800 border-zinc-700 text-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-zinc-400">{t('contact_form_phone')}</Label>
                          <Input id="phone" type="tel" className="bg-zinc-800 border-zinc-700 text-white" />
                        </div>
                        <div>
                          <Label htmlFor="company" className="text-zinc-400">{t('contact_form_company')}</Label>
                          <Input id="company" className="bg-zinc-800 border-zinc-700 text-white" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-zinc-400">{t('contact_form_message')}</Label>
                        <Textarea id="message" rows={4} required className="bg-zinc-800 border-zinc-700 text-white" />
                      </div>
                      <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
                        <Send className="w-4 h-4 mr-2" />
                        {t('contact_form_submit')}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/logo.png" alt="AI Digital Solutions" className="w-12 h-auto object-contain" />
                <span className="text-lg font-bold">AI Digital Solutions</span>
              </div>
              <p className="text-zinc-400 mb-4">{t('footer_tagline')}</p>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-4">
                <p className="text-cyan-400 font-medium mb-1">{t('footer_powered')}</p>
                <a href="https://www.openbill.ro" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 text-sm">
                  {t('footer_openbill')}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://wa.me/40771123522" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                </a>
                <a href="mailto:contact.aidigitals@gmail.com" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('nav_services')}</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Chatbot Telegram</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Automatizare Facturi</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">CRM Automatizat</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Vezi toate</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400">{t('footer_privacy')}</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400">{t('footer_terms')}</button></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-zinc-900" />
          
          <div className="text-center text-zinc-500 text-sm">
            © 2026 AI Digital Solutions. {t('footer_rights')}
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget lang={lang} />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/40771123522"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[280px] right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
        </svg>
        <span className="absolute -top-10 right-0 bg-white text-black text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          {lang === 'ro' ? 'Scrie-ne pe WhatsApp' : 'Chat on WhatsApp'}
        </span>
      </motion.a>

      {/* Cookie Consent */}
      <CookieConsent lang={lang} />
    </div>
  )
}

export default App
