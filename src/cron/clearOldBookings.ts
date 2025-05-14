import cron from 'node-cron';
import House from '../models/house';

cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  try {
    const houses = await House.find({ 'bookedDates.0': { $exists: true } });

    for (const house of houses) {
      house.bookedDates = house.bookedDates.filter(
        ({ departure }) => new Date(departure) >= now
      );
      await house.save();
    }

    console.log('[CRON] Cleared past booked dates');
  } catch (error) {
    console.error('[CRON ERROR]', error);
  }
});