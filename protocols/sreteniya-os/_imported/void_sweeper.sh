#!/bin/zsh

# ⟁ SRETENIYA: VOID SWEEPER v2.0
# Удаление скрытого мусора (Тихий режим)

echo "⟁ ЗАПУСК ФИНАЛЬНОЙ УБОРКИ..."

# 1. УДАЛЕНИЕ .DS_Store (С глушителем ошибок)
echo "\n👁  Удаление .DS_Store (Визуальный шум)..."
# 2>/dev/null отправляет все ошибки доступа в пустоту
find ~ -name ".DS_Store" -delete 2>/dev/null
echo "   ✅ Очищено (Системные папки пропущены)."

# 2. УДАЛЕНИЕ __pycache__
echo "\n🐍 Удаление Python __pycache__..."
find ~ -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null
echo "   ✅ Очищено."

# 3. MAIL DOWNLOADS (Почтовый кэш)
MAIL_CACHE="$HOME/Library/Containers/com.apple.mail/Data/Library/Mail Downloads/"
if [ -d "$MAIL_CACHE" ]; then
    SIZE=$(du -sh "$MAIL_CACHE" 2>/dev/null | awk '{print $1}')
    echo "\n📧 Кэш вложений Apple Mail: $SIZE"
    
    # Автоматический вопрос
    read -q "REPLY?   🗑 ОЧИСТИТЬ ВЛОЖЕНИЯ? (y/n) "
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$MAIL_CACHE"/*
        echo "   ✅ Почтовый кэш сброшен."
    fi
else
    echo "\n📧 Apple Mail кэш пуст или недоступен."
fi

# 4. HOMEBREW CLEANUP (Если установлен)
if command -v brew &> /dev/null; then
    echo "\n🍺 Очистка Homebrew..."
    brew cleanup -s &>/dev/null
    brew autoremove &>/dev/null
    echo "   ✅ Кэш пакетов очищен."
fi

echo "\n⟁ СИСТЕМА ЧИСТА."
