/**
 * Add Comma
 * @param value - numbers that need comma
 */

export default function addComma(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
