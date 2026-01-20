# 📡 API Documentation - n8n Webhooks

## Base URL
```
https://n8n.aiworkstream.it/webhook
```

---

## 🗨️ Chat Endpoint

### POST `/EMMIOagent`

Invia un messaggio all'AI Agent EMMIO.

#### Request

```http
POST /webhook/EMMIOagent
Content-Type: application/json

{
  "message": "Come funziona il Fartlek 3:1?",
  "userId": "user-001",
  "timestamp": "2025-11-26T10:30:00Z"
}
```

#### Request Body Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | ✅ | Domanda/messaggio utente |
| `userId` | string | ❌ | ID utente (default: "user-001") |
| `timestamp` | string | ❌ | ISO 8601 timestamp |

#### Response

```json
{
  "output": "Il Fartlek 3:1 è uno dei 4 template fondamentali del Metodo Rosa. Si tratta di una seduta di variazioni con rapporto lavoro-recupero di 3:1...",
  "timestamp": "2025-11-26T10:30:02.145Z"
}
```

#### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `output` | string | Risposta generata dall'AI Agent |
| `timestamp` | string | Timestamp della risposta |

#### Example (cURL)

```bash
curl -X POST https://n8n.aiworkstream.it/webhook/EMMIOagent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Spiegami la periodizzazione 3 up 1 down",
    "userId": "user-123"
  }'
```

#### Example (JavaScript)

```javascript
const response = await fetch('https://n8n.aiworkstream.it/webhook/EMMIOagent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Quali sono i 4 template di seduta?',
    userId: 'user-123'
  })
});

const data = await response.json();
console.log(data.output);
```

---

## 📤 Upload Endpoint

### POST `/EMMIOupload`

Carica un documento nel sistema per l'indicizzazione automatica.

#### Request

```http
POST /webhook/EMMIOupload
Content-Type: application/json

{
  "userId": "user-001",
  "fileName": "template-sedute.pdf",
  "mimeType": "application/pdf",
  "fileSize": 1048576,
  "fileData": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMi...",
  "timestamp": "2025-11-26T11:00:00Z"
}
```

#### Request Body Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | ✅ | ID utente |
| `fileName` | string | ✅ | Nome file con estensione |
| `mimeType` | string | ✅ | MIME type (es. application/pdf) |
| `fileSize` | number | ✅ | Dimensione in bytes |
| `fileData` | string | ✅ | File codificato in Base64 |
| `timestamp` | string | ❌ | ISO 8601 timestamp |

#### Supported MIME Types

- `application/pdf` - PDF
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document` - DOCX
- `application/msword` - DOC
- `text/plain` - TXT

#### Response (Success)

```json
{
  "success": true,
  "fileUrl": "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view",
  "fileName": "template-sedute.pdf",
  "message": "File caricato con successo"
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "File size exceeds 10MB limit",
  "message": "Upload fallito"
}
```

#### Example (cURL)

```bash
# Converti file in base64
BASE64_DATA=$(base64 -w 0 template.pdf)

curl -X POST https://n8n.aiworkstream.it/webhook/EMMIOupload \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"user-123\",
    \"fileName\": \"template.pdf\",
    \"mimeType\": \"application/pdf\",
    \"fileSize\": $(stat -f%z template.pdf),
    \"fileData\": \"$BASE64_DATA\"
  }"
```

#### Example (JavaScript)

```javascript
// Converti File in Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}

// Upload
const file = document.getElementById('fileInput').files[0];
const base64 = await fileToBase64(file);

const response = await fetch('https://n8n.aiworkstream.it/webhook/upload-file', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-123',
    fileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    fileData: base64
  })
});

const result = await response.json();
console.log(result.message);
```

---

## 🔄 Workflow Pipeline

### Chat Flow
```
User Message → Webhook2 
  ↓
AI Agent (Gemini 2.0)
  ↓
Vector Store Retrieval (Supabase)
  ↓
RAG Response Generation
  ↓
Respond to Webhook2 → User
```

### Upload Flow
```
File Upload → Webhook
  ↓
Code: Parse Base64 → Binary
  ↓
Google Drive Upload
  ↓
Supabase: Create Upload Record
  ↓
Google Drive Download
  ↓
Document Loader (Split Pages)
  ↓
Gemini Embeddings
  ↓
Supabase Vector Store Insert
  ↓
Respond to Webhook → User
```

---

## 🛡️ Security & Limits

### Rate Limiting
- **Chat**: 60 richieste/minuto per IP
- **Upload**: 10 richieste/minuto per userId

### File Limits
- **Max Size**: 10 MB
- **Allowed Types**: PDF, DOCX, DOC, TXT
- **Max Pages**: 100 pagine per documento

### Authentication
- Non richiesta per webhook pubblici
- Supabase RLS policies proteggono i dati utente

---

## 🧪 Testing

### Test Chat (Postman)
```
POST https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa
Body (JSON):
{
  "message": "Test message"
}
```

### Test Upload (Postman)
```
POST https://n8n.aiworkstream.it/webhook/upload-file
Body (JSON):
{
  "userId": "test",
  "fileName": "test.txt",
  "mimeType": "text/plain",
  "fileSize": 100,
  "fileData": "SGVsbG8gV29ybGQh"
}
```

---

## 📞 Support

- **n8n Instance**: https://n8n.aiworkstream.it
- **Webhook Logs**: Check n8n Executions tab
- **Error Tracking**: Console logs + n8n error nodes

---

**🔗 Integration Ready!**
