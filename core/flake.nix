{
  description = "SUTIcore Semantic Architecture ∴ Declarative Sovereignty Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
    let
      system = "x86_64-linux"; # Adjust if using a different architecture
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # Tools for semantic processing
          nodejs_20
          python311
          jq
          
          # Documentation & Structure
          git
          nodePackages.markdownlint-cli
          pandoc
          
          # Environment variables for Zero-G
          (pkgs.writeShellScriptBin "suti-env" ''
            export SUTI_CORE_ARCHITECT="ezar garuna (as a function)"
            export SUTI_VERSION="2026.x"
            echo "∴ SUTIcore Environment Loaded"
            echo "Status: Sovereign"
          '')
        ];

        shellHook = ''
          suti-env
          echo "Mode: quiet-tech ∴ syntaxium"
        '';
      };
    };
}
