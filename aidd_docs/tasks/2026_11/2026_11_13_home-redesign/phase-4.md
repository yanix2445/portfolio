---
status: in_progress
---

# Instruction: Finition Impeccable et documentation

## Architecture projection

```txt
.
├── DESIGN.md ✅
├── .impeccable/
│   ├── design.json ✅
│   └── review/desktop.png, mobile.png ✅
└── aidd_docs/memory/design.md ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | `impeccable detect --json` sur les fichiers changés | aucun constat bloquant non traité | cli |
| Happy path | finish reviewer | disposition `ship` (ou `fix` traité) | system |
| Happy path | documenter | DESIGN.md et design.json porteurs de tokens | system |

## Tasks to do

### `1)` Détecteur et captures

> Preuves visuelles.

1. `impeccable detect --json` puis corrections mécaniques.
2. Captures 1440 et 390 dans `.impeccable/review/`, provenance du raster pastille.

### `2)` Relecture et documentation

> Verdict et système consigné.

1. `impeccable-finish-reviewer`, application du lot de corrections.
2. `impeccable-documenter` → DESIGN.md + `.impeccable/design.json` ; réécrire `aidd_docs/memory/design.md`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Captures valides (aucune zone vide), detect sans constat ouvert non justifié |
| 2 | Verdict rendu ; DESIGN.md décrit le monde construit |
