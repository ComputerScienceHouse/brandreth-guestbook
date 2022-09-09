import { useEffect, useState } from 'react';
import { getTrips, Trip } from '../api/trip.api';

const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
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
