#!/usr/bin/env nix-shell
#!nix-shell -p "python3.withPackages (ps: [ ps.requests ])" -i python3

import os
import json
import shutil
import hashlib
import logging
from pathlib import Path
from datetime import datetime
import requests

# SRETENIYA_OS: Vault Crystallizer v.1.3 (Final Stable)
# Автор: Ezar Garuna | Стек: SUTIcore

VAULT_ROOT = Path("/Users/iggalk/Documents/SRETENIYA_OS")
SOURCE_DIR = Path("/Users/iggalk/Downloads/UNSORTED")
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

logging.basicConfig(level=logging.INFO, format='%(message)s')

def get_file_hash(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def analyze_semantics(file_path, content):
    """Синхронизация с локальной моделью Ollama."""
    current_date = datetime.now().strftime("%Y-%m-%d")
    prompt = f"""
    Ты — Семантический Архитектор SRETENIYA_OS. Текущая дата: {current_date}.
    Проанализируй контент файла и определи его место в OMEGA Tree (00_CRYSTAL...60_ETHER).
    Верни JSON с параметрами: layer, new_name (verb_subject_context.ext), status (relevant|obsolete), semantic_date.
    
    Фрагмент контента:
    {content[:1500]}
    """
    try:
        r = requests.post(OLLAMA_URL, json={
            "model": MODEL_NAME, 
            "prompt": prompt, 
            "stream": False, 
            "format": "json"
        }, timeout=45)
        return json.loads(r.json()['response'])
    except:
        return None

def main():
    logging.info("∴ Инициация Кристаллизации Смыслов...")
    
    # 1. Создание структуры
    for folder in ["00_CRYSTAL", "10_AURA", "20_PRANA", "30_HEART", "40_LOGOS", "50_EYE", "60_ETHER", "99_BUFFER"]:
        (VAULT_ROOT / folder).mkdir(parents=True, exist_ok=True)

    # 2. Карта существующих файлов (защита от дублей)
    processed_hashes = set()
    for f in VAULT_ROOT.rglob('*'):
        if f.is_file():
            try: processed_hashes.add(get_file_hash(f))
            except: pass

    # 3. Разбор UNSORTED
    if not SOURCE_DIR.exists():
        logging.error(f"Источник {SOURCE_DIR} не найден.")
        return

    files = [f for f in SOURCE_DIR.iterdir() if f.is_file() and not f.name.startswith('.')]
    if not files:
        logging.info("Тишина. Нет файлов для обработки в UNSORTED.")
        return

    for file_path in files:
        f_hash = get_file_hash(file_path)
        if f_hash in processed_hashes:
            logging.info(f"⧖ Дубликат: {file_path.name} — Удаление.")
            file_path.unlink()
            continue

        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read(3000)
        except: content = "[Binary]"

        decision = analyze_semantics(file_path, content)
        if decision:
            if decision.get('status') == 'obsolete':
                target_dir = VAULT_ROOT / "60_ETHER" / "61_VOID"
                new_name = f"obsolete_{decision.get('semantic_date','old')}_{decision.get('new_name', file_path.name)}"
            else:
                prefix = decision.get('layer', '99_BUFFER').split('_')[0]
                try:
                    target_dir = next(VAULT_ROOT.glob(f"{prefix}_*"))
                except:
                    target_dir = VAULT_ROOT / "99_BUFFER"
                new_name = decision.get('new_name', file_path.name)
            
            target_dir.mkdir(parents=True, exist_ok=True)
            final_path = target_dir / new_name
            shutil.move(file_path, final_path)
            logging.info(f"✓ {new_name} -> {target_dir.name}")
        else:
            shutil.move(file_path, VAULT_ROOT / "99_BUFFER" / file_path.name)
            logging.info(f"？ Неопределенность: {file_path.name} -> 99_BUFFER")

if __name__ == "__main__":
    main()
