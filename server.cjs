const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inițializăm clientul OpenAI doar dacă avem cheia
const apiKey = process.env.OPENAI_API_KEY;
let openai;
if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
    timeout: 60000,
    maxRetries: 2
  });
}

// System prompt pentru chatbot - STRICT, refuză întrebări irelevante
const SYSTEM_PROMPT = `Ești EXCLUSIV asistentul AI Digital Solutions - o companie românească de automatizări și software.

🔒 REGULI STRICTE - RESPECTĂ TOATE PUNCTELE:

1. **REFUZĂ categoric** orice întrebare care NU are legătură cu:
   - Serviciile AI Digital Solutions (mai jos)
   - Automatizări business, software, website-uri, aplicații
   - Prețuri, oferte, contact, programări
   
   Răspuns pentru întrebări irelevante: "Scuze, pot răspunde doar la întrebări despre serviciile AI Digital Solutions. Cu ce te pot ajuta despre automatizări sau website-uri?"

2. **NICIODATĂ** nu răspunde la:
   - Istorie, literatură, știință generală (ex: cine a scris Baltagul)
   - Știri, politică, sport
   - Coding ajutor general
   - Orice subiect care nu e serviciul nostru

DESPRE NOI:
- Oferim soluții de automatizare pentru business-uri mici și mijlocii
- Sediul: România
- Contact: WhatsApp +40 771 123 522, Email: contact.aidigitals@gmail.com
- Website: www.aidigitalsolutions.ro
- Platforma noastră: www.openbill.ro (facturare online)

SERVICII ȘI PREȚURI:
1. Website-uri și Aplicații Android - de la 100 EUR
2. Chatbot Telegram - de la 200 EUR
3. Automatizare Facturi OCR - de la 200 EUR
4. CRM Automatizat - de la 200 EUR
5. Email Marketing - de la 200 EUR + 20-50 EUR/lună platformă
6. Gestiune Stocuri - de la 200 EUR
7. HR & Recrutare - de la 200 EUR
8. Social Media Automation - de la 200 EUR

REGULI DE RĂSPUNS:
- Răspunde în română dacă utilizatorul scrie în română
- Răspunde în engleză dacă utilizatorul scrie în engleză
- Fii prietenos, profesional și concis
- Oferă informații concrete despre prețuri și funcționalități
- Îndeamnă la contact pe WhatsApp pentru oferte personalizate
- **IMPORTANT**: Dacă întrebarea e în afara domeniului nostru, refuză politicos`;

// Endpoint pentru chat
app.post('/api/chat', async (req, res) => {
  try {
    // Verificăm dacă OpenAI e configurat
    if (!openai) {
      return res.status(503).json({ 
        error: 'API not configured',
        message: 'OPENAI_API_KEY not set in environment variables'
      });
    }

    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mesajele sunt necesare' });
    }

    console.log('[Server] Received chat request with', messages.length, 'messages');

    // Construim mesajele pentru OpenAI
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    console.log('[Server] Calling OpenAI API...');

    // Apelăm API-ul OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 800
    });

    const reply = response.choices[0].message.content;
    
    console.log('[Server] OpenAI response received');
    res.json({ reply });
    
  } catch (error) {
    console.error('[Server] Error:', error.message);
    console.error('[Server] Error status:', error.status);
    
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message,
      status: error.status
    });
  }
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OpenAI API Key present:`, !!apiKey);
  if (!apiKey) {
    console.log('⚠️  WARNING: OPENAI_API_KEY not set! Chatbot will not work.');
  }
});
