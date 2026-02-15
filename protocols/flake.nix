{
  description = "suticore ∴ declarative semantic environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        # ∴ canonical public semantic environment
        sutiEnv = {
          SUTI_ARCHITECT = "ezar garuna (as a function)";
          SUTI_MODE = "quiet-tech";
          SUTI_STACK = "synaura · syntaxium · verenitya · linguafusion";
          SUTI_STATUS = "active canon";
          SUTI_VECTOR = "silence → structure → step";
          SUTI_LICENSE = "mit";
          SUTI_RUNTIME = "zero-g";
        };

      in {

        # ⟁ development shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # base
            nodejs_20
            jq
            git

            # docs
            pandoc
            mdbook

            # semantic lint
            vale
            markdownlint-cli

            # navigation
            ripgrep
            fd

            bashInteractive
          ];

          shellHook = ''
            export SUTI_ARCHITECT="${sutiEnv.SUTI_ARCHITECT}"
            export SUTI_MODE="${sutiEnv.SUTI_MODE}"
            export SUTI_STACK="${sutiEnv.SUTI_STACK}"
            export SUTI_STATUS="${sutiEnv.SUTI_STATUS}"
            export SUTI_VECTOR="${sutiEnv.SUTI_VECTOR}"
            export SUTI_LICENSE="${sutiEnv.SUTI_LICENSE}"
            export SUTI_RUNTIME="${sutiEnv.SUTI_RUNTIME}"

            suti-init
            suti-check
            suti-status
          '';
        };

        # 〄 semantic command layer
        packages = {

          # ∴ initializer
          suti-init = pkgs.writeShellScriptBin "suti-init" ''
            echo "∴ suticore environment loaded"
            echo "mode    ∴ $SUTI_MODE"
            echo "stack   ∴ $SUTI_STACK"
            echo "vector  ∴ $SUTI_VECTOR"
          '';

          # ⟁ integrity validation
          suti-check = pkgs.writeShellScriptBin "suti-check" ''
            echo "⧖ validating semantic shell"

            for VAR in SUTI_ARCHITECT SUTI_MODE SUTI_STACK SUTI_VECTOR; do
              if [ -z "$(eval echo \$$VAR)" ]; then
                echo "∅ $VAR undefined"
                exit 1
              fi
            done

            echo "⟁ environment coherent"
            echo "〄 ready"
          '';

          # ↺ system reflection
          suti-status = pkgs.writeShellScriptBin "suti-status" ''
            echo "— suticore status —"
            echo "architect ∴ $SUTI_ARCHITECT"
            echo "mode      ∴ $SUTI_MODE"
            echo "stack     ∴ $SUTI_STACK"
            echo "vector    ∴ $SUTI_VECTOR"
            echo "state     ∴ $SUTI_STATUS"
            echo "runtime   ∴ $SUTI_RUNTIME"
            echo "license   ∴ $SUTI_LICENSE"
          '';

          # ⧖ verenitya pause
          suti-pause = pkgs.writeShellScriptBin "suti-pause" ''
            echo "⧖ pause"
            sleep 2
            echo "∴ silence stabilizes intent"
          '';

          # ∅ silence boundary
          suti-silence = pkgs.writeShellScriptBin "suti-silence" ''
            echo "∅ silence"
            echo "no action"
          '';

          # ⟁ decision stack trigger
          suti-step = pkgs.writeShellScriptBin "suti-step" ''
            echo "∴ node"
            echo "⧖ friction"
            echo "⟁ one step ≤ 10 min"
            echo "〄 closure"
          '';

          # ↺ weekly export scaffold
          suti-week = pkgs.writeShellScriptBin "suti-week" ''
            FILE="docs/06_AI_SUPPORT/weekly_exports/$(date +%Y-%V).md"
            mkdir -p "$(dirname "$FILE")"

            if [ ! -f "$FILE" ]; then
              echo "# weekly export ∴ $(date +%Y week %V)" > "$FILE"
              echo "" >> "$FILE"
              echo "state ∴ clarity" >> "$FILE"
              echo "action ∴ step" >> "$FILE"
              echo "" >> "$FILE"
              echo "∴ signal placeholder" >> "$FILE"
            fi

            echo "〄 weekly file ready → $FILE"
          '';

          # ≋ resonance reading
          suti-resonance = pkgs.writeShellScriptBin "suti-resonance" ''
            echo "≋ resonance check"
            echo "returns · saves · dwell"
            echo "metrics ignored ∅"
          '';

          # ⧖ community ritual (safe)
          suti-ritual = pkgs.writeShellScriptBin "suti-ritual" ''
            echo "⧖ shared pause"
            sleep 3
            echo "〄 ritual closed"
          '';

          # ∴ shadow safety scan placeholder
          suti-shadow = pkgs.writeShellScriptBin "suti-shadow" ''
            echo "∴ shadow scan initialized"
            echo "coercion visibility > reaction"
            echo "〄 autonomy preserved"
          '';
        };

        # ∴ default public app
        apps.default = {
          type = "app";
          program = "${self.packages.${system}.suti-status}/bin/suti-status";
        };
      });
}
