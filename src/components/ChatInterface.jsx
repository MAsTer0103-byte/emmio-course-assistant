import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MessageCircle, Send, Loader2 } from 'lucide-react'
import { sendChatMessage } from '../lib/api'

export default function ChatInterface() {
  const listRef = useRef(null)
  const endRef = useRef(null)
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: '### Benvenuto nell\'Assistente del Master EMMIO\n\n**Executive Master in Management of International Organizations**\n*SDA Bocconi School of Management*\n\n---\n\nSono qui per supportarti con informazioni su:\n\n**📚 Programma**\n• Struttura part-time 9 mesi (compatibile con impiego full-time)\n• 40 ECTS – Livello EQF 7\n• Moduli, faculty e metodologie didattiche\n\n**🌍 Competenze Chiave**\n• Gestione nel sistema multilaterale (UN, IFI, IGO, ONG)\n• Leadership per organizzazioni internazionali\n• Applicazioni pratiche a sfide gestionali quotidiane\n\n**💼 Ammissione & Opportunità**\n• Requisiti e processo di candidatura\n• Borse di studio e agevolazioni\n• Career opportunities post-master\n\n---\n\n[📖 Approfondisci il Master EMMIO →](https://www.sdabocconi.it/it/master-specialistici-full-time-executive/emmio)\n\n**Come posso aiutarti oggi?**',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  const updateMessageStatus = (id, status) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status } : msg))
  }

  // Rileva se l'utente sta scorrendo manualmente: abilita autoscroll solo se vicino al fondo
  const handleScroll = () => {
    const el = listRef.current
    if (!el) return
    const threshold = 120 // px dal fondo
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    const nearBottom = distanceFromBottom < threshold
    setAutoScrollEnabled(nearBottom)
  }

  // Auto-scroll ogni volta che cambiano i messaggi o lo stato di caricamento
  useEffect(() => {
    if (!autoScrollEnabled) return
    // Preferisci scrollIntoView del marker finale per compatibilità
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    // In fallback, forza scroll sulla lista
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isLoading, autoScrollEnabled])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessageId = Date.now().toString()
    const userMessage = {
      id: userMessageId,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await sendChatMessage(userMessage.content)
      console.log('Received response:', response)
      updateMessageStatus(userMessageId, 'sent')
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.output || response.text || 'Mi dispiace, non ho ricevuto una risposta.',
        timestamp: new Date()
      }

      // Non auto-scorrere alla fine quando arriva la risposta AI,
      // così l'utente resta all'inizio del messaggio generato.
      setMessages(prev => [...prev, aiMessage])
      setAutoScrollEnabled(false)
    } catch (error) {
      console.error('Chat error:', error)
      updateMessageStatus(userMessageId, 'error')
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Si è verificato un errore. Riprova tra qualche istante.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rosa-500 to-rosa-600 px-6 py-4 text-white shadow-md rounded-t-xl">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          <div>
            <h2 className="font-bold text-lg">Assistente del Master EMMIO</h2>
            <p className="text-sm text-white/90">SDA Bocconi • EMMIO</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} onScroll={handleScroll} className="relative flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`chat-bubble ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h2 className="font-semibold text-lg mt-4 mb-2 uppercase" {...props} />,
                    h2: ({node, ...props}) => <h3 className="font-semibold text-base mt-4 mb-2 uppercase" {...props} />,
                    h3: ({node, ...props}) => <h4 className="font-semibold text-sm mt-3 mb-2 uppercase" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    p: ({node, ...props}) => <p className="leading-relaxed mb-3" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                    table: ({node, ...props}) => <table className="w-full text-sm my-3 border border-gray-300" {...props} />,
                    thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                    th: ({node, ...props}) => <th className="border border-gray-300 px-2 py-1 font-semibold" {...props} />,
                    td: ({node, ...props}) => <td className="border border-gray-300 px-2 py-1" {...props} />,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              )}
              <span className={`text-xs mt-1 block ${
                msg.role === 'user' ? 'text-white/80' : 'text-gray-500'
              }`}>
                {msg.timestamp.toLocaleTimeString('it-IT', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              {msg.role === 'user' && msg.status && (
                <span className="text-[11px] mt-0.5 block text-white/80">
                  {msg.status === 'sent' && 'Inviato'}
                  {msg.status === 'sending' && 'Invio...'}
                  {msg.status === 'error' && 'Errore invio'}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble chat-bubble-ai flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sto pensando...</span>
            </div>
          </div>
        )}

        {/* Marker per auto-scroll */}
        <div ref={endRef} />

        {/* Pulsante per tornare ai nuovi messaggi quando autoscroll è disattivato */}
        {!autoScrollEnabled && (
          <div className="sticky bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => {
                setAutoScrollEnabled(true)
                endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
              }}
              className="pointer-events-auto px-4 py-2 text-sm font-medium rounded-full bg-white/95 text-gray-800 shadow-lg border border-gray-300 backdrop-blur hover:bg-white"
            >
              Vai all'ultimo messaggio
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="btn-primary flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Invia</span>
          </button>
        </div>
      </form>
    </div>
  )
}
