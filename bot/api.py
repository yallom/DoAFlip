# bot/api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import os
import sys

# Garante que consegue importar da mesma pasta
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Importa o query_engine que já existe no teu query_nutrition.py
try:
    from query_nutrition import query_engine
except ImportError as e:
    print("ERRO AO IMPORTAR query_engine:", e)
    raise

app = FastAPI(
    title="NutriAI - API RAG",
    description="Endpoint para o chatbot de nutrição",
)

# CORS – permite que o frontend (localhost:5173, 3000, etc.) chame a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",       # Vite/React dev server comum
        "http://127.0.0.1:5173",
        "http://localhost:8080",       # se usares outro porto
        "*"                            # ← temporário para testes (remove em produção!)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MensagemRequest(BaseModel):
    mensagem: str

class RespostaChat(BaseModel):
    resposta: str
    erro: str | None = None

@app.post("/chat", response_model=RespostaChat)
async def conversar(request: MensagemRequest):
    if not request.mensagem.strip():
        raise HTTPException(status_code=400, detail="Mensagem vazia não permitida")

    try:
        # Executa a query de forma não bloqueante
        resultado = await asyncio.to_thread(query_engine.query, request.mensagem.strip())
        texto_resposta = str(resultado).strip()
        
        return RespostaChat(resposta=texto_resposta)
    
    except Exception as e:
        import traceback
        traceback.print_exc()  # mostra o erro completo no terminal
        return RespostaChat(
            resposta="",
            erro=f"Erro no RAG: {str(e)[:180]}..."
        )

@app.get("/health")
async def verificar_saude():
    return {
        "status": "ok",
        "rag_carregado": query_engine is not None,
        "modelo": "qwen2.5 via Ollama"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)