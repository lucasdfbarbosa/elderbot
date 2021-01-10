/**
 * Transforma o text em negrito
 * @param texto texto a ser transformado
 * @returns texto em negrito
 */
export function negrito(texto: string): string {
  return `**${texto}**`
}

export function italico(texto: string): string {
  return `*${texto}*`
}

export function sublin(texto: string): string {
  return `__${texto}__`
}

export function trafado(texto: string): string {
  return `~~${texto}~~`
}

export function hiddenText(texto: string): string {
  return `||${texto}||`
}