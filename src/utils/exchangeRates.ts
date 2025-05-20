const cache = new Map<string,{ rate: number; timestamp: number }>();
const TTL = 1000 * 60 * 60 * 7;

export async function getExchangeRate(from: string, to: string): Promise<number> {
  const key = `${from}_${to}`;
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && now - cached.timestamp < TTL) {
    return cached.rate;
  }

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();

    if (data.result !== 'success' || typeof data.rates?.[to] !== 'number') {
      throw new Error(`Invalid exchange rate data: ${JSON.stringify(data)}`);
    }

    const rate = data.rates[to];
    cache.set(key, { rate, timestamp: now });
    return rate;
  } catch (err) {
    console.error('Exchange rate fetch error:', err);
    throw new Error('Failed to fetch exchange rate');
  }
}