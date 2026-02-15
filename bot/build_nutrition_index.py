import os
import pandas as pd
from llama_index.core import VectorStoreIndex, Document, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
import pickle

Settings.llm = Ollama(
    model="qwen2.5:7b-instruct-q5_k_m",
    request_timeout=600.0,
    options={"num_ctx": 8192}
)

Settings.embed_model = OllamaEmbedding(
    model_name="nomic-embed-text"
)

CSV_FILES = [
    "data/cleaned_nutrition_dataset_per100g.csv",
    "data/diet_recommendations_dataset.csv",
    "data/food_coded.csv",
    "data/healthy_foods_database.csv",
]

def csv_row_to_document(row: pd.Series, source_file: str) -> Document:
    parts = [f"Fonte: {os.path.basename(source_file)}"]
    
    for col, value in row.items():
        if pd.notna(value):
            val_str = str(value).strip()
            val_str = val_str.replace('°', ' graus').replace('\xb0', ' graus')
            val_str = ''.join(c for c in val_str if ord(c) < 128 or c in '°ºªµ')
            if len(val_str) > 400:
                val_str = val_str[:397] + "... [truncado]"
            
            if val_str.replace('.', '', 1).replace('-', '', 1).isdigit():
                parts.append(f"{col}: {val_str}")
            else:
                parts.append(f"{col}: {val_str}")
    
    text = " | ".join(parts)
    
    if len(text) > 3000:
        text = text[:2997] + "... [reduced for LLM]"
    
    metadata = {
        "source_file": source_file,
        "food_name": row.get("food", row.get("name", row.get("alimento", "desconhecido"))),
    }
    
    return Document(
        text=text,
        metadata=metadata,
        excluded_embed_metadata_keys=["source_file"],
        excluded_llm_metadata_keys=["source_file"],
    )

print("A carregar ficheiros CSV...")
documents = []
for csv_path in CSV_FILES:
    if not os.path.exists(csv_path):
        print(f"⚠️  Não encontrado: {csv_path}")
        continue
    try:
        df = pd.read_csv(csv_path, encoding='utf-8', encoding_errors='replace')
        print(f"✓ {csv_path}: {len(df)} linhas carregadas")
        for _, row in df.iterrows():
            documents.append(csv_row_to_document(row, csv_path))
    except Exception as e:
        print(f"Erro ao processar {csv_path}: {e}")

if not documents:
    print("Nenhum documento foi carregado. Verifica os caminhos dos ficheiros.")
    exit(1)

print(f"\nA construir índice com {len(documents)} documentos...")
print("Isto pode demorar alguns minutos (a gerar embeddings)...\n")

# Cria o índice (calcula embeddings)
index = VectorStoreIndex.from_documents(
    documents,
    show_progress=True
)

print("\nA guardar o índice completo (já construído)...")

# Guarda o índice INTEIRO (não precisa reconstruir no query!)
with open("nutrition_index_complete.pkl", "wb") as f:
    pickle.dump(index, f)

print(f"✓ Índice completo guardado em: nutrition_index_complete.pkl")
print(f"Tamanho do ficheiro: {os.path.getsize('nutrition_index_complete.pkl') / 1024 / 1024:.2f} MB")
print("\nBuild concluído com sucesso!")
print("Agora podes executar: python query_nutrition.py")