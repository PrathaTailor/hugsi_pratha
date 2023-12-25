/**
 * toPercentage
 * @param value - to be converted into percentage
 * @returns value in percentage
 */
export function toPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function toFixed(value: number, fractionDigits: number): string {
  if (typeof value !== 'number') {
    return '0';
  }

  return value.toFixed(fractionDigits);
}

export function toThousandSeparator(value: number, symbol: string): string {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, symbol);
}

/**
 * sortDescending
 * @param array - an array to be sorted
 */
export function sortDescending(array: number[]) {
  return array.sort((a, b) => a < b ? 1 : -1);
}

export function getBiggest(array: number[]) {
  const [biggest] = sortDescending(array);
  return biggest;
}
