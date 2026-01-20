# 🚀 Quick Start Guide - EMMIO AI

## ⚡ Installazione Rapida

```bash
# 1. Installa dipendenze
npm install

# 2. Avvia applicazione
npm run dev
```

L'app sarà disponibile su **http://localhost:3000**

---

## 📋 Deploy su Vercel (3 minuti)

### Opzione A: Deploy Automatico (Consigliato)

1. **Installa Vercel CLI**
```bash
npm i -g vercel
```

2. **Login a Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd "c:\Users\luana\Desktop\AI AGENCY\PROGETTI\METODO ROSA"
vercel
```

4. **Configura Environment Variables** quando richiesto:
   - `VITE_SUPABASE_URL` → `https://dmudsneespldzeotnbjm.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` → (copia da .env)
   - `VITE_N8N_WEBHOOK_URL` → `https://n8n.aiworkstream.it/webhook/EMMIOagent`
   - `VITE_N8N_UPLOAD_WEBHOOK` → `https://n8n.aiworkstream.it/webhook/EMMIOupload`

5. **Deploy Production**
```bash
vercel --prod
```

✅ **FATTO!** L'app è online!

---

### Opzione B: Deploy via Dashboard

1. Vai su [vercel.com/new](https://vercel.com/new)
2. Connetti GitHub e importa il repo
3. Aggiungi Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://dmudsneespldzeotnbjm.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtdWRzbmVlc3BsZHplb3RuYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzAyNjgsImV4cCI6MjA3OTY0NjI2OH0.OewR06XFwUNc8pjWtKMT80iLXZAXLTGWGAuB6ltiiKw` |
| `VITE_N8N_WEBHOOK_URL` | `https://n8n.aiworkstream.it/webhook/EMMIOagent` |
| `VITE_N8N_UPLOAD_WEBHOOK` | `https://n8n.aiworkstream.it/webhook/EMMIOupload` |

4. Clicca **Deploy**

---

## 🧪 Test Funzionalità

### Test Chat AI
```
1. Apri l'app
2. Tab "Chat Assistente"
3. Scrivi: "Spiegami il Metodo Rosa"
4. ✅ Dovresti ricevere risposta dall'AI
```

### Test Upload File
```
1. Tab "Carica Documenti"
2. Seleziona un PDF di test
3. Clicca "Carica nel Database"
4. ✅ Dovresti vedere conferma upload
```

### Test Autenticazione
```
1. Clicca "Accedi" (header)
2. Registrati con email
3. ✅ Riceverai email di conferma
```

---

## 🔧 Troubleshooting

### Errore: "Missing environment variables"
```bash
# Verifica che .env esista
type .env

# Se manca, crealo:
copy con .env
# Incolla le variabili e premi Ctrl+Z poi Invio
```

### Errore: "Failed to fetch webhook"
```bash
# Verifica connessione n8n
curl https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa

# Se fallisce, contatta admin n8n
```

### Build Vercel fallisce
```bash
# Verifica package.json ha script "build"
npm run build

# Se funziona localmente, problema è env variables
```

---

## 📞 Supporto

- **Documentazione completa:** Vedi `README.md`
- **n8n Workflow:** Già configurato e attivo
- **Supabase:** Database già setup
- **Vercel:** Deploy automatico da Git push

---

**🎉 Il progetto è pronto per il deploy!**
