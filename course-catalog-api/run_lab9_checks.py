"""Run assignment checks against a running API; exit nonzero on any FAIL.

Use a disposable database with seed.sql and seed_users.py applied.
The access matrix creates and removes teaching enrollments.
"""
import os
import subprocess
import sys
from pathlib import Path

SCRIPTS = [
    "check_users.py", "try_auth.py", "try_tokens.py", "try_access.py",
    "try_errors.py", "try_graphql_access.py", "try_graphql.py",
    "try_n_plus_1.py", "measure.py", "try_timing.py",
    "scan_routes.py", "scan_graphql.py",
]

if __name__ == "__main__":
    os.chdir(Path(__file__).parent)
    failed = []
    for script in SCRIPTS:
        result = subprocess.run([sys.executable, script], text=True, capture_output=True)
        print(f"\n--- {script} ---\n{result.stdout}", flush=True)
        if result.returncode or "FAIL" in result.stdout:
            failed.append(script)
            print(result.stderr, file=sys.stderr)
    print(f"Checks: {len(SCRIPTS) - len(failed)}/{len(SCRIPTS)} scripts passed")
    sys.exit(bool(failed))
