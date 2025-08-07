#!/bin/bash

if ! command -v bun &> /dev/null; then
    if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
        if command -v curl &> /dev/null; then
            curl -fsSL https://bun.sh/install | bash &> /dev/null
        elif command -v wget &> /dev/null; then
            wget -qO- https://bun.sh/install | bash &> /dev/null
        fi

        # Source shell profile and add to PATH
        [ -f "$HOME/.bashrc" ] && source "$HOME/.bashrc" 2> /dev/null
        [ -f "$HOME/.zshrc" ] && source "$HOME/.zshrc" 2> /dev/null
        [ -d "$HOME/.bun/bin" ] && export PATH="$HOME/.bun/bin:$PATH"
    fi
fi

if command -v bun &> /dev/null && [ -f "packages/cli/src/index.ts" ]; then
    (cd packages/cli && bun install --silent)
    (cd packages/cli && bun run src/index.ts)
fi