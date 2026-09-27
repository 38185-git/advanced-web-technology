{
  description = "Advanced Web Technology development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nixfmt
          statix
          deadnix
          gitleaks
          nixd
          nodejs_22
          typescript-language-server
          typescript
          prettier
          just
        ];
      };
    };
}
