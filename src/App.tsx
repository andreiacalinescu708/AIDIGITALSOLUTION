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
  Phone,
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
  Check,
  Star,
  Quote,
  Send,
  X,
  MessageCircle,
  Shield,
  Award,
  Landmark,
  Store,
  Factory,
  Cpu,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
  nav_cases: { ro: 'Cazuri', en: 'Cases' },
  nav_pricing: { ro: 'Prețuri', en: 'Pricing' },
  nav_contact: { ro: 'Contact', en: 'Contact' },
  nav_faq: { ro: 'FAQ', en: 'FAQ' },
  
  // Hero
  hero_title: { 
    ro: 'Transformă-ți Afacerea cu Automatizări Inteligente', 
    en: 'Transform Your Business with Smart Automations' 
  },
  hero_subtitle: { 
    ro: 'Soluții AI personalizate pentru firme, contabili și profesioniști. Economisește timp, redu costurile și crește productivitatea.', 
    en: 'Custom AI solutions for businesses, accountants and professionals. Save time, reduce costs and increase productivity.' 
  },
  hero_cta: { ro: 'Calculează Economiile', en: 'Calculate Savings' },
  hero_cta2: { ro: 'Vezi Soluțiile', en: 'See Solutions' },
  hero_badge: { ro: 'Soluții AI pentru afaceri moderne', en: 'AI Solutions for Modern Business' },
  hero_stats_1: { ro: 'Ore economisite lunar', en: 'Hours saved monthly' },
  hero_stats_2: { ro: 'Reducere costuri', en: 'Cost reduction' },
  hero_stats_3: { ro: 'Clienți mulțumiți', en: 'Happy clients' },
  
  // Calculator Section
  calc_title: { ro: 'Calculator de Economii', en: 'Savings Calculator' },
  calc_subtitle: { 
    ro: 'Descoperă cât poți economisi cu automatizările noastre', 
    en: 'Discover how much you can save with our automations' 
  },
  calc_employees: { ro: 'Număr angajați', en: 'Number of employees' },
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
  
  // Case Studies
  cases_title: { ro: 'Studii de Caz', en: 'Case Studies' },
  cases_subtitle: { 
    ro: 'Vezi cum am ajutat alte afaceri să crească', 
    en: 'See how we helped other businesses grow' 
  },
  cases_before: { ro: 'Înainte', en: 'Before' },
  cases_after: { ro: 'După', en: 'After' },
  cases_result: { ro: 'Rezultat', en: 'Result' },
  
  // Services Section
  services_title: { ro: 'Soluții de Automatizare', en: 'Automation Solutions' },
  services_subtitle: { 
    ro: '15 automatizări inteligente care îți vor revoluționa modul de lucru', 
    en: '15 smart automations that will revolutionize your workflow' 
  },
  services_click_info: { 
    ro: 'Click pe orice soluție pentru a vedea detaliile', 
    en: 'Click on any solution to see details' 
  },
  
  // Pricing
  pricing_title: { ro: 'Prețuri Transparente', en: 'Transparent Pricing' },
  pricing_subtitle: { 
    ro: 'Alege pachetul potrivit pentru afacerea ta', 
    en: 'Choose the right package for your business' 
  },
  pricing_popular: { ro: 'Cel mai popular', en: 'Most popular' },
  pricing_starter: { ro: 'Starter', en: 'Starter' },
  pricing_business: { ro: 'Business', en: 'Business' },
  pricing_enterprise: { ro: 'Enterprise', en: 'Enterprise' },
  pricing_month: { ro: '/lună', en: '/month' },
  pricing_get_started: { ro: 'Începe Acum', en: 'Get Started' },
  pricing_contact: { ro: 'Contactează-ne', en: 'Contact Us' },
  
  // Testimonials
  testimonials_title: { ro: 'Ce Spun Clienții Noștri', en: 'What Our Clients Say' },
  
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
  contact_phone: { ro: 'Telefon', en: 'Phone' },
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
  
  // Newsletter
  newsletter_title: { ro: 'Abonează-te la Newsletter', en: 'Subscribe to Newsletter' },
  newsletter_subtitle: { 
    ro: 'Primești tips despre automatizare și AI direct în inbox', 
    en: 'Get tips about automation and AI directly in your inbox' 
  },
  newsletter_placeholder: { ro: 'Adresa ta de email', en: 'Your email address' },
  newsletter_button: { ro: 'Abonează-te', en: 'Subscribe' },
  newsletter_success: { ro: 'Te-ai abonat cu succes!', en: 'Successfully subscribed!' },
  
  // Social Proof
  trust_title: { ro: 'Au Încredere în Noi', en: 'Trusted By' },
  
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
  footer_privacy: { ro: 'Politica de Confidențialitate', en: 'Privacy Policy' },
  footer_terms: { ro: 'Termeni și Condiții', en: 'Terms and Conditions' },
  
  // Modal
  modal_benefits: { ro: 'Beneficii', en: 'Benefits' },
  modal_features: { ro: 'Funcționalități', en: 'Features' },
  modal_price: { ro: 'Preț orientativ', en: 'Estimated price' },
  modal_contact: { ro: 'Contactează-ne pentru detalii', en: 'Contact us for details' },
}

// Service data
interface Service {
  id: string
  icon: React.ReactNode
  title: { ro: string; en: string }
  shortDesc: { ro: string; en: string }
  fullDesc: { ro: string; en: string }
  features: { ro: string[]; en: string[] }
  benefits: { ro: string[]; en: string[] }
  price: { ro: string; en: string }
}

const services: Service[] = [
  {
    id: 'telegram-bot',
    icon: <Bot className="w-8 h-8" />,
    title: { 
      ro: 'Chatbot Telegram pentru Suport Clienți', 
      en: 'Telegram Chatbot for Customer Support' 
    },
    shortDesc: { 
      ro: 'Bot inteligent pe Telegram care răspunde instant la întrebări clienților', 
      en: 'Smart Telegram bot that instantly answers customer questions' 
    },
    fullDesc: { 
      ro: 'Un chatbot avansat pe Telegram care funcționează 24/7 pentru a răspunde la întrebările clienților tăi. Poate gestiona programări, oferi informații despre produse, prelua comenzi și escalada conversațiile complexe către agenți umani când este necesar.',
      en: 'An advanced Telegram chatbot that works 24/7 to answer your customers\' questions. It can handle appointments, provide product information, take orders and escalate complex conversations to human agents when needed.'
    },
    features: {
      ro: ['Răspunsuri instantanee 24/7', 'Integrare cu CRM', 'Gestionare programări', 'Preluare comenzi', 'Escalare inteligentă'],
      en: ['Instant responses 24/7', 'CRM integration', 'Appointment management', 'Order taking', 'Smart escalation']
    },
    benefits: {
      ro: ['Reducere cu 68% a timpului de răspuns', 'Disponibilitate permanentă', 'Economisire resurse umane'],
      en: ['68% reduction in response time', 'Permanent availability', 'Human resource savings']
    },
    price: { ro: 'de la 800 EUR', en: 'from 800 EUR' }
  },
  {
    id: 'invoices',
    icon: <FileText className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Facturi și Chitanțe', 
      en: 'Invoice & Receipt Automation' 
    },
    shortDesc: { 
      ro: 'Procesare automată a documentelor financiare cu OCR inteligent', 
      en: 'Automatic processing of financial documents with smart OCR' 
    },
    fullDesc: { 
      ro: 'Sistem care extrage automat date din facturi și chitanțe folosind tehnologie OCR avansată. Documentele sunt scanate, categorizate și introduse automat în sistemul tău de contabilitate, eliminând introducerea manuală a datelor.',
      en: 'A system that automatically extracts data from invoices and receipts using advanced OCR technology. Documents are scanned, categorized and automatically entered into your accounting system, eliminating manual data entry.'
    },
    features: {
      ro: ['OCR avansat pentru extragere date', 'Categorizare automată', 'Integrare QuickBooks/Xero', 'Validare automată', 'Arhivare digitală'],
      en: ['Advanced OCR for data extraction', 'Automatic categorization', 'QuickBooks/Xero integration', 'Automatic validation', 'Digital archiving']
    },
    benefits: {
      ro: ['Economisire 15+ ore pe săptămână', 'Eliminare erori de introducere', 'Procesare mai rapidă'],
      en: ['Save 15+ hours per week', 'Eliminate entry errors', 'Faster processing']
    },
    price: { ro: 'de la 1.200 EUR', en: 'from 1.200 EUR' }
  },
  {
    id: 'crm',
    icon: <Users className="w-8 h-8" />,
    title: { 
      ro: 'Sistem CRM Automatizat', 
      en: 'Automated CRM System' 
    },
    shortDesc: { 
      ro: 'Gestionare automată a relațiilor cu clienții și pipeline-ul de vânzări', 
      en: 'Automated customer relationship management and sales pipeline' 
    },
    fullDesc: { 
      ro: 'CRM inteligent care automatizează întregul proces de vânzări. De la captarea lead-urilor până la follow-up automat, scorarea lead-urilor și raportarea performanței. Sistemul funcționează în fundal, astfel încât echipa ta să se poată concentra pe închiderea afacerilor.',
      en: 'Smart CRM that automates the entire sales process. From lead capture to automatic follow-up, lead scoring and performance reporting. The system works in the background so your team can focus on closing deals.'
    },
    features: {
      ro: ['Captare lead-uri automată', 'Scorare inteligentă', 'Follow-up automat', 'Rapoarte în timp real', 'Integrare email'],
      en: ['Automatic lead capture', 'Smart scoring', 'Automatic follow-up', 'Real-time reports', 'Email integration']
    },
    benefits: {
      ro: ['Creștere cu 40% a conversiilor', 'Pipeline curat și organizat', 'Forecasting precis'],
      en: ['40% increase in conversions', 'Clean and organized pipeline', 'Accurate forecasting']
    },
    price: { ro: 'de la 1.500 EUR', en: 'from 1.500 EUR' }
  },
  {
    id: 'email-marketing',
    icon: <Mail className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Email Marketing', 
      en: 'Email Marketing Automation' 
    },
    shortDesc: { 
      ro: 'Campanii email personalizate și declanșate de comportamentul utilizatorilor', 
      en: 'Personalized email campaigns triggered by user behavior' 
    },
    fullDesc: { 
      ro: 'Sistem de marketing prin email care trimite mesaje personalizate bazate pe acțiunile utilizatorilor. De la email-uri de bun venit, abandon de coș, reactivare clienți inactivi, până la campanii de upsell și cross-sell automatizate.',
      en: 'Email marketing system that sends personalized messages based on user actions. From welcome emails, cart abandonment, reactivation of inactive customers, to automated upsell and cross-sell campaigns.'
    },
    features: {
      ro: ['Segmentare automată', 'Trigger-uri comportamentale', 'A/B testing', 'Personalizare dinamică', 'Analize detaliate'],
      en: ['Automatic segmentation', 'Behavioral triggers', 'A/B testing', 'Dynamic personalization', 'Detailed analytics']
    },
    benefits: {
      ro: ['ROI măsurabil', 'Engagement crescut', 'Loyalty îmbunătățit'],
      en: ['Measurable ROI', 'Increased engagement', 'Improved loyalty']
    },
    price: { ro: 'de la 600 EUR', en: 'from 600 EUR' }
  },
  {
    id: 'project-management',
    icon: <FolderKanban className="w-8 h-8" />,
    title: { 
      ro: 'Management Proiecte Automatizat', 
      en: 'Automated Project Management' 
    },
    shortDesc: { 
      ro: 'Gestionare inteligentă a task-urilor, deadline-uri și resurse', 
      en: 'Smart management of tasks, deadlines and resources' 
    },
    fullDesc: { 
      ro: 'Sistem care automatizează fluxul de lucru în proiecte. Task-uri create automat din email-uri, reminder-e pentru deadline-uri, alocare inteligentă a resurselor și rapoarte automate de progres. Toate integrate cu tool-urile tale preferate.',
      en: 'System that automates workflow in projects. Tasks automatically created from emails, deadline reminders, intelligent resource allocation and automatic progress reports. All integrated with your favorite tools.'
    },
    features: {
      ro: ['Creare task-uri din email', 'Reminder-e inteligente', 'Alocare resurse', 'Dependențe automate', 'Rapoarte progres'],
      en: ['Task creation from email', 'Smart reminders', 'Resource allocation', 'Automatic dependencies', 'Progress reports']
    },
    benefits: {
      ro: ['Reducere timp de coordonare', 'Mai puține deadline-uri ratate', 'Vizibilitate completă'],
      en: ['Reduced coordination time', 'Fewer missed deadlines', 'Complete visibility']
    },
    price: { ro: 'de la 900 EUR', en: 'from 900 EUR' }
  },
  {
    id: 'hr',
    icon: <UserPlus className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Resurse Umane (HR)', 
      en: 'HR Automation' 
    },
    shortDesc: { 
      ro: 'Procese HR automatizate de la recrutare la onboarding', 
      en: 'Automated HR processes from recruitment to onboarding' 
    },
    fullDesc: { 
      ro: 'Soluție completă pentru automatizarea proceselor de HR. Scanare și scorare automată a CV-urilor, programare interviuri, onboarding digital pentru angajați noi și gestionarea documentelor. Reduce timpul administrativ cu până la 70%.',
      en: 'Complete solution for automating HR processes. Automatic CV scanning and scoring, interview scheduling, digital onboarding for new employees and document management. Reduces administrative time by up to 70%.'
    },
    features: {
      ro: ['Scanare CV-uri cu AI', 'Programare interviuri', 'Onboarding digital', 'Gestionare documente', 'Rapoarte HR'],
      en: ['AI CV scanning', 'Interview scheduling', 'Digital onboarding', 'Document management', 'HR reports']
    },
    benefits: {
      ro: ['Procese mai rapide', 'Experiență mai bună pentru candidați', 'Conformitate îmbunătățită'],
      en: ['Faster processes', 'Better candidate experience', 'Improved compliance']
    },
    price: { ro: 'de la 1.800 EUR', en: 'from 1.800 EUR' }
  },
  {
    id: 'inventory',
    icon: <Package className="w-8 h-8" />,
    title: { 
      ro: 'Sistem Gestiune Stocuri Inteligent', 
      en: 'Smart Inventory Management' 
    },
    shortDesc: { 
      ro: 'Gestionare automată a stocurilor cu predicție a cererii', 
      en: 'Automated inventory management with demand forecasting' 
    },
    fullDesc: { 
      ro: 'Sistem inteligent de gestiune a stocurilor care previne rupturile de stoc și supra-stocarea. Folosește algoritmi de predicție pentru a anticipa cererea, generează automat comenzi către furnizori și sincronizează stocul între toate canalele de vânzare.',
      en: 'Smart inventory management system that prevents stockouts and overstocking. Uses prediction algorithms to anticipate demand, automatically generates orders to suppliers and synchronizes stock across all sales channels.'
    },
    features: {
      ro: ['Predicție cerere', 'Comenzi automate', 'Sincronizare multi-canal', 'Alerte stoc minim', 'Rapoarte detaliate'],
      en: ['Demand forecasting', 'Automatic orders', 'Multi-channel sync', 'Minimum stock alerts', 'Detailed reports']
    },
    benefits: {
      ro: ['Reducere stoc blocat', 'Mai puține rupturi de stoc', 'Cash flow îmbunătățit'],
      en: ['Reduced dead stock', 'Fewer stockouts', 'Improved cash flow']
    },
    price: { ro: 'de la 1.400 EUR', en: 'from 1.400 EUR' }
  },
  {
    id: 'financial-reports',
    icon: <BarChart3 className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Raportări Financiare', 
      en: 'Financial Reporting Automation' 
    },
    shortDesc: { 
      ro: 'Rapoarte financiare generate automat și actualizate în timp real', 
      en: 'Automatically generated financial reports updated in real-time' 
    },
    fullDesc: { 
      ro: 'Sistem care generează automat rapoarte financiare personalizate: P&L, bilanț, cash flow, analize de venituri și cheltuieli. Rapoartele sunt actualizate în timp real și pot fi programate pentru trimitere automatizată către stakeholderi.',
      en: 'System that automatically generates custom financial reports: P&L, balance sheet, cash flow, revenue and expense analysis. Reports are updated in real-time and can be scheduled for automatic delivery to stakeholders.'
    },
    features: {
      ro: ['Rapoarte personalizate', 'Actualizare real-time', 'Programare trimiteri', 'Dashboard interactiv', 'Export multi-format'],
      en: ['Custom reports', 'Real-time updates', 'Scheduled delivery', 'Interactive dashboard', 'Multi-format export']
    },
    benefits: {
      ro: ['Decizii mai rapide', 'Transparență financiară', 'Economisire timp raportare'],
      en: ['Faster decisions', 'Financial transparency', 'Time savings on reporting']
    },
    price: { ro: 'de la 1.000 EUR', en: 'from 1.000 EUR' }
  },
  {
    id: 'website-chatbot',
    icon: <MessageSquare className="w-8 h-8" />,
    title: { 
      ro: 'Chatbot Website Inteligent', 
      en: 'Smart Website Chatbot' 
    },
    shortDesc: { 
      ro: 'Asistent virtual pe site-ul tău pentru conversii și suport', 
      en: 'Virtual assistant on your website for conversions and support' 
    },
    fullDesc: { 
      ro: 'Chatbot AI avansat pentru site-ul tău care poate răspunde la întrebări, colecta lead-uri, programa meeting-uri și ghida vizitatorii prin procesul de cumpărare. Se integrează cu CRM-ul și sistemul de ticketing pentru o experiență completă.',
      en: 'Advanced AI chatbot for your website that can answer questions, collect leads, schedule meetings and guide visitors through the purchase process. Integrates with CRM and ticketing system for a complete experience.'
    },
    features: {
      ro: ['Conversații naturale', 'Colectare lead-uri', 'Programare meeting-uri', 'Integrare CRM', 'Analize conversații'],
      en: ['Natural conversations', 'Lead collection', 'Meeting scheduling', 'CRM integration', 'Conversation analytics']
    },
    benefits: {
      ro: ['Creștere conversii', 'Suport 24/7', 'Date valoroase despre clienți'],
      en: ['Increased conversions', '24/7 support', 'Valuable customer data']
    },
    price: { ro: 'de la 700 EUR', en: 'from 700 EUR' }
  },
  {
    id: 'calendar',
    icon: <Calendar className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Programări și Calendar', 
      en: 'Appointment & Calendar Automation' 
    },
    shortDesc: { 
      ro: 'Sistem inteligent de programări cu sincronizare automată', 
      en: 'Smart appointment system with automatic synchronization' 
    },
    fullDesc: { 
      ro: 'Sistem complet pentru gestionarea programărilor. Clienții pot programa online, primesc reminder-e automate prin SMS/email, iar calendarul se sincronizează cu toate dispozitivele tale. Include gestionarea anulărilor și reprogramărilor.',
      en: 'Complete system for managing appointments. Customers can book online, receive automatic reminders via SMS/email, and the calendar syncs with all your devices. Includes management of cancellations and rescheduling.'
    },
    features: {
      ro: ['Booking online', 'Reminder-e SMS/Email', 'Sincronizare calendar', 'Gestionare anulări', 'Plăți online'],
      en: ['Online booking', 'SMS/Email reminders', 'Calendar sync', 'Cancellation management', 'Online payments']
    },
    benefits: {
      ro: ['Reducere no-show-uri', 'Timp economisit', 'Experiență clienți îmbunătățită'],
      en: ['Reduced no-shows', 'Time saved', 'Improved customer experience']
    },
    price: { ro: 'de la 500 EUR', en: 'from 500 EUR' }
  },
  {
    id: 'ticketing',
    icon: <Ticket className="w-8 h-8" />,
    title: { 
      ro: 'Sistem Ticketing Suport Clienți', 
      en: 'Customer Support Ticketing System' 
    },
    shortDesc: { 
      ro: 'Gestionare automată a tichetelor de suport cu routing inteligent', 
      en: 'Automatic management of support tickets with smart routing' 
    },
    fullDesc: { 
      ro: 'Sistem de ticketing care categorizează automat solicitările, le direcționează către departamentul potrivit și prioritizează în funcție de urgență. Include bază de cunoștințe, SLA tracking și rapoarte de performanță.',
      en: 'Ticketing system that automatically categorizes requests, routes them to the right department and prioritizes based on urgency. Includes knowledge base, SLA tracking and performance reports.'
    },
    features: {
      ro: ['Categorizare automată', 'Routing inteligent', 'Bază de cunoștințe', 'SLA tracking', 'Rapoarte performanță'],
      en: ['Automatic categorization', 'Smart routing', 'Knowledge base', 'SLA tracking', 'Performance reports']
    },
    benefits: {
      ro: ['Timp de rezolvare redus', 'Satisfacție clienți crescută', 'Eficiență echipă'],
      en: ['Reduced resolution time', 'Increased customer satisfaction', 'Team efficiency']
    },
    price: { ro: 'de la 1.100 EUR', en: 'from 1.100 EUR' }
  },
  {
    id: 'social-media',
    icon: <Share2 className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Social Media', 
      en: 'Social Media Automation' 
    },
    shortDesc: { 
      ro: 'Programare, publicare și monitorizare automată pe rețele sociale', 
      en: 'Automatic scheduling, publishing and monitoring on social media' 
    },
    fullDesc: { 
      ro: 'Sistem care automatizează prezența ta pe social media. Programează postări pe multiple platforme, monitorizează mențiunile brandului, răspunde automat la comentarii comune și generează rapoarte de performanță.',
      en: 'System that automates your social media presence. Schedule posts on multiple platforms, monitor brand mentions, automatically respond to common comments and generate performance reports.'
    },
    features: {
      ro: ['Programare multi-platformă', 'Monitorizare mențiuni', 'Răspunsuri automate', 'Reciclare conținut', 'Analize detaliate'],
      en: ['Multi-platform scheduling', 'Mention monitoring', 'Auto responses', 'Content recycling', 'Detailed analytics']
    },
    benefits: {
      ro: ['Prezență constantă', 'Economisire timp', 'Engagement crescut'],
      en: ['Consistent presence', 'Time savings', 'Increased engagement']
    },
    price: { ro: 'de la 400 EUR', en: 'from 400 EUR' }
  },
  {
    id: 'documents',
    icon: <FileSignature className="w-8 h-8" />,
    title: { 
      ro: 'Sistem Documente și Contracte', 
      en: 'Documents & Contracts System' 
    },
    shortDesc: { 
      ro: 'Gestionare, generare și semnare electronică a documentelor', 
      en: 'Management, generation and electronic signing of documents' 
    },
    fullDesc: { 
      ro: 'Platformă completă pentru gestionarea documentelor. Generează automat contracte din template-uri, trimite pentru semnare electronică, stochează în cloud securizat și trimite reminder-e pentru reînnoiri. Perfect pentru firmele cu multe contracte.',
      en: 'Complete platform for document management. Automatically generate contracts from templates, send for electronic signature, store in secure cloud and send reminders for renewals. Perfect for companies with many contracts.'
    },
    features: {
      ro: ['Template-uri personalizate', 'Semnare electronică', 'Stocare cloud', 'Reminder-e reînnoiri', 'Căutare avansată'],
      en: ['Custom templates', 'Electronic signature', 'Cloud storage', 'Renewal reminders', 'Advanced search']
    },
    benefits: {
      ro: ['Procese mai rapide', 'Hârtie eliminată', 'Conformitate legală'],
      en: ['Faster processes', 'Paper eliminated', 'Legal compliance']
    },
    price: { ro: 'de la 800 EUR', en: 'from 800 EUR' }
  },
  {
    id: 'onboarding',
    icon: <UserCheck className="w-8 h-8" />,
    title: { 
      ro: 'Automatizare Onboarding Clienți', 
      en: 'Customer Onboarding Automation' 
    },
    shortDesc: { 
      ro: 'Proces de integrare clienți nou automatizat și personalizat', 
      en: 'Automated and personalized new customer integration process' 
    },
    fullDesc: { 
      ro: 'Sistem care creează o experiență de onboarding fluidă pentru clienții noi. Trimite automat email-uri de bun venit, tutoriale personalizate, programează call-uri de introducere și colectează feedback. Crește retenția și reduce churn-ul.',
      en: 'System that creates a smooth onboarding experience for new customers. Automatically sends welcome emails, personalized tutorials, schedules intro calls and collects feedback. Increases retention and reduces churn.'
    },
    features: {
      ro: ['Email-uri de bun venit', 'Tutoriale personalizate', 'Programare call-uri', 'Colectare feedback', 'Tracking progres'],
      en: ['Welcome emails', 'Personalized tutorials', 'Call scheduling', 'Feedback collection', 'Progress tracking']
    },
    benefits: {
      ro: ['Retenție îmbunătățită', 'Churn redus', 'Experiență premium'],
      en: ['Improved retention', 'Reduced churn', 'Premium experience']
    },
    price: { ro: 'de la 900 EUR', en: 'from 900 EUR' }
  },
  {
    id: 'notifications',
    icon: <Bell className="w-8 h-8" />,
    title: { 
      ro: 'Sistem Notificări și Alerte', 
      en: 'Notifications & Alerts System' 
    },
    shortDesc: { 
      ro: 'Alerte inteligente pentru evenimente critice din afacerea ta', 
      en: 'Smart alerts for critical events in your business' 
    },
    fullDesc: { 
      ro: 'Sistem de monitorizare și alertare care te notifică instant despre evenimentele importante: stocuri critice, plăți primite, deadline-uri apropiate, comportamente anormale. Alertele pot fi primite pe email, SMS, Slack sau Telegram.',
      en: 'Monitoring and alerting system that instantly notifies you about important events: critical stock, received payments, approaching deadlines, abnormal behaviors. Alerts can be received via email, SMS, Slack or Telegram.'
    },
    features: {
      ro: ['Alerte personalizate', 'Multi-canal', 'Trigger-uri condiționale', 'Escalare automată', 'Dashboard monitorizare'],
      en: ['Custom alerts', 'Multi-channel', 'Conditional triggers', 'Auto escalation', 'Monitoring dashboard']
    },
    benefits: {
      ro: ['Reacție rapidă', 'Probleme prevenite', 'Control total'],
      en: ['Quick reaction', 'Prevented issues', 'Total control']
    },
    price: { ro: 'de la 600 EUR', en: 'from 600 EUR' }
  }
]

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    company: { ro: 'Contabilitate Pro SRL', en: 'Pro Accounting LLC' },
    industry: { ro: 'Servicii Contabile', en: 'Accounting Services' },
    icon: <Landmark className="w-6 h-6" />,
    before: { ro: '20 ore/săptămână pe procesare facturi', en: '20 hours/week on invoice processing' },
    after: { ro: '2 ore/săptămână cu automatizare OCR', en: '2 hours/week with OCR automation' },
    result: { ro: 'Economie de 18 ore/săptămână și reducere erori cu 95%', en: 'Save 18 hours/week and 95% error reduction' },
    savings: '€28,000',
    image: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },
  {
    id: 2,
    company: { ro: 'TechRetail.ro', en: 'TechRetail.com' },
    industry: { ro: 'E-commerce', en: 'E-commerce' },
    icon: <Store className="w-6 h-6" />,
    before: { ro: 'Rata de conversie 1.2%, suport manual', en: '1.2% conversion rate, manual support' },
    after: { ro: 'Chatbot 24/7 și follow-up automat', en: '24/7 chatbot and automatic follow-up' },
    result: { ro: 'Conversie crescută la 3.8%, suport non-stop', en: 'Conversion increased to 3.8%, 24/7 support' },
    savings: '€45,000',
    image: 'bg-gradient-to-br from-purple-500 to-purple-700'
  },
  {
    id: 3,
    company: { ro: 'Constructii Rapid SA', en: 'Rapid Construction Inc' },
    industry: { ro: 'Construcții', en: 'Construction' },
    icon: <Factory className="w-6 h-6" />,
    before: { ro: 'Gestionare stocuri manuală, rupturi frecvente', en: 'Manual inventory, frequent stockouts' },
    before2: { ro: 'Proiecte întârziate din lipsa materialelor', en: 'Projects delayed due to material shortages' },
    after: { ro: 'Sistem inteligent cu predicție cerere', en: 'Smart system with demand forecasting' },
    result: { ro: 'Zero rupturi de stoc, proiecte la timp', en: 'Zero stockouts, projects on time' },
    savings: '€62,000',
    image: 'bg-gradient-to-br from-orange-500 to-orange-700'
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
const pricingPlans = {
  ro: [
    {
      name: 'Starter',
      price: '499',
      period: 'EUR/lună',
      description: 'Ideal pentru firme mici care încep automatizarea',
      features: [
        '1 automatizare la alegere',
        'Până la 5 utilizatori',
        'Suport email',
        'Rapoarte lunare',
        'Backup zilnic',
        'Integrare de bază'
      ],
      cta: 'Începe Acum',
      popular: false
    },
    {
      name: 'Business',
      price: '1.299',
      period: 'EUR/lună',
      description: 'Pentru firme în creștere cu nevoi multiple',
      features: [
        '3 automatizări incluse',
        'Până la 25 utilizatori',
        'Suport prioritar 24/7',
        'Rapoarte săptămânale',
        'Backup în timp real',
        'Integrări avansate',
        'Training inclus',
        'API access'
      ],
      cta: 'Cel mai popular',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Soluții personalizate pentru corporații',
      features: [
        'Automatizări nelimitate',
        'Utilizatori nelimitați',
        'Manager de cont dedicat',
        'Rapoarte custom',
        'SLA garantat',
        'On-premise opțiune',
        'Audit securitate',
        'Dezvoltare custom'
      ],
      cta: 'Contactează-ne',
      popular: false
    }
  ],
  en: [
    {
      name: 'Starter',
      price: '499',
      period: 'EUR/month',
      description: 'Ideal for small businesses starting automation',
      features: [
        '1 automation of choice',
        'Up to 5 users',
        'Email support',
        'Monthly reports',
        'Daily backup',
        'Basic integration'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Business',
      price: '1.299',
      period: 'EUR/month',
      description: 'For growing businesses with multiple needs',
      features: [
        '3 automations included',
        'Up to 25 users',
        'Priority 24/7 support',
        'Weekly reports',
        'Real-time backup',
        'Advanced integrations',
        'Training included',
        'API access'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Custom solutions for corporations',
      features: [
        'Unlimited automations',
        'Unlimited users',
        'Dedicated account manager',
        'Custom reports',
        'Guaranteed SLA',
        'On-premise option',
        'Security audit',
        'Custom development'
      ],
      cta: 'Contact Us',
      popular: false
    }
  ]
}

// Testimonials Data
const testimonials = {
  ro: [
    {
      name: 'Maria Popescu',
      role: 'Director General',
      company: 'Contabilitate Pro SRL',
      content: 'Am economisit peste 20 de ore pe săptămână cu sistemul de procesare automată a facturilor. Echipa poate acum să se concentreze pe activități cu adevărat importante.',
      rating: 5
    },
    {
      name: 'Andrei Ionescu',
      role: 'CEO',
      company: 'TechRetail.ro',
      content: 'Chatbot-ul a crescut conversiile cu 200%. Clienții sunt mulțumiți că primesc răspunsuri instant, iar noi economisim costuri cu suportul.',
      rating: 5
    },
    {
      name: 'Cristina Dumitrescu',
      role: 'HR Manager',
      company: 'Constructii Rapid SA',
      content: 'Automatizarea HR ne-a schimbat complet modul de recrutare. Procesul care dura 2 săptămâni acum se face în 3 zile. Candidații sunt impresionați de viteza noastră.',
      rating: 5
    }
  ],
  en: [
    {
      name: 'Maria Popescu',
      role: 'General Manager',
      company: 'Pro Accounting LLC',
      content: 'We saved over 20 hours per week with the automated invoice processing system. The team can now focus on truly important activities.',
      rating: 5
    },
    {
      name: 'Andrei Ionescu',
      role: 'CEO',
      company: 'TechRetail.com',
      content: 'The chatbot increased conversions by 200%. Customers are happy to get instant responses, and we save on support costs.',
      rating: 5
    },
    {
      name: 'Cristina Dumitrescu',
      role: 'HR Manager',
      company: 'Rapid Construction Inc',
      content: 'HR automation completely changed our recruitment process. What used to take 2 weeks now takes 3 days. Candidates are impressed by our speed.',
      rating: 5
    }
  ]
}

// Trusted companies
const trustedCompanies = [
  { name: 'Banca Transilvania', icon: <Landmark className="w-8 h-8" /> },
  { name: 'eMAG', icon: <Store className="w-8 h-8" /> },
  { name: 'Oracle', icon: <Cpu className="w-8 h-8" /> },
  { name: 'Microsoft', icon: <Globe className="w-8 h-8" /> },
  { name: 'UiPath', icon: <Bot className="w-8 h-8" /> },
  { name: 'Bitdefender', icon: <Shield className="w-8 h-8" /> },
]

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

// ROI Calculator Component
function ROICalculator({ lang }: { lang: Language }) {
  const [employees, setEmployees] = useState(5)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(15)
  
  const annualHours = hoursPerWeek * 52 * employees
  const annualSavings = Math.round(annualHours * hourlyRate * 0.7) // 70% efficiency gain
  const hoursSaved = Math.round(annualHours * 0.7)
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl shadow-black/50 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-zinc-400 font-medium mb-2 block">
              {lang === 'ro' ? 'Număr angajați' : 'Number of employees'}
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-24 bg-zinc-800 border-zinc-700 text-white"
              />
              <input
                type="range"
                min="1"
                max="100"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="flex-1 accent-cyan-400"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-zinc-400 font-medium mb-2 block">
              {lang === 'ro' ? 'Ore repetitive/săptămână per angajat' : 'Repetitive hours/week per employee'}
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-24 bg-zinc-800 border-zinc-700 text-white"
              />
              <input
                type="range"
                min="1"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="flex-1 accent-cyan-400"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-zinc-400 font-medium mb-2 block">
              {lang === 'ro' ? 'Cost oră (EUR)' : 'Hourly cost (EUR)'}
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-24 bg-zinc-800 border-zinc-700 text-white"
              />
              <input
                type="range"
                min="5"
                max="100"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="flex-1 accent-cyan-400"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {lang === 'ro' ? 'Economii Anuale Estimate' : 'Estimated Annual Savings'}
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {lang === 'ro' ? 'Ore economisite' : 'Hours saved'}
              </span>
              <span className="text-2xl font-bold">{hoursSaved.toLocaleString()}h</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <span className="flex items-center gap-2">
                <Euro className="w-5 h-5" />
                {lang === 'ro' ? 'Economii financiare' : 'Financial savings'}
              </span>
              <span className="text-3xl font-bold">€{annualSavings.toLocaleString()}</span>
            </div>
          </div>
          
          <p className="text-sm text-white/80 mt-4">
            {lang === 'ro' 
              ? '* Calcul bazat pe o eficiență medie de 70% după implementare' 
              : '* Calculation based on average 70% efficiency after implementation'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Chat Widget Component
function ChatWidget({ lang }: { lang: Language }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>([
    { text: lang === 'ro' 
      ? 'Bună! Sunt asistentul AI Digital Solutions. Cu ce te pot ajuta?' 
      : 'Hello! I am the AI Digital Solutions assistant. How can I help you?', 
      isUser: false 
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages([...messages, { text: input, isUser: true }])
    
    // Simulate AI response
    setTimeout(() => {
      const responses = lang === 'ro' ? [
        'Interesant! Pot să te ajut cu mai multe detalii despre soluțiile noastre.',
        'Îți recomand să arunci o privire la calculatorul nostru de economii.',
        'Pentru o ofertă personalizată, completează formularul de contact.',
        'Soluțiile noastre de automatizare pot economisi până la 70% din timp.',
      ] : [
        'Interesting! I can help you with more details about our solutions.',
        'I recommend checking out our savings calculator.',
        'For a custom quote, fill out the contact form.',
        'Our automation solutions can save up to 70% of time.',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }])
    }, 1000)
    
    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black p-4 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
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
                        : 'bg-zinc-800 text-zinc-300 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
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
                placeholder={lang === 'ro' ? 'Scrie un mesaj...' : 'Type a message...'}
                className="flex-1 bg-zinc-800 border-zinc-700 text-white"
              />
              <Button onClick={handleSend} size="icon" className="bg-cyan-500 hover:bg-cyan-400 text-black">
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
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitted(true)
    setTimeout(() => setNewsletterSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">AI Digital Solutions</span>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('services')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_services')}
              </button>
              <button onClick={() => scrollToSection('how')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_how')}
              </button>
              <button onClick={() => scrollToSection('cases')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_cases')}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium text-sm">
                {t('nav_pricing')}
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
                  <button onClick={() => scrollToSection('cases')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_cases')}
                  </button>
                  <button onClick={() => scrollToSection('pricing')} className="text-left text-lg font-medium text-zinc-300 hover:text-cyan-400">
                    {t('nav_pricing')}
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
                onClick={() => scrollToSection('calculator')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t('hero_cta')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-zinc-700 text-white hover:bg-zinc-900 px-8 py-6 text-lg rounded-xl"
              >
                {t('hero_cta2')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">500+</div>
                <div className="text-sm text-zinc-500 mt-1">{t('hero_stats_1')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">40%</div>
                <div className="text-sm text-zinc-500 mt-1">{t('hero_stats_2')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">50+</div>
                <div className="text-sm text-zinc-500 mt-1">{t('hero_stats_3')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('calc_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('calc_subtitle')}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <ROICalculator lang={lang} />
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

      {/* Case Studies Section */}
      <section id="cases" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('cases_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('cases_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <AnimatedSection key={study.id}>
                <Card className="overflow-hidden h-full bg-zinc-900 border-zinc-800">
                  <div className={`h-32 ${study.image} flex items-center justify-center`}>
                    <div className="text-white/90">{study.icon}</div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{study.company[lang]}</CardTitle>
                    <CardDescription className="text-zinc-400">{study.industry[lang]}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold text-sm">{t('cases_before')}:</span>
                        <span className="text-zinc-400 text-sm">{study.before[lang]}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-semibold text-sm">{t('cases_after')}:</span>
                        <span className="text-zinc-400 text-sm">{study.after[lang]}</span>
                      </div>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-3">
                      <span className="text-cyan-400 font-semibold text-sm">{t('cases_result')}:</span>
                      <p className="text-zinc-300 text-sm mt-1">{study.result[lang]}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-zinc-500 text-sm">{lang === 'ro' ? 'Economii anuale:' : 'Annual savings:'}</span>
                      <span className="text-2xl font-bold text-cyan-400">{study.savings}</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('pricing_title')}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t('pricing_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans[lang].map((plan, idx) => (
              <AnimatedSection key={idx}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`relative h-full bg-zinc-900 border-zinc-800 ${plan.popular ? 'border-cyan-500 border-2 shadow-xl shadow-cyan-500/10' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-cyan-500 text-black font-semibold px-4 py-1">
                          {t('pricing_popular')}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                      <CardDescription className="mt-2 text-zinc-400">{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.period && <span className="text-zinc-500 ml-1">{plan.period}</span>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-zinc-400">
                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full mt-6 ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-black font-semibold' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
                        onClick={() => scrollToSection('contact')}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('testimonials_title')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials[lang].map((testimonial, idx) => (
              <AnimatedSection key={idx}>
                <Card className="h-full bg-zinc-900 border-zinc-800">
                  <CardContent className="pt-6">
                    <Quote className="w-8 h-8 text-cyan-500/30 mb-4" />
                    <p className="text-zinc-400 mb-6">{testimonial.content}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-zinc-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="text-zinc-500 font-medium">{t('trust_title')}</p>
            </div>
          </AnimatedSection>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {trustedCompanies.map((company, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center gap-2 text-zinc-500"
                whileHover={{ opacity: 1, scale: 1.1 }}
              >
                {company.icon}
                <span className="font-semibold">{company.name}</span>
              </motion.div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card className="text-center bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-lg text-white">{t('contact_phone')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+40771123522" className="text-lg font-bold text-cyan-400 hover:text-cyan-300">
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
                    <a href="mailto:contact@aidigitalsolutions.ro" className="text-sm font-bold text-cyan-400 hover:text-cyan-300">
                      contact@aidigitalsolutions.ro
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

            <AnimatedSection>
              <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('newsletter_title')}</CardTitle>
                  <CardDescription className="text-white/80">
                    {t('newsletter_subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {newsletterSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
                      <p className="text-xl font-semibold">{t('newsletter_success')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="newsletter-email" className="text-white/80">
                          Email
                        </Label>
                        <Input 
                          id="newsletter-email" 
                          type="email" 
                          placeholder={t('newsletter_placeholder')}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <Button type="submit" variant="secondary" className="w-full">
                        {t('newsletter_button')}
                      </Button>
                    </form>
                  )}

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex items-center gap-4 mb-4">
                      <Shield className="w-8 h-8 text-white/80" />
                      <div>
                        <p className="font-semibold">GDPR Compliant</p>
                        <p className="text-sm text-white/60">Datele tale sunt în siguranță</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Award className="w-8 h-8 text-white/80" />
                      <div>
                        <p className="font-semibold">ISO 27001</p>
                        <p className="text-sm text-white/60">Certificare securitate</p>
                      </div>
                    </div>
                  </div>
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
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-bold">AI Digital Solutions</span>
              </div>
              <p className="text-zinc-400 mb-4">{t('footer_tagline')}</p>
              <div className="flex items-center gap-4">
                <a href="tel:+40771123522" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="mailto:contact@aidigitalsolutions.ro" className="text-zinc-400 hover:text-cyan-400 transition-colors">
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

      {/* Cookie Consent */}
      <CookieConsent lang={lang} />
    </div>
  )
}

export default App
