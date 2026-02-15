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

        # ∴ public semantic environment (no location data)
        sutiEnv = {
          SUTI_ARCHITECT = "ezar garuna (as a function)";
          SUTI_MODE = "quiet-tech";
          SUTI_STACK = "synaura · syntaxium · verenitya · linguafusion";
          SUTI_STATUS = "active canon";
        };

      in {
        devShells.default = pkgs.mkShell {

          # ⟁ base semantic tooling
          buildInputs = with pkgs; [
            nodejs_20
            jq
            git

            pandoc
            mdbook

            vale
            markdownlint-cli

            ripgrep
            fd

            bashInteractive
          ];

          # ⧖ environment initialization
          shellHook = ''
            export SUTI_ARCHITECT="${sutiEnv.SUTI_ARCHITECT}"
            export SUTI_MODE="${sutiEnv.SUTI_MODE}"
            export SUTI_STACK="${sutiEnv.SUTI_STACK}"
            export SUTI_STATUS="${sutiEnv.SUTI_STATUS}"

            suti-init
            suti-check
            suti-status
          '';
        };

        # 〄 public semantic commands
        packages = {

          # ∴ initializer
          suti-init = pkgs.writeShellScriptBin "suti-init" ''
            echo "∴ suticore environment loaded"
            echo "mode   ∴ $SUTI_MODE"
            echo "stack  ∴ $SUTI_STACK"
          '';

          # ⟁ integrity validation
          suti-check = pkgs.writeShellScriptBin "suti-check" ''
            echo "⧖ validating semantic shell"

            if [ -z "$SUTI_ARCHITECT" ]; then
              echo "∅ architect undefined"
              exit 1
            fi

            if [ -z "$SUTI_MODE" ]; then
              echo "∅ mode undefined"
              exit 1
            fi

            echo "⟁ environment coherent"
            echo "〄 ready"
          '';

          # ↺ system reflection
          suti-status = pkgs.writeShellScriptBin "suti-status" ''
            echo "— suticore status —"
            echo "architect ∴ $SUTI_ARCHITECT"
            echo "mode      ∴ $SUTI_MODE"
            echo "stack     ∴ $SUTI_STACK"
            echo "state     ∴ $SUTI_STATUS"
          '';

          # ⧖ pause protocol
          suti-pause = pkgs.writeShellScriptBin "suti-pause" ''
            echo "⧖ pause"
            sleep 2
            echo "∴ return when intent stabilizes"
          '';

          # ↺ weekly export scaffold (structure only)
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

          # ∅ silence helper
          suti-silence = pkgs.writeShellScriptBin "suti-silence" ''
            echo "∅ silence"
            echo "no action required"
          '';
        };

        # ∴ default public app
        apps.default = {
          type = "app";
          program = "${self.packages.${system}.suti-status}/bin/suti-status";
        };
      });
}
