# ✅ Pre-Deploy Checklist - Metodo Rosa AI

## 📋 Checklist Completa

### 🔧 Setup Locale

- [x] ✅ Node.js installato
- [x] ✅ Dipendenze npm installate (`npm install`)
- [x] ✅ File `.env` configurato con credenziali
- [x] ✅ Server dev funzionante (`npm run dev`)
- [x] ✅ App accessibile su http://localhost:3000

### 🎨 Frontend

- [x] ✅ Componente ChatInterface creato
- [x] ✅ Componente FileUpload creato
- [x] ✅ Componente Header con auth creato
- [x] ✅ Sistema di routing/tabs implementato
- [x] ✅ Responsive design mobile-first
- [x] ✅ Loading states implementati
- [x] ✅ Error handling implementato
- [x] ✅ Tailwind CSS configurato
- [x] ✅ Logo placeholder creato

### 🔌 Backend Integration

- [x] ✅ Webhook chat n8n testato
- [x] ✅ Webhook upload n8n testato
- [x] ✅ Supabase client configurato
- [x] ✅ Auth Supabase funzionante
- [x] ✅ API helpers creati (`lib/api.js`)
- [x] ✅ Environment variables setup

### 🧪 Testing

- [ ] ⏳ Test chat con domande reali
- [ ] ⏳ Test upload con file PDF
- [ ] ⏳ Test autenticazione Supabase
- [ ] ⏳ Test responsive su mobile
- [ ] ⏳ Test browser compatibility
- [ ] ⏳ Test performance Lighthouse

### 📚 Documentazione

- [x] ✅ README.md completo
- [x] ✅ DEPLOY.md con istruzioni deploy
- [x] ✅ API.md con documentazione webhook
- [x] ✅ EXAMPLES.md con casi d'uso
- [x] ✅ PROJECT_STATUS.md con stato progetto
- [x] ✅ VISUAL_GUIDE.md con UI/UX
- [x] ✅ test-api.html per test webhook

### 🚀 Deploy Preparation

- [x] ✅ `vercel.json` configurato
- [x] ✅ Build script funzionante (`npm run build`)
- [x] ✅ Script deploy creati (`.bat` e `.sh`)
- [ ] ⏳ Vercel CLI installato
- [ ] ⏳ Vercel account creato/login
- [ ] ⏳ Environment variables su Vercel
- [ ] ⏳ Custom domain configurato (opzionale)

### 🔐 Security

- [x] ✅ `.env` in `.gitignore`
- [x] ✅ Credenziali non hardcoded nel codice
- [x] ✅ CORS configurato nei webhook
- [ ] ⏳ Rate limiting abilitato su n8n
- [ ] ⏳ Supabase RLS policies verificate

### 📊 Monitoring

- [ ] ⏳ Google Analytics configurato (opzionale)
- [ ] ⏳ Error tracking (Sentry) configurato (opzionale)
- [ ] ⏳ Uptime monitoring configurato (opzionale)

---

## 🚀 Deploy Steps

### Step 1: Verifica Locale
```bash
# Test build
npm run build

# Preview build locale
npm run preview

# Verifica no errori console
```

### Step 2: Installa Vercel CLI
```bash
npm i -g vercel
```

### Step 3: Login Vercel
```bash
vercel login
# Inserisci email e conferma
```

### Step 4: Deploy Preview
```bash
npm run deploy
# Segui wizard:
# - Set up and deploy? Y
# - Which scope? (seleziona account)
# - Link to existing project? N
# - Project name? metodo-rosa-ai
# - In which directory? ./
# - Override settings? N
```

### Step 5: Configura Environment Variables
```bash
# Via CLI
vercel env add VITE_SUPABASE_URL
# Inserisci: https://dmudsneespldzeotnbjm.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Inserisci: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add VITE_N8N_WEBHOOK_URL
# Inserisci: https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa

vercel env add VITE_N8N_UPLOAD_WEBHOOK
# Inserisci: https://n8n.aiworkstream.it/webhook/upload-file
```

### Step 6: Deploy Production
```bash
npm run deploy:prod
```

### Step 7: Verifica Deploy
```bash
# Apri URL production
# Test chat
# Test upload
# Test auth
```

---

## ✅ Post-Deploy Checklist

### Verifica Funzionalità

- [ ] ⏳ Chat AI risponde correttamente
- [ ] ⏳ Upload file funziona
- [ ] ⏳ File vengono salvati su Google Drive
- [ ] ⏳ Embeddings vengono creati
- [ ] ⏳ Vector search funziona
- [ ] ⏳ Autenticazione Supabase funziona
- [ ] ⏳ Email conferma registrazione arriva

### Verifica Performance

- [ ] ⏳ First Contentful Paint < 1.5s
- [ ] ⏳ Time to Interactive < 3s
- [ ] ⏳ Chat response time < 5s
- [ ] ⏳ Upload processing < 30s
- [ ] ⏳ Lighthouse score > 90

### Verifica SEO

- [ ] ⏳ Meta tags presenti
- [ ] ⏳ Favicon caricato
- [ ] ⏳ Open Graph tags (opzionale)
- [ ] ⏳ Sitemap generato (opzionale)

---

## 🐛 Troubleshooting Deploy

### Errore: "Missing environment variables"

**Soluzione:**
```bash
# Verifica env su Vercel Dashboard
vercel env ls

# Re-aggiungi se mancano
vercel env add VITE_SUPABASE_URL production
```

### Errore: "Build failed"

**Soluzione:**
```bash
# Test build locale
npm run build

# Se fallisce localmente:
rm -rf node_modules dist
npm install
npm run build
```

### Errore: "Function timeout"

**Soluzione:**
```bash
# Aumenta timeout in vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

### Errore: "CORS policy"

**Soluzione:**
- Verifica CORS su n8n webhook settings
- Aggiungi Vercel domain agli allowed origins

---

## 📞 Support Contacts

### n8n Issues
- **Dashboard:** https://n8n.aiworkstream.it
- **Logs:** Check Executions tab
- **Contact:** Admin n8n instance

### Supabase Issues
- **Dashboard:** https://dmudsneespldzeotnbjm.supabase.co
- **Docs:** https://supabase.com/docs
- **Support:** support@supabase.com

### Vercel Issues
- **Dashboard:** https://vercel.com/dashboard
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support

---

## 🎯 Optional Enhancements

### SEO & Analytics
```bash
# Install Google Analytics
npm install react-ga4

# Add to App.jsx
import ReactGA from 'react-ga4';
ReactGA.initialize('G-XXXXXXXXXX');
```

### PWA Support
```bash
# Install PWA plugin
npm install vite-plugin-pwa -D

# Configure in vite.config.js
import { VitePWA } from 'vite-plugin-pwa'
```

### Custom Domain
```bash
# Via Vercel Dashboard:
# Settings → Domains → Add Domain
# Follow DNS configuration steps
```

---

## 📊 Success Metrics

### Deployment Success
- ✅ Build successful
- ✅ No console errors
- ✅ All pages load < 3s
- ✅ Chat responds < 5s
- ✅ Upload works end-to-end

### User Experience
- ✅ Mobile responsive
- ✅ Loading states visible
- ✅ Error messages clear
- ✅ Success confirmations shown

### Technical
- ✅ Lighthouse Performance > 90
- ✅ No critical vulnerabilities
- ✅ HTTPS enabled
- ✅ Env vars secure

---

**🚀 READY TO DEPLOY!**

Esegui: `npm run deploy:prod`
