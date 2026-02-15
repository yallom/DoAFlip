from llama_index.core import Settings, VectorStoreIndex, Document, PromptTemplate
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.vector_stores.faiss import FaissVectorStore
import faiss
import pickle
import os

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

print("A carregar o RAG simplificado (FAISS + pickle)...")

try:
    with open("nutrition_docs.pkl", "rb") as f:
        doc_list = pickle.load(f)
    
    documents = [Document(text=text, metadata=meta) for text, meta in doc_list]
    print(f"Carregados {len(documents)} documentos do pickle.")
    
    if os.path.exists("nutrition_faiss.index"):
        faiss_index = faiss.read_index("nutrition_faiss.index")
        vector_store = FaissVectorStore(faiss_index=faiss_index)
        print("FAISS carregado com sucesso.")
    else:
        print("FAISS não encontrado – vai reconstruir embeddings (pode demorar um pouco).")
        vector_store = None
    
    # 3. Cria o índice a partir dos documentos
    #   - Se FAISS existir, usa-o como base (mais rápido)
    #   - Senão, deixa o llama-index recriar os embeddings
    if vector_store:
        index = VectorStoreIndex.from_documents(
            documents,
            storage_context=None,
            vector_store=vector_store,
            show_progress=True
        )
    else:
        index = VectorStoreIndex.from_documents(
            documents,
            show_progress=True
        )
    
    print("Índice reconstruído com sucesso!")
    
except Exception as e:
    print(f"Erro ao carregar/reconstruir o RAG: {e}")
    exit(1)

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