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
    ro: 'Transformă-ți Afacerea cu Automatizări Inteligente', 
    en: 'Transform Your Business with Smart Automations' 
  },
  hero_subtitle: { 
    ro: 'Soluții AI personalizate pentru firme, contabili și profesioniști. Economisește timp, redu costurile și crește productivitatea.', 
    en: 'Custom AI solutions for businesses, accountants and professionals. Save time, reduce costs and increase productivity.' 
  },
  hero_cta: { ro: 'Cât economisești?', en: 'How much do you save?' },
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
    id: 'website-apps',
    icon: <Smartphone className="w-8 h-8" />,
    title: { 
      ro: 'Website-uri și Aplicații Android', 
      en: 'Websites & Android Apps' 
    },
    shortDesc: { 
      ro: 'Dezvoltare website-uri moderne și aplicații mobile Android personalizate', 
      en: 'Modern website development and custom Android mobile applications' 
    },
    fullDesc: { 
      ro: 'Creăm website-uri profesionale, moderne și optimizate pentru toate dispozitivele, precum și aplicații Android native pentru afacerea ta. De la site-uri de prezentare, magazine online, până la aplicații mobile complexe cu funcționalități personalizate.',
      en: 'We create professional, modern websites optimized for all devices, as well as native Android applications for your business. From presentation websites, online stores, to complex mobile applications with custom functionalities.'
    },
    features: {
      ro: ['Design responsive', 'Optimizare SEO', 'Aplicații Android native', 'Panou administrare', 'Integrare API-uri', 'Suport tehnic'],
      en: ['Responsive design', 'SEO optimization', 'Native Android apps', 'Admin panel', 'API integration', 'Technical support']
    },
    benefits: {
      ro: ['Prezență online profesională', 'Accesibilitate pe mobil', 'Experiență utilizator îmbunătățită', 'Creștere vizibilitate'],
      en: ['Professional online presence', 'Mobile accessibility', 'Improved user experience', 'Increased visibility']
    },
    price: { ro: 'începând de la 100 EUR', en: 'starting from 100 EUR' }
  },
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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
    price: { ro: 'începând de la 200 EUR', en: 'starting from 200 EUR' }
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

  // API Key Kimi - în producție ar trebui pusă în variabile de mediu
  const KIMI_API_KEY = import.meta.env.VITE_KIMI_API_KEY || ''

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callKimiAPI = async (userMessage: string) => {
    const systemPrompt = lang === 'ro' 
      ? `Ești asistentul virtual al AI Digital Solutions, o companie care oferă soluții de automatizare și AI pentru afaceri.
      
Informații despre companie:
- Oferim servicii de automatizare: chatbot Telegram, procesare facturi OCR, CRM automatizat, email marketing, management proiecte, HR automation, gestiune stocuri, raportări financiare, chatbot website, programări, ticketing, social media, documente, onboarding clienți, notificări
- Prețuri: începând de la 100 EUR pentru website-uri, 200 EUR pentru automatizări
- Contact: contact.aidigitals@gmail.com, WhatsApp +40 771 123 522
- Site: www.openbill.ro este platforma noastră de facturare
- Companie: AI Digital Solutions

Răspunde politicos, profesional și concis. Dacă nu știi ceva, sugerează să contacteze echipa la contact.aidigitals@gmail.com sau WhatsApp.`
      : `You are the virtual assistant of AI Digital Solutions, a company offering automation and AI solutions for businesses.
      
Company information:
- We offer automation services: Telegram chatbots, OCR invoice processing, automated CRM, email marketing, project management, HR automation, inventory management, financial reporting, website chatbots, appointments, ticketing, social media, documents, customer onboarding, notifications
- Pricing: starting from 100 EUR for websites, 200 EUR for automations
- Contact: contact.aidigitals@gmail.com, WhatsApp +40 771 123 522
- Website: www.openbill.ro is our invoicing platform
- Company: AI Digital Solutions

Answer politely, professionally and concisely. If you don't know something, suggest contacting the team at contact.aidigitals@gmail.com or WhatsApp.`

    try {
      const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KIMI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Kimi API error:', error)
      return lang === 'ro' 
        ? 'Îmi pare rău, am întâmpinat o problemă. Te rog să ne contactezi direct pe WhatsApp la +40 771 123 522 sau email la contact.aidigitals@gmail.com'
        : 'Sorry, I encountered an issue. Please contact us directly on WhatsApp at +40 771 123 522 or email at contact.aidigitals@gmail.com'
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    setMessages(prev => [...prev, { text: userMessage, isUser: true }])
    setInput('')
    setIsLoading(true)
    
    // Add loading indicator
    setMessages(prev => [...prev, { text: '...', isUser: false, loading: true }])
    
    // Call Kimi API
    const aiResponse = await callKimiAPI(userMessage)
    
    // Remove loading and add real response
    setMessages(prev => {
      const filtered = prev.filter(m => !m.loading)
      return [...filtered, { text: aiResponse, isUser: false }]
    })
    
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
            className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
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
                  manual: lang === 'ro' ? 'Introduci facturi una câte una în calculator' : 'Enter invoices one by one into computer',
                  auto: lang === 'ro' ? 'Scanează și extrage date din 100 facturi în 2 minute' : 'Scans and extracts data from 100 invoices in 2 minutes',
                  icon: <FileText className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Răspunzi la aceleași întrebări de 50x pe zi' : 'Answer the same questions 50x daily',
                  auto: lang === 'ro' ? 'Răspunde 24/7 cu informații din baza de date' : 'Answers 24/7 with info from database',
                  icon: <MessageSquare className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Cauți printre sute de CV-uri manual' : 'Search through hundreds of CVs manually',
                  auto: lang === 'ro' ? 'Selectează automat top 10 candidați potriviți' : 'Automatically selects top 10 matching candidates',
                  icon: <Users className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Verifici stocul în Excel zilnic' : 'Check stock in Excel daily',
                  auto: lang === 'ro' ? 'Trimite alerte automate când stocul e critic' : 'Sends automatic alerts when stock is critical',
                  icon: <Package className="w-5 h-5" />
                },
                {
                  manual: lang === 'ro' ? 'Trimite email-uri de reminder manual' : 'Send reminder emails manually',
                  auto: lang === 'ro' ? 'Programează și trimite email-uri automat' : 'Schedules and sends emails automatically',
                  icon: <Mail className="w-5 h-5" />
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
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
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
