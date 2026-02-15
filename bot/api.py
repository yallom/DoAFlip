from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from llama_index.core import Settings, PromptTemplate
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
import pickle
import os
import json

app = Flask(__name__)
CORS(app)  # Permite requests do frontend

# Configuração do LLM (igual ao teu código)
Settings.llm = Ollama(
    model="qwen2.5:3b-instruct",
    request_timeout=600.0,
    options={"num_ctx": 8192}
)

Settings.embed_model = OllamaEmbedding(
    model_name="nomic-embed-text"
)

qa_prompt_tmpl = PromptTemplate(
    "Você é um assistente especializado em nutrição e alimentação saudável.\n"
    "Responda sempre de forma clara, objetiva e em português europeu.\n"
    "Use linguagem acessível, evite jargão técnico desnecessário e seja útil para utilizadores de uma app de nutrição.\n"
    "Baseie-se exclusivamente nos dados fornecidos no contexto.\n"
    "Use no MÁXIMO 5 frases. Seja direto ao ponto.\n"
    "Se a pergunta for sobre substituições, considere alergias, restrições dietéticas e perfis nutricionais semelhantes.\n"
    "Se não tiver informação suficiente, diga-o de forma educada e sugira o que o utilizador pode fazer.\n\n"
    "Contexto extraído dos dados:\n{context_str}\n\n"
    "Pergunta do utilizador: {query_str}\n\n"
    "Resposta:"
)

# Carrega o índice ao iniciar
print("A carregar o índice RAG...")
try:
    with open("nutrition_index_complete.pkl", "rb") as f:
        index = pickle.load(f)
    query_engine = index.as_query_engine(
        text_qa_template=qa_prompt_tmpl,
        similarity_top_k=6,
        streaming=True,
    )
    print("Índice carregado com sucesso!")
except Exception as e:
    print(f"Erro ao carregar índice: {e}")
    query_engine = None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "index_loaded": query_engine is not None})

@app.route('/chat', methods=['POST'])
def chat():
    if not query_engine:
        return jsonify({"error": "Query engine não está carregado"}), 500
    
    data = request.json
    pergunta = data.get('message', '').strip()
    
    if not pergunta:
        return jsonify({"error": "Mensagem vazia"}), 400
    
    try:
        # Query com streaming
        streaming_response = query_engine.query(pergunta)
        
        # Coleta toda a resposta
        resposta_completa = ""
        for text in streaming_response.response_gen:
            resposta_completa += text
        
        return jsonify({
            "response": resposta_completa.strip()
        })
    
    except Exception as e:
        print(f"Erro ao processar pergunta: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/chat/stream', methods=['POST'])
def chat_stream():
    """Endpoint para streaming em tempo real (opcional)"""
    if not query_engine:
        return jsonify({"error": "Query engine não está carregado"}), 500
    
    data = request.json
    pergunta = data.get('message', '').strip()
    
    if not pergunta:
        return jsonify({"error": "Mensagem vazia"}), 400
    
    def generate():
        try:
            streaming_response = query_engine.query(pergunta)
            for text in streaming_response.response_gen:
                yield f"data: {json.dumps({'text': text})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)