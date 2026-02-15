from llama_index.core import (
    Settings,
    VectorStoreIndex,
    Document,
    PromptTemplate,
    StorageContext,
    load_index_from_storage
)
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.vector_stores.faiss import FaissVectorStore
import faiss
import pickle
import os
import sys

Settings.llm = Ollama(
    model="qwen2.5:7b-instruct-q5_k_m",
    request_timeout=600.0,
    options={"num_ctx": 8192}
)

Settings.embed_model = OllamaEmbedding(
    model_name="nomic-embed-text"
)

# Prompt custom
qa_prompt_tmpl = PromptTemplate(
    "Você é um assistente especializado em nutrição e alimentação saudável.\n"
    "Responda sempre de forma clara, objetiva e em português europeu.\n"
    "Use linguagem acessível, evite jargão técnico desnecessário e seja útil para utilizadores de uma app de nutrição.\n"
    "Baseie-se exclusivamente nos dados fornecidos no contexto.\n"
    "Se a pergunta for sobre substituições, considere alergias, restrições dietéticas e perfis nutricionais semelhantes.\n"
    "Se não tiver informação suficiente, diga-o de forma educada e sugira o que o utilizador pode fazer.\n\n"
    "Contexto extraído dos dados:\n{context_str}\n\n"
    "Pergunta do utilizador: {query_str}\n\n"
    "Resposta:"
)

PERSIST_DIR = "./storage_nutrition"

FAISS_PATH = "nutrition_faiss.index"
PICKLE_PATH = "nutrition_docs.pkl"

print("A tentar carregar o RAG (prioridade: índice persistido → fallback FAISS + pickle)...")

index = None

# Tentativa 1: Carregar o índice persistido completo (método preferido)
if os.path.exists(PERSIST_DIR):
    print(f"Índice persistido encontrado em: {PERSIST_DIR}")
    try:
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        index = load_index_from_storage(storage_context)
        print("Índice completo carregado com sucesso! (embeddings reutilizados)")
    except Exception as e:
        print(f"Erro ao carregar índice persistido: {e}")
        print("→ Tentando fallback para FAISS + pickle...")
else:
    print(f"Pasta de persistência não encontrada ({PERSIST_DIR}). Tentando fallback...")

# Tentativa 2: Fallback → carregar FAISS + pickle manualmente (teu código original)
if index is None:
    try:
        # Carrega documentos do pickle
        if not os.path.exists(PICKLE_PATH):
            raise FileNotFoundError(f"Ficheiro {PICKLE_PATH} não encontrado.")

        with open(PICKLE_PATH, "rb") as f:
            doc_list = pickle.load(f)
        
        documents = [Document(text=text, metadata=meta) for text, meta in doc_list]
        print(f"Carregados {len(documents)} documentos do pickle.")

        # Carrega FAISS se existir
        vector_store = None
        if os.path.exists(FAISS_PATH):
            faiss_index = faiss.read_index(FAISS_PATH)
            vector_store = FaissVectorStore(faiss_index=faiss_index)
            print("FAISS carregado com sucesso (fallback).")
        else:
            print("FAISS não encontrado no fallback. Será necessário reconstruir embeddings.")

        # Cria o índice
        if vector_store:
            index = VectorStoreIndex.from_vector_store(
                vector_store,
                storage_context=StorageContext.from_defaults(vector_store=vector_store)
            )
        else:
            # Último recurso: reconstruir embeddings (lento!)
            print("A reconstruir embeddings (pode demorar alguns minutos)...")
            index = VectorStoreIndex.from_documents(
                documents,
                show_progress=True
            )

        print("Índice recuperado via fallback com sucesso!")

    except Exception as fallback_error:
        print(f"ERRO CRÍTICO NO FALLBACK: {fallback_error}")
        sys.exit(1)

query_engine = index.as_query_engine(
    text_qa_template=qa_prompt_tmpl,
    similarity_top_k=6,
)

print("\nEm que posso ajudar?")

while True:
    pergunta = input("Pergunta: ").strip()
    
    if pergunta.lower() in ['sair', 'exit', 'quit', 'q', 's']:
        print("Até à próxima!")
        break
    
    if not pergunta:
        continue
    
    try:
        resposta = query_engine.query(pergunta)
        print("\nResposta:")
        print(str(resposta).strip())
        print("-" * 90)
    except Exception as e:
        print(f"Erro ao processar a pergunta: {e}")
        print("Tenta novamente ou verifica se o Ollama está ativo.")