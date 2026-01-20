#!/bin/bash

# Script di deploy automatico per Vercel
# Uso: ./deploy.sh [production|preview]

ENV=${1:-preview}

echo "🚀 Deploy Metodo Rosa AI su Vercel"
echo "=================================="

# Verifica se Vercel CLI è installato
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI non trovato"
    echo "📦 Installazione in corso..."
    npm i -g vercel
fi

# Login a Vercel
echo "🔐 Login a Vercel..."
vercel login

# Deploy
if [ "$ENV" = "production" ]; then
    echo "🌍 Deploy PRODUCTION in corso..."
    vercel --prod \
        -e VITE_SUPABASE_URL=https://dmudsneespldzeotnbjm.supabase.co \
        -e VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
        -e VITE_N8N_WEBHOOK_URL=https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa \
        -e VITE_N8N_UPLOAD_WEBHOOK=https://n8n.aiworkstream.it/webhook/upload-file
else
    echo "🔍 Deploy PREVIEW in corso..."
    vercel \
        -e VITE_SUPABASE_URL=https://dmudsneespldzeotnbjm.supabase.co \
        -e VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
        -e VITE_N8N_WEBHOOK_URL=https://n8n.aiworkstream.it/webhook/CHATBOTmetodorosa \
        -e VITE_N8N_UPLOAD_WEBHOOK=https://n8n.aiworkstream.it/webhook/upload-file
fi

echo "✅ Deploy completato!"
