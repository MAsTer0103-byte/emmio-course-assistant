# 🎨 Visual Guide - Metodo Rosa AI

## 📸 Screenshots

### 1. Homepage - Chat Interface
```
┌─────────────────────────────────────────────┐
│  [MR] Metodo Rosa                    [User] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 💬 Chat Assistente  📤 Upload  ℹ️   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 🤖 AI:                              │   │
│  │ Ciao! Sono l'assistente AI del     │   │
│  │ Metodo Rosa. Come posso aiutarti?  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│                      ┌─────────────────┐    │
│                      │ 👤 User:        │    │
│                      │ Spiegami il     │    │
│                      │ Metodo Rosa     │    │
│                      └─────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ [Scrivi messaggio...]        [Send] │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 2. Upload Interface
```
┌─────────────────────────────────────────────┐
│  [MR] Metodo Rosa                    [User] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 💬 Chat  📤 Upload  ℹ️ Info        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  📤 Carica Documenti                        │
│  Aggiungi documenti al database            │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │     📁                              │   │
│  │                                     │   │
│  │  Trascina file o clicca per        │   │
│  │  selezionare                        │   │
│  │                                     │   │
│  │  PDF, DOCX, DOC, TXT (max 10MB)    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ℹ️ I documenti vengono processati con     │
│  AI embeddings e salvati nel vector DB     │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. Info Sistema
```
┌─────────────────────────────────────────────┐
│  [MR] Metodo Rosa                    [User] │
├─────────────────────────────────────────────┤
│                                             │
│  ℹ️ Informazioni Sistema                    │
│                                             │
│  🏗️ Architettura                            │
│  ├─ Frontend: React + Vite                  │
│  ├─ Backend: n8n Workflows                  │
│  ├─ AI: Google Gemini 2.0                   │
│  └─ DB: Supabase Vector Store               │
│                                             │
│  ✨ Funzionalità                             │
│  ├─ 🤖 RAG AI Agent                         │
│  ├─ 📄 Document Processing                  │
│  ├─ 💬 Chat Persistente                     │
│  └─ 🔍 Vector Search                        │
│                                             │
│  📚 Knowledge Base                          │
│  ├─ 4 Template Sedute                       │
│  ├─ Filosofia Camp Kenya                    │
│  ├─ Parametri Monitoraggio                  │
│  └─ Storia & Atleti                         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors (Rosa Theme)
```
#E63946  ███  Rosa 500 (Primary)
#D62839  ███  Rosa 600 (Primary Hover)
#B71E2B  ███  Rosa 700 (Primary Dark)
#FDE6E7  ███  Rosa 100 (Light)
```

### Secondary Colors (Kenya Theme)
```
#22C55E  ███  Kenya 500 (Secondary)
#16A34A  ███  Kenya 600 (Secondary Hover)
#15803D  ███  Kenya 700 (Secondary Dark)
#DCFCE7  ███  Kenya 100 (Light)
```

### Neutral Colors
```
#F9FAFB  ███  Gray 50 (Background)
#E5E7EB  ███  Gray 200 (Borders)
#6B7280  ███  Gray 500 (Text Secondary)
#111827  ███  Gray 900 (Text Primary)
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
/* xs: 0-640px (default) */
.container { padding: 16px; }

/* sm: 640px+ */
@media (min-width: 640px) {
  .container { padding: 24px; }
}

/* md: 768px+ */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* lg: 1024px+ */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
}
```

---

## 🧩 Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Title
│   └── AuthButton
│       └── AuthModal
│           ├── LoginForm
│           └── SignupForm
├── TabNavigation
│   ├── ChatTab
│   ├── UploadTab
│   └── InfoTab
├── ChatInterface
│   ├── ChatHeader
│   ├── MessageList
│   │   ├── UserMessage
│   │   └── AIMessage
│   └── ChatInput
│       └── SendButton
├── FileUpload
│   ├── UploadArea
│   ├── FilePreview
│   ├── UploadButton
│   └── StatusMessage
├── SystemInfo
│   ├── ArchitectureSection
│   ├── FeaturesSection
│   └── KnowledgeBaseSection
└── Footer
```

---

## 🎭 UI States

### Loading States
```
Chat Loading:   [🔄 Sto pensando...]
Upload Loading: [📤 Caricamento in corso...]
Auth Loading:   [⏳ Accesso in corso...]
```

### Success States
```
Chat Success:   ✅ Risposta ricevuta
Upload Success: ✅ File caricato con successo
Auth Success:   ✅ Accesso effettuato
```

### Error States
```
Chat Error:     ❌ Errore nella risposta
Upload Error:   ❌ Errore upload file
Auth Error:     ❌ Credenziali non valide
```

---

## 🎯 User Flow Diagrams

### Flow 1: First Visit
```
Landing
  ↓
See Welcome Message
  ↓
Try Chat (Optional Login)
  ↓
Get AI Response
  ↓
Explore Upload Feature
  ↓
(Optional) Register
```

### Flow 2: Returning User
```
Login
  ↓
See Previous Session
  ↓
Continue Chat
  ↓
Upload New Document
  ↓
Ask Questions About New Doc
```

### Flow 3: Admin/Coach
```
Login
  ↓
Upload Training Plan
  ↓
Wait for Processing
  ↓
Test Knowledge Retrieval
  ↓
Share with Athletes
```

---

## 🔤 Typography

```css
/* Headings */
h1: font-size: 2.5rem; font-weight: 700;
h2: font-size: 2rem; font-weight: 700;
h3: font-size: 1.5rem; font-weight: 600;

/* Body */
body: font-size: 1rem; line-height: 1.5;
small: font-size: 0.875rem;

/* Code */
code: font-family: 'Courier New', monospace;
```

---

## 🖼️ Icons Usage

### Lucide Icons Mapping
```javascript
MessageCircle - Chat
Upload - File Upload
User - Profile
LogOut/LogIn - Auth
Send - Send Message
FileText - Document
CheckCircle - Success
AlertCircle - Error
Loader2 - Loading (animated)
Activity - Stats/Info
X - Close/Remove
```

---

## 📐 Layout Grid

```
Desktop (1200px):
┌─────────────────────────────────────┐
│ Header (Full Width)                 │
├────────────┬────────────────────────┤
│ Sidebar    │  Main Content          │
│ (25%)      │  (75%)                 │
│            │                        │
└────────────┴────────────────────────┘

Mobile (< 768px):
┌──────────────┐
│ Header       │
├──────────────┤
│ Tab Nav      │
├──────────────┤
│ Main Content │
│ (Full Width) │
│              │
└──────────────┘
```

---

## 🎬 Animations

### CSS Transitions
```css
/* Button Hover */
transition: background-color 0.2s ease;

/* Loading Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 🌐 Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
⚠️ IE11 (Not Supported)

---

**🎨 Design System Complete!**
