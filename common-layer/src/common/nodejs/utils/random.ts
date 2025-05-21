/**
 * @description Devuelve un número entero aleatorio entre min (incluido) y max (incluido)
 * @param {number} min - El valor mínimo del rango
 * @param {number} max - El valor máximo del rango
 * @returns {number} - Un número entero aleatorio entre min y max
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
