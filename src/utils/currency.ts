
const currencyMap: Record<string, string> = {
  Kazakhstan: 'KZT',
  Sweden: 'SEK',
  Czechia: 'CZK'
}

export function getCurrencyByCountry(country: string): string {
  return currencyMap[country] || 'USD';
}