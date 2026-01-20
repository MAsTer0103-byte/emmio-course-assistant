import { useState } from 'react'
import Header from './components/Header'
import ChatInterface from './components/ChatInterface'
import FileUpload from './components/FileUpload'
import { MessageCircle, Upload } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'upload'
  const [user, setUser] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAuthChange={setUser} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white/70 backdrop-blur rounded-xl p-1 shadow-lg border border-white/50">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-rosa-500 to-rosa-600 text-white shadow'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Chat Assistente</span>
            <span className="sm:hidden">Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-kenya-500 to-kenya-600 text-white shadow'
                : 'text-gray-700 hover:bg-white/80'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">Carica Documenti</span>
            <span className="sm:hidden">Upload</span>
          </button>

          {/* Tab Info Sistema rimosso su richiesta */}
        </div>

        {/* Tab Content */}
        <div className="h-[calc(100vh-280px)] sm:h-[calc(100vh-240px)]">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'upload' && <FileUpload />}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>
            © 2026 EMMIO – Executive Master in Management of International Organizations | 
            <a href="https://www.sdabocconi.it/it/master-specialistici-full-time-executive/emmio" target="_blank" rel="noopener noreferrer" className="text-rosa-500 hover:underline ml-1">
              SDA Bocconi School of Management
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

// SystemInfo rimosso su richiesta

export default App
