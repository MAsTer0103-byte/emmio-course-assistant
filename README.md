# EMMIO - Assistente del Master

Interfaccia web per l'Executive Master in Management of International Organizations (EMMIO) di SDA Bocconi, con Assistente AI premium per supporto informativo e operativo.

## 🚀 Features

- 🤖 **Chat AI Agent** - Assistente intelligente basato su Google Gemini 2.0 e RAG
- 📄 **Upload Documenti** - Sistema automatico di indicizzazione con embeddings
- 🔐 **Autenticazione** - Sistema sicuro tramite Supabase Auth
- 💬 **Memoria Conversazionale** - Conversazioni con contesto persistente
- 🎨 **UI Moderna** - Design responsive e accessibile con Tailwind CSS

## 🏗️ Architettura

```
Frontend (React + Vite)
  ↓
n8n Webhooks (/EMMIOagent, /EMMIOupload)
  ↓
AI Agent (Gemini 2.0) + Vector Store (Supabase)
  ↓
Knowledge Base (Google Drive + Embeddings)
```

## 📦 Installazione

```bash
# Installa dipendenze
npm install

# Avvia development server
npm run dev

# Build per produzione
npm run build
```

## 🔧 Configurazione

Crea un file `.env` nella root del progetto:

```env
VITE_SUPABASE_URL=https://dmudsneespldzeotnbjm.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=https://n8n.aiworkstream.it/webhook/EMMIOagent
VITE_N8N_UPLOAD_WEBHOOK=https://n8n.aiworkstream.it/webhook/EMMIOupload
```

## 🚢 Deploy su Vercel

### Metodo 1: Vercel CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Metodo 2: GitHub Integration

1. Pusha il codice su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Clicca "Import Project"
4. Seleziona il repository
5. Configura le Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_N8N_WEBHOOK_URL`
   - `VITE_N8N_UPLOAD_WEBHOOK`
6. Clicca "Deploy"

### Environment Variables su Vercel

Vai in **Settings → Environment Variables** e aggiungi:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://dmudsneespldzeotnbjm.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_N8N_WEBHOOK_URL` | `https://n8n.aiworkstream.it/webhook/EMMIOagent` |
| `VITE_N8N_UPLOAD_WEBHOOK` | `https://n8n.aiworkstream.it/webhook/EMMIOupload` |

## 📚 Stack Tecnologico

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: n8n Workflow Automation
- **AI**: Google Gemini 2.0 Flash + LangChain
- **Database**: Supabase (PostgreSQL + pgvector)
- **Storage**: Google Drive
- **Hosting**: Vercel

## 🎯 Funzionalità n8n Workflow

### Webhook 1: Chat (`/CHATBOTmetodorosa`)

**Input:**
```json
{
  "message": "Come funziona il Fartlek 3:1?",
  "userId": "user-001",
  "timestamp": "2025-11-26T10:00:00Z"
}
```

**Output:**
```json
{
  "output": "Il Fartlek 3:1 è uno dei 4 template...",
  "timestamp": "2025-11-26T10:00:02Z"
}
```

### Webhook 2: Upload (`/upload-file`)

**Input:**
```json
{
  "userId": "user-001",
  "fileName": "template-sedute.pdf",
  "mimeType": "application/pdf",
  "fileSize": 1048576,
  "fileData": "base64_encoded_content",
  "timestamp": "2025-11-26T10:00:00Z"
}
```

**Output:**
```json
{
  "success": true,
  "fileUrl": "https://drive.google.com/...",
  "fileName": "template-sedute.pdf",
  "message": "File caricato con successo"
}
```

## 🔐 Supabase Setup

### Database Tables

**1. `documents` (Vector Store)**
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT,
  metadata JSONB,
  embedding vector(768),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
```

**2. `uploads` (File Tracking)**
```sql
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT,
  file_url TEXT,
  mime_type TEXT,
  file_size INTEGER,
  drive_file_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Auth Setup

Abilita Email Authentication in Supabase Dashboard:
- Authentication → Providers → Email
- Configura email templates (opzionale)

## 🧪 Testing Locale

```bash
# Avvia dev server
npm run dev

# Apri browser su http://localhost:3000

# Test chat
1. Clicca su "Chat Assistente"
2. Scrivi: "Cosa è il Metodo Rosa?"
3. Verifica risposta AI

# Test upload
1. Clicca su "Carica Documenti"
2. Carica un PDF di test
3. Verifica upload su Google Drive
```

## 📄 Licenza

© 2025 Rosa Associati - Tutti i diritti riservati

---

**Developed with ❤️ for Metodo Rosa by AI Agency**
