{
  description = "suticore ∴ declarative semantic environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux"; 
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # semantic processing tools
          nodejs_20
          jq
          git
          
          # documentation engine
          pandoc
          mdbook
          
          # zero-g environment logic
          (pkgs.writeShellScriptBin "suti-init" ''
            export SUTI_ARCHITECT="ezar garuna (as a function)"
            export SUTI_MODE="quiet-tech"
            export SUTI_NODE="bogota"
            echo "∴ suticore environment loaded"
            echo "status: sovereign"
          '')
        ];

        shellHook = ''
          suti-init
          echo "mode: synaura ∴ syntaxium"
        '';
      };
    };
}
