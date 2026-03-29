const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inițializăm clientul OpenAI cu Kimi
const kimi = new OpenAI({
  apiKey: process.env.KIMI_API_KEY || process.env.VITE_KIMI_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1',
  timeout: 60000,
  maxRetries: 2
});

// System prompt pentru chatbot
const SYSTEM_PROMPT = `Ești asistentul AI Digital Solutions - o companie românească de automatizări și software.

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
- Îndeamnă la contact pe WhatsApp pentru oferte personalizate`;

// Endpoint pentru chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mesajele sunt necesare' });
    }

    console.log('[Server] Received chat request with', messages.length, 'messages');

    // Construim mesajele pentru Kimi
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    console.log('[Server] Calling Kimi API with OpenAI SDK...');

    // Apelăm API-ul Kimi folosind OpenAI SDK
    const response = await kimi.chat.completions.create({
      model: 'kimi-k2-5',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 800
    });

    const reply = response.choices[0].message.content;
    
    console.log('[Server] Kimi response received');
    res.json({ reply });
    
  } catch (error) {
    console.error('[Server] Error:', error.message);
    console.error('[Server] Error status:', error.status);
    console.error('[Server] Error code:', error.code);
    
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message,
      status: error.status,
      code: error.code
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
  console.log(`Kimi API Key present:`, !!process.env.KIMI_API_KEY);
});
