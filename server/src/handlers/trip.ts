import { Request, Response } from 'express';
import { SequelizeScopeError } from 'sequelize/types';
import { Trip, User } from '../db/models';
import { SignatureInput } from '../db/models/signature';
import { TripInput } from '../db/models/trip';
import { Role } from '../db/models/user';
import { logger } from '../utils';

async function verifyIsSteward (member: string): Promise<boolean> {
  const user = await User.findByPk(member);

  if (user == null || user.role !== Role.POTTER_STEWARD) {
    return false;
  }

  return true;
};

// TODO: Pagination support
export async function getTrips (_: Request, res: Response): Promise<Response> {
  try {
    const trips = await Trip.findAll();

    return res.status(200).send({ data: trips });
  } catch (error) {
    return res.status(200).send({ errors: ['There was a problem getting the trips'] });
  }
}

export async function getTrip (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByPk(tripId);

    if (trip == null) {
      return res.status(404).send({ error: [`Trip with id ${tripId} was not found`] });
    }

    return res.status(200).send({ data: trip });
  } catch (error) {
    void logger.error('GET_TRIP_FAIL', 'Failed to get trip', error);

    return res.status(500).send({ errors: ['There was a problem getting that trip'] });
  }
}

export async function createTrip (req: Request, res: Response): Promise<Response> {
  const { trip, member } = req.body as { trip: TripInput, member: string };

  try {
    if (!await verifyIsSteward(member)) {
      return res.status(401).send({ errors: ['Only Potter Stewards can create trips'] });
    }

    const newTrip = await Trip.create(trip);

    return res.status(201).send({ data: newTrip });
  } catch (error) {
    const sequelizeError = error as SequelizeScopeError;

    void logger.error('CREATE_TRIP_FAIL', 'Failed to create trip', error);

    return res.status(500).send({ errors: [sequelizeError.message] });
  }
}

export async function updateTrip (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;
  const { trip, member } = req.body as { trip: Trip, member: string };

  try {
    if (!await verifyIsSteward(member)) {
      return res.status(401).send({ errors: ['Only Potter Stewards can update trips'] });
    }

    await Trip.update(trip, {
      where: {
        id: +tripId
      }
    });

    return res.status(204).send();
  } catch (error) {
    void logger.error('UPDATE_TRIP_FAIL', 'Failed to update trip', error);

    return res.status(500).send({ errors: ['There was a problem updating that trip'] });
  }
}

export async function addSignature (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;
  const signature = req.body as SignatureInput;

  console.log(signature);
  console.log(tripId);

  return res.status(201).send({});
}
