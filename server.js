const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

    const apiKey = process.env.KIMI_API_KEY || process.env.VITE_KIMI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key not configured' });
    }

    // Construim mesajele pentru Kimi
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    console.log('[Server] Calling Kimi API with', apiMessages.length, 'messages');

    // Apelăm API-ul Kimi
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'kimi-k2-5',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Server] Kimi API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Kimi API error', 
        details: errorText 
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    console.log('[Server] Kimi response received');
    res.json({ reply });
    
  } catch (error) {
    console.error('[Server] Error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
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
});
