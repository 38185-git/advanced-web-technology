{
  description = "advanced-web-technology Python development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          (python3.withPackages (pythonPackages: with pythonPackages; [ pandas ]))
          ruff
          pyright
          just
        ];
      };
    };
}
