# 💡 Esempi di Utilizzo - Metodo Rosa AI

## 🗨️ Esempi Domande Chat

### Domande sui Template di Seduta

```
"Spiegami il template Progression Run"
"Come funziona il Fartlek 3:1?"
"Qual è la differenza tra Lungo Collinare e Ripetute Soglia?"
"Quanti template di seduta esistono nel Metodo Rosa?"
```

### Domande sulla Periodizzazione

```
"Come funziona la periodizzazione 3 up 1 down?"
"Quando fare lo scarico?"
"Come progressi il volume di allenamento?"
"Quanti km a settimana per un maratoneta?"
```

### Domande sul Monitoraggio

```
"Come si usa la scala RPE?"
"Quali sono i parametri fisiologici da monitorare?"
"Quando misurare la frequenza cardiaca?"
"Come interpretare i valori di HRV?"
```

### Domande sulla Filosofia

```
"Racconta la storia del Metodo Rosa"
"Perché allenarsi in Kenya?"
"Chi è Paul Tergat?"
"Come funzionano i camp in altura?"
```

### Domande su Etica e Anti-Doping

```
"Qual è la politica anti-doping del Metodo Rosa?"
"Come vengono fatti i controlli?"
"Cosa rende il metodo eticamente superiore?"
```

---

## 📤 Esempi Upload File

### File Supportati

**PDF Example:**
```javascript
// Upload template-sedute.pdf
const file = document.getElementById('input').files[0];
// Il sistema:
// 1. Carica su Google Drive
// 2. Crea embeddings con Gemini
// 3. Salva in Supabase Vector Store
// 4. Rende disponibile per RAG
```

**DOCX Example:**
```javascript
// Upload piano-allenamento.docx
// Contenuto automaticamente:
// - Splittato per pagine
// - Convertito in embeddings
// - Indicizzato semanticamente
```

**TXT Example:**
```javascript
// Upload note-camp-kenya.txt
// Testo processato e reso ricercabile
```

---

## 🔗 Esempi Integrazione API

### JavaScript/React

```javascript
import { sendChatMessage, uploadFile } from './lib/api';

// Chat
const response = await sendChatMessage('Spiegami il Fartlek 3:1');
console.log(response.output);

// Upload
const file = event.target.files[0];
const result = await uploadFile(file);
console.log(result.fileUrl);
```

### Python

```python
import requests
import base64

# Chat
def send_message(message):
    url = "https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa"
    payload = {"message": message, "userId": "python-user"}
    response = requests.post(url, json=payload)
    return response.json()

# Upload
def upload_document(file_path):
    url = "https://n8n.aiworkstream.it/webhook/upload-file"
    
    with open(file_path, 'rb') as f:
        base64_data = base64.b64encode(f.read()).decode('utf-8')
    
    payload = {
        "userId": "python-user",
        "fileName": file_path.split('/')[-1],
        "mimeType": "application/pdf",
        "fileSize": os.path.getsize(file_path),
        "fileData": base64_data
    }
    
    response = requests.post(url, json=payload)
    return response.json()

# Uso
result = send_message("Cosa è il Metodo Rosa?")
print(result['output'])
```

### cURL

```bash
# Chat
curl -X POST https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Spiegami la periodizzazione",
    "userId": "cli-user"
  }'

# Upload
BASE64_DATA=$(base64 -w 0 documento.pdf)
curl -X POST https://n8n.aiworkstream.it/webhook/upload-file \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"cli-user\",
    \"fileName\": \"documento.pdf\",
    \"mimeType\": \"application/pdf\",
    \"fileSize\": $(stat -f%z documento.pdf),
    \"fileData\": \"$BASE64_DATA\"
  }"
```

---

## 🎯 Scenari d'Uso

### Scenario 1: Atleta Cerca Info

```
1. Apre app
2. Va su "Chat Assistente"
3. Chiede: "Come prepararsi per una maratona?"
4. AI risponde con plan basato su documenti
5. Atleta fa follow-up: "Quali sono le sedute chiave?"
6. AI risponde citando i 4 template
```

### Scenario 2: Coach Carica Piano

```
1. Coach va su "Carica Documenti"
2. Upload "piano-maratona-2025.pdf"
3. Sistema processa e indicizza
4. Coach testa: "Dimmi cosa c'è nel piano 2025"
5. AI recupera info dal documento appena caricato
```

### Scenario 3: Staff Ricerca Storica

```
1. Staff chiede: "Chi ha vinto la maratona di Londra 2003?"
2. AI cerca nei documenti storici
3. Risponde con info su Paul Tergat o altri atleti
4. Staff chiede: "Che allenamento faceva?"
5. AI recupera template e progressioni storiche
```

---

## 🧠 Esempi Risposte AI

### Risposta Completa Template

**Domanda:** "Spiegami il Fartlek 3:1"

**Risposta AI:**
```
Il Fartlek 3:1 è uno dei 4 template fondamentali del Metodo Rosa.

STRUTTURA:
• Rapporto lavoro-recupero: 3 minuti intensi, 1 minuto blando
• Ritmo intenso: ~90% FCmax (RPE 7-8)
• Recupero: jogging leggero (RPE 3-4)
• Ripetizioni: 8-12 cicli

PROGRESSIONE:
Settimana 1-3: 8 cicli
Settimana 4: Scarico (5 cicli)
Settimana 5-7: 10 cicli
Settimana 8: Scarico (6 cicli)

BENEFICI:
✓ Migliora soglia anaerobica
✓ Sviluppa resistenza aerobica
✓ Adattamento fisiologico Kenya-style

FONTE: Template 2 - Fartlek Kenyano, Metodo Rosa Database
```

### Risposta Storica

**Domanda:** "Chi è Paul Tergat?"

**Risposta AI:**
```
Paul Tergat è uno degli atleti simbolo del Metodo Rosa.

CARRIERA:
• 5x Campione del Mondo Cross Country (1995-1999)
• Record mondiale maratona: 2:04:55 (Berlino 2003)
• Allenato da Gabriele Rosa dal 1990

METODO:
Tergat ha seguito il Metodo Rosa per tutta la carriera:
• Training camp in Kenya (Kaptagat)
• Periodizzazione 3 up 1 down
• 4 template di seduta core
• Monitoraggio fisiologico costante

EREDITÀ:
Ha dimostrato l'efficacia del metodo scientifico Rosa
combinato con la filosofia camp-based kenyota.

FONTE: Storia Atleti Elite, Archivio Metodo Rosa
```

---

## 🔄 Flussi di Conversazione

### Flusso 1: Approfondimento Progressivo

```
User: "Cosa è il Metodo Rosa?"
AI: [Risposta generale su filosofia e storia]

User: "Quali sono i template di seduta?"
AI: [Lista 4 template con descrizioni brevi]

User: "Approfondisci il Lungo Collinare"
AI: [Dettagli su durata, ritmo, dislivello, progressioni]

User: "Mostrami un esempio settimanale"
AI: [Micro-piano settimanale con 4 sedute]
```

### Flusso 2: Troubleshooting

```
User: "Come evitare infortuni?"
AI: [Principi progressione, scarico, monitoraggio]

User: "Cosa fare se ho dolore al ginocchio?"
AI: [Rimanda a staff medico + suggerisce riduzione carico]

User: "Come tornare dopo uno stop?"
AI: [Protocollo rientro graduale con volumi ridotti]
```

---

## 📊 Metriche di Successo

### KPI Chatbot

- **Response Time:** < 3 secondi
- **Answer Accuracy:** Basato su documenti (no allucinazioni)
- **User Satisfaction:** Rating dopo ogni risposta
- **Conversation Length:** Media 5-8 messaggi

### KPI Upload

- **Upload Success Rate:** > 95%
- **Processing Time:** < 30 secondi per documento
- **Indexing Quality:** Precision@5 > 90%
- **Storage Efficiency:** Embeddings compressi

---

## 🎨 Personalizzazioni Future

### Custom Branding
```javascript
// Cambia colori in tailwind.config.js
colors: {
  primary: '#TUO-COLORE',
  secondary: '#TUO-COLORE-2'
}
```

### Add New Features
```javascript
// Aggiungi export chat in PDF
// Aggiungi voice input
// Aggiungi training plans generator
```

---

**🚀 Ready to Use!**
