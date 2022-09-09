import { Get } from '.';

export interface Trip {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export async function getTrips(): Promise<Trip[]> {
  const trips = (await Get({ route: '/trip' })) as unknown as Trip[];

  return trips;
}
