import { useEffect, useState } from 'react';
import { getTrips, TripsData } from '../api/trip.api';

const useTrips = () => {
  const [trips, setTrips] = useState<TripsData>({} as TripsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      setTrips(await getTrips());
      setIsLoading(false);
    };

    func();
  }, []);

  return { trips, isLoading };
};

export default useTrips;
