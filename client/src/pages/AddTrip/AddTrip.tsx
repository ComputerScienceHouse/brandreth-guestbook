import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { createTrip, TripInput } from '../../api/trip.api';
import useUser from '../../hooks/useUser';
import { dateToString } from '../../util/dateToString';
import './AddTrip.scss';

const AddTrip = () => {
  const [trip, setTrip] = useState<TripInput>({
    title: '',
    startDate: dateToString(new Date()),
    endDate: dateToString(new Date()),
    galleryLink: '',
  });
  const { user } = useUser();

  return (
    <div className="add-trip">
      <h1>Add a Trip</h1>
      <Form className="add-trip-form">
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            placeholder="Fall Camping 2018"
            value={trip.title}
            onChange={(e) =>
              setTrip({
                ...trip,
                title: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="date"
            type="date"
            value={trip.startDate}
            onChange={(e) =>
              setTrip({
                ...trip,
                startDate: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">End Date</Label>
          <Input
            id="endDate"
            name="date"
            type="date"
            value={trip.endDate}
            onChange={(e) =>
              setTrip({
                ...trip,
                endDate: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Gallery Link</Label>
          <Input
            id="title"
            value={trip.galleryLink}
            onChange={(e) =>
              setTrip({
                ...trip,
                galleryLink: e.target.value,
              })
            }
          />
        </FormGroup>
        <Button
          color="primary"
          className="add-trip-form-submit"
          onClick={() => createTrip(trip, user?.username)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTrip;
