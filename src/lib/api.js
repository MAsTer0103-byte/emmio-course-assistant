const CHAT_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.aiworkstream.it/webhook/EMMIOagent'
const UPLOAD_WEBHOOK = import.meta.env.VITE_N8N_UPLOAD_WEBHOOK || 'https://n8n.aiworkstream.it/webhook/EMMIOupload'

export async function sendChatMessage(message, userId = 'user-001') {
  try {
    console.log('CHAT_WEBHOOK URL:', CHAT_WEBHOOK)
    
    if (!CHAT_WEBHOOK) {
      throw new Error('VITE_N8N_WEBHOOK_URL non configurato')
    }
    
    const response = await fetch(CHAT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userId,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Chat webhook response:', data)
    
    // Normalizza possibili forme di risposta dal webhook n8n
    // Il workflow potrebbe restituire un array o un oggetto diretto
    let output = ''
    
    if (Array.isArray(data)) {
      // Se è un array, prendi il primo elemento
      const firstItem = data[0]
      output = firstItem?.output ?? firstItem?.text ?? firstItem?.message ?? ''
    } else if (typeof data === 'object') {
      // Se è un oggetto diretto
      output = data.output ?? data.text ?? data.message ?? data.response ?? ''
    } else if (typeof data === 'string') {
      // Se è una stringa diretta
      output = data
    }
    
    return {
      output,
      raw: data
    }
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function uploadFile(file, userId = 'user-001') {
  try {
    // Leggi il file come base64
    const base64 = await fileToBase64(file)
    
    const payload = {
      userId,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      fileData: base64.split(',')[1], // Rimuovi il prefisso data:mime;base64,
      timestamp: new Date().toISOString()
    }

    console.log('Upload payload:', { ...payload, fileData: '...' })

    const response = await fetch(UPLOAD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Leggi la risposta come testo prima per debugging
    const responseText = await response.text()
    console.log('Upload response text:', responseText)
    
    // Se la risposta è vuota, ritorna successo con default
    if (!responseText || responseText.trim() === '') {
      console.warn('Webhook returned empty response')
      return {
        success: true,
        message: 'File caricato (risposta webhook vuota)',
        fileName: file.name
      }
    }
    
    // Tenta di parsare come JSON
    try {
      const data = JSON.parse(responseText)
      return data
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
      console.error('Response was:', responseText)
      // Se non è JSON valido, ritorna errore dettagliato
      return {
        success: false,
        message: 'Risposta non valida dal webhook',
        raw: responseText
      }
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
