import os
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

vault = "/Users/iggalk/Documents/SRETENIYA"

vectors = []

for root,dirs,files in os.walk(vault):

    for file in files:

        if file.endswith(".md"):

            path = os.path.join(root,file)

            with open(path) as f:

                text = f.read()

            emb = model.encode(text)

            vectors.append(emb)

print("indexed",len(vectors))
