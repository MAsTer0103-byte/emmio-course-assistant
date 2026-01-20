import { useState, useEffect } from 'react'
import { User, LogOut, LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Header({ onAuthChange }) {
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!supabase) return
    // Verifica sessione esistente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      onAuthChange?.(session?.user ?? null)
    })

    // Listener per cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      onAuthChange?.(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [onAuthChange])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rosa-500 to-rosa-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              EM
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">EMMIO – SDA Bocconi</h1>
              <p className="text-sm text-gray-500">Assistente del Master EMMIO</p>
            </div>
            <img src="/sda-bocconi-logo.svg" alt="SDA Bocconi" className="h-8 hidden sm:block" />
          </div>

          <div className="flex items-center gap-4">
            {supabase && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-rosa-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Esci</span>
                </button>
              </div>
            ) : supabase ? (
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Accedi</span>
              </button>
            ) : (
              <div className="text-sm text-gray-300">
                Modalità ospite attiva (Supabase non configurato)
              </div>
            )}
          </div>
        </div>
      </header>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  )
}

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        onClose()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) throw error
        setMessage('Controlla la tua email per confermare la registrazione!')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Accedi' : 'Registrati'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
          </div>

          {message && (
            <div className={`text-sm p-3 rounded-lg ${
              message.includes('Controlla') 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Caricamento...' : (isLogin ? 'Accedi' : 'Registrati')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-rosa-500 hover:text-rosa-600"
          >
            {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
          </button>
        </div>
      </div>
    </div>
  )
}
