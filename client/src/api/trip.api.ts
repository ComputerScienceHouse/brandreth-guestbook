import { Get } from '.';

export interface Signature {
  startDate: string;
  endDate: string;
  UserUsername?: string;
  TripId?: number;
  file?: File;
}
export interface Trip {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  galleryLink?: string;
  signatures?: Signature[];
}

export interface TripsData {
  current: Trip;
  upcoming: Trip[];
  past: Trip[];
}

export async function getTrips(): Promise<TripsData> {
  const trips = (await Get({ route: '/trip' })) as unknown as TripsData;

  return trips;
}
