import Location from '../models/locations';
import City from '../models/cities';

export async function resolveLocation(input: string): Promise<{ country?: string; city?: string }> {
  const normalizedInput = input.trim().toLowerCase();
  const country = await Location.findOne({
    alternateNames: { $regex: new RegExp(`${normalizedInput}`, 'i') },
    type: 'country'
  });

  if (country) return { country: country.name };

  const city = await City.findOne({
    alternateNames: { $regex: new RegExp(`${normalizedInput}`, 'i') }
  });

  if (city) return { city: city.name };

  return {};
}