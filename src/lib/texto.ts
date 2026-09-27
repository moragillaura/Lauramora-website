// Utilidades para pintar los textos que Laura edita en el panel /admin.
// Todos los campos del panel son opcionales: si algo llega vacío o no
// existe, simplemente no se muestra.

/** Divide un texto en párrafos (separados por una línea en blanco). */
export const parrafos = (t?: unknown): string[] =>
  String(t ?? "")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Devuelve siempre una lista, aunque el campo falte o venga vacío. */
export const lista = <T = any>(x?: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);

/** Texto limpio, o cadena vacía. */
export const txt = (t?: unknown): string => String(t ?? "").trim();
