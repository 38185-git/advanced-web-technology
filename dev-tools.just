# Shared interface; this file is local so the repository remains standalone.
nix-check:
    nix flake check --no-update-lock-file
    nixfmt --check flake.nix
    statix check .
    deadnix --fail .

nix-format:
    nixfmt flake.nix

secrets-check:
    gitleaks git --log-opts="-1" --redact

hooks:
    git config core.hooksPath .githooks
