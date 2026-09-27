run:
    npm --prefix course-catalog run dev

check: nix-check
    npm --prefix course-catalog run lint
    npm --prefix course-catalog run build

format:
    prettier --write course-catalog/app course-catalog/components course-catalog/lib
    just nix-format
import 'dev-tools.just'
