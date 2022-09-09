import { useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Trip } from '../../api/trip.api';
import { Loading } from '../../components/Loading';
import { SignModal } from '../../components/SignModal';
import useTrips from '../../hooks/useTrips';

const Trips = () => {
  const { trips, isLoading } = useTrips();
  const [signModalOpen, setSignModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip>();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="trips">
      <SignModal
        trip={selectedTrip}
        isOpen={signModalOpen}
        setIsOpen={setSignModalOpen}
      />
      <h1>Current Trips</h1>
      {trips.map((trip) => {
        const { id, title, startDate, endDate } = trip;
        const start = new Date(startDate).toLocaleDateString();
        const end = new Date(endDate).toLocaleDateString();

        return (
          <Card
            key={id}
            style={{
              width: '18rem',
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {`${start} to ${end}`}
              </CardSubtitle>
              <Button
                onClick={() => {
                  setSignModalOpen(true);
                  setSelectedTrip(trip);
                }}
              >
                Sign
              </Button>
            </CardBody>
          </Card>
        );
      })}
      <h1>Upcoming Trips</h1>
      <h1>Past Trips</h1>
    </div>
  );
};

export default Trips;
