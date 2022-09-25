import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  NavLink,
} from 'reactstrap';
import { Trip } from '../../api/trip.api';
import { Loading } from '../../components/Loading';
import { SignModal } from '../../components/SignModal';
import useTrips from '../../hooks/useTrips';
import './Trips.scss';

const Trips = () => {
  const { trips, isLoading } = useTrips();
  const [signModalOpen, setSignModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip>();

  if (isLoading) {
    return <Loading />;
  }

  const { current, upcoming, past } = trips;

  return (
    <div className="trips">
      <SignModal
        trip={selectedTrip}
        isOpen={signModalOpen}
        setIsOpen={setSignModalOpen}
      />
      <h1>Current Trip</h1>
      {current && (
        <Card className="trips-trip">
          <CardBody>
            <CardTitle tag="h5">{current.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {`${current.startDate} to ${current.endDate}`}
            </CardSubtitle>
            <Button
              className="trips-trip-signbutton"
              color="primary"
              onClick={() => {
                setSignModalOpen(true);
                setSelectedTrip(current);
              }}
            >
              Add Signature
            </Button>
          </CardBody>
        </Card>
      )}

      <h1>Upcoming Trips</h1>
      <div className="trips-container">
        {upcoming.map((trip) => {
          const { id, title, startDate, endDate } = trip;
          const start = new Date(startDate).toLocaleDateString();
          const end = new Date(endDate).toLocaleDateString();

          return (
            <Card key={id} className="trips-trip">
              <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {`${start} to ${end}`}
                </CardSubtitle>
                <Button
                  className="trips-trip-signbutton"
                  color="primary"
                  onClick={() => {
                    setSignModalOpen(true);
                    setSelectedTrip(trip);
                  }}
                >
                  Add Signature
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <h1>Past Trips</h1>
      <div className="trips-container">
        {past.map((trip) => {
          const { id, title, startDate, endDate, galleryLink, signatures } =
            trip;
          const start = new Date(startDate).toLocaleDateString();
          const end = new Date(endDate).toLocaleDateString();

          return (
            <Card key={id} className="trips-trip">
              <CardBody>
                <CardTitle tag="h2">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <i>{`${start} to ${end}`}</i>
                </CardSubtitle>
                <CardBody>
                  {galleryLink && (
                    <NavLink active href={galleryLink}>
                      Gallery Link
                    </NavLink>
                  )}
                </CardBody>
                {signatures?.length ? (
                  <AvatarGroup total={signatures.length}>
                    {signatures.slice(0, 3).map(({ UserUsername }) => (
                      <Avatar
                        key={UserUsername}
                        alt="member"
                        src={`https://profiles.csh.rit.edu/image/${
                          UserUsername ?? ''
                        }`}
                      />
                    ))}
                  </AvatarGroup>
                ) : (
                  <p>No one signed the guestbook :(</p>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Trips;
