# Development

Enter `nix develop`, or review .envrc and run `direnv allow`.
Start Helix from this shell so language servers are on PATH.
Use `just --list` for the project commands.
`just check` includes Nix evaluation, formatting, and static analysis.
`just nix-format` formats flake.nix.
`just hooks` enables staged Gitleaks scanning before commits.
`just secrets-check` scans the latest commit with secrets redacted.
Before the first commit, use `gitleaks git --pre-commit --staged --redact`.

Copy .env.example to .env for local credentials and fill in the values.
.env files are ignored and loaded by direnv; they must never be committed.
Plaintext .env is appropriate for local development, not shared provisioning.

GitHub Actions runs checks on push and pull requests.
Install the Renovate GitHub app for weekly dependency and lockfile PRs.
Updates require manual review; automatic merge is disabled.
Each repository owns its flake.lock and a local dev-tools.just copy.
Keep the common command interface when extending the project.
