import { Get, Post } from '.';

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

export interface TripInput {
  title: string;
  startDate: string;
  endDate: string;
  galleryLink?: string;
}

export interface TripsData {
  current: Trip;
  upcoming: Trip[];
  past: Trip[];
}

export async function getTrips(): Promise<TripsData> {
  return (await Get({
    route: '/trip',
  })) as unknown as TripsData;
}

export async function createTrip(
  trip: TripInput,
  member?: string
): Promise<Trip> {
  return (await Post({
    route: '/trip',
    body: JSON.stringify({ trip, member }),
  })) as unknown as Trip;
}
