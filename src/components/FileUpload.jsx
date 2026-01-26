import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react'
import { uploadFile } from '../lib/api'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null) // 'success' | 'error' | null
  const [uploadMessage, setUploadMessage] = useState('')
  const [toast, setToast] = useState(null)

  const acceptedTypes = {
    'application/pdf': '.pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/msword': '.doc',
    'text/plain': '.txt'
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus(null)
      setUploadMessage('')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus(null)
    setUploadMessage('')

    try {
      const response = await uploadFile(file)
      
      if (response.success) {
        setUploadStatus('success')
        setUploadMessage(response.message || 'File caricato con successo!')
        setToast({ type: 'success', message: response.message || 'File caricato con successo!' })
        setTimeout(() => {
          setFile(null)
          setUploadStatus(null)
        }, 3000)
      } else {
        throw new Error(response.message || 'Errore durante il caricamento')
      }
    } catch (error) {
      setUploadStatus('error')
      const msg = error.message || 'Errore durante il caricamento del file'
      setUploadMessage(msg)
      setToast({ type: 'error', message: msg })
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setUploadStatus(null)
    setUploadMessage('')
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-kenya-500" />
        <div>
          <h2 className="font-bold text-lg text-gray-800">Carica Documenti</h2>
          <p className="text-sm text-gray-500">
            Aggiungi documenti alla knowledge base EMMIO
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        {!file ? (
          <label className="block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-kenya-500 hover:bg-kenya-50 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium mb-1">
                Trascina un file qui o clicca per selezionare
              </p>
              <p className="text-sm text-gray-400">
                PDF, DOCX, DOC, TXT (max 10MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept={Object.values(acceptedTypes).join(',')}
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-10 h-10 text-kenya-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={removeFile}
                disabled={uploading}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {file && !uploadStatus && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Caricamento in corso...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Carica nel Database</span>
              </>
            )}
          </button>
        )}

        {/* Status Message */}
        {uploadStatus && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              uploadStatus === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {uploadStatus === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{uploadMessage}</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Nota:</strong> I documenti caricati vengono processati
          automaticamente tramite embedding AI e salvati nel vector database
          Supabase per migliorare le risposte dell'assistente.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`rounded-lg px-4 py-3 shadow-lg border text-sm flex items-start gap-2 max-w-sm ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            <span className="font-semibold">{toast.type === 'error' ? 'Errore' : 'OK'}</span>
            <span className="leading-snug">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-auto text-xs text-gray-500 hover:text-gray-700"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
