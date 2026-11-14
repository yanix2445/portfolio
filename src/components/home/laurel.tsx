import s from "./home.styles";

const LEAF = "M0,0 Q4.2,-6.5 0,-14 Q-4.2,-6.5 0,0";
const LEAVES = 12;
const RADIUS = 37;

// Une branche de laurier : des feuilles posées sur un arc, alternées vers l'extérieur et l'intérieur.
function branch(): string[] {
  const paths: string[] = [];
  for (let i = 0; i < LEAVES; i++) {
    const t = i / (LEAVES - 1);
    const degrees = 106 + t * 150;
    const angle = (degrees * Math.PI) / 180;
    const x = (50 + RADIUS * Math.cos(angle)).toFixed(2);
    const y = (50 + RADIUS * Math.sin(angle)).toFixed(2);
    const scale = 0.55 + 0.5 * Math.sin(Math.min(1, t * 1.15) * Math.PI);
    paths.push(`translate(${x},${y}) rotate(${(degrees - 214).toFixed(1)}) scale(${scale.toFixed(2)})`);
    if (i < LEAVES - 1) {
      paths.push(
        `translate(${x},${y}) rotate(${(degrees - 154).toFixed(1)}) scale(${(scale * 0.78).toFixed(2)})`,
      );
    }
  }
  return paths;
}

const BRANCH = branch();

/** Couronne de laurier décorative, dessinée en SVG côté serveur. */
export function Laurel() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden className={s.wreath}>
      <g>
        {BRANCH.map((transform) => (
          <path key={transform} d={LEAF} transform={transform} />
        ))}
      </g>
      <g transform="translate(100,0) scale(-1,1)">
        {BRANCH.map((transform) => (
          <path key={transform} d={LEAF} transform={transform} />
        ))}
      </g>
    </svg>
  );
}
