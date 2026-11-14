// Noms de classes de `poster.css` (CSS global, importé par `src/app/globals.css`).
// Les modules CSS ne sont pas utilisables ici : la config Turbopack fait passer tous les
// fichiers `.css` par le loader Tailwind.
const styles = {
  cast: "gp-cast",
  cream: "gp-cream",
  dark: "gp-dark",
  foot: "gp-foot",
  hot: "gp-hot",
  label: "gp-label",
  more: "gp-more",
  poster: "gp-poster",
  status: "gp-status",
  title: "gp-title",
  top: "gp-top",
} as const;

export default styles;
