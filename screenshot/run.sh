#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAPES_DIR="$REPO_ROOT/screenshot/tapes"
COMMON_TAPE="$TAPES_DIR/common-setup.tape"
COMMON_END_TAPE="$TAPES_DIR/common-end.tape"

# vhs 0.12.0 has issue writing output file
VHS_VERSION="0.11.0"
VHS_DIR="$REPO_ROOT/screenshot/.bin"
VHS_BIN="$VHS_DIR/vhs-$VHS_VERSION"

if [ ! -x "$VHS_BIN" ]; then
	echo "vhs $VHS_VERSION not found at $VHS_BIN." >&2
	exit 1
fi

TMP_HOME="$(mktemp -d)"
COMBINED_TAPE="$(mktemp)"
trap 'rm -rf "$TMP_HOME" "$COMBINED_TAPE"' EXIT

mkdir -p "$TMP_HOME/.tfl-expense-calculator/csv"
cp "$REPO_ROOT/screenshot/fixtures/journeys.csv" "$TMP_HOME/.tfl-expense-calculator/csv/"

cat > "$TMP_HOME/.tfl-expense-calculator/config.json" <<JSON
{
  "csvFolder": "$TMP_HOME/.tfl-expense-calculator/csv",
  "homeStations": ["Home Station"],
  "officeStations": ["Office Station"],
  "isIncludingWeekends": false
}
JSON

cd "$REPO_ROOT"

for tape in "$TAPES_DIR"/*.tape; do
	[ "$tape" = "$COMMON_TAPE" ] && continue
	[ "$tape" = "$COMMON_END_TAPE" ] && continue
	echo "Recording $(basename "$tape")..."
	{
		head -n 1 "$tape"
		echo
		cat "$COMMON_TAPE"
		tail -n +2 "$tape"
		cat "$COMMON_END_TAPE"
	} >"$COMBINED_TAPE"
	HOME="$TMP_HOME" "$VHS_BIN" "$COMBINED_TAPE"
done
