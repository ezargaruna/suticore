#!/bin/bash
# suti-install :: quick setup for suti.os aesthetics

echo "∴ initiating suti.os interface sync"

# 1. create suti directory in home
mkdir -p ~/.suti/presets
mkdir -p ~/.suti/bin

# 2. install planetary rhythm script (from github)
curl -sSL https://raw.githubusercontent.com/ezargaruna/suticore/main/presets/bash/suti-rhythm.sh -o ~/.suti/bin/suti-rhythm.sh
chmod +x ~/.suti/bin/suti-rhythm.sh

# 3. add to zshrc/bashrc
if grep -q "suti-rhythm.sh" ~/.zshrc; then
  echo "SUTI-rhythm already in zshrc"
else
  echo 'export PATH="$HOME/.suti/bin:$PATH"' >> ~/.zshrc
  echo '~/.suti/bin/suti-rhythm.sh' >> ~/.zshrc
fi

echo "⟁ suti.os basic presets installed"
echo "restart terminal or run 'source ~/.zshrc' to activate"
