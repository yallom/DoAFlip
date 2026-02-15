from llama_index.core import Settings, PromptTemplate
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
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

print("A carregar o RAG...")

try:
    if not os.path.exists("nutrition_index_complete.pkl"):
        print("Ficheiro 'nutrition_index_complete.pkl' não encontrado!")
        print("Execute primeiro: python build_index.py")
        exit(1)
    
    # Carrega o índice COMPLETO (já construído!)
    with open("nutrition_index_complete.pkl", "rb") as f:
        index = pickle.load(f)
    
    print("Índice carregado!\n")
    
except Exception as e:
    print(f"Erro ao carregar: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

# Query engine com streaming habilitado
query_engine = index.as_query_engine(
    text_qa_template=qa_prompt_tmpl,
    similarity_top_k=6,
    streaming=True,
)

print("Em que posso ajudar?")
print("(escreve 'sair' para terminar)\n")

while True:
    pergunta = input("Pergunta: ").strip()
    
    if pergunta.lower() in ['sair', 'exit', 'quit', 'q', 's']:
        print("Até à próxima!")
        break
    
    if not pergunta:
        continue
    
    try:
        print("\nResposta:")
        
        # Query com streaming
        streaming_response = query_engine.query(pergunta)
        
        # Imprime token por token à medida que chega
        for text in streaming_response.response_gen:
            print(text, end="", flush=True)
        
        print("\n" + "-" * 90 + "\n")
        
    except Exception as e:
        print(f"Erro ao processar a pergunta: {e}\n")