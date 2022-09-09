import { Request, Response } from 'express';
import { SequelizeScopeError } from 'sequelize/types';
import { Trip, User } from '../db/models';
import Signature, { SignatureInput } from '../db/models/signature';
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

export async function getTrips (req: Request, res: Response): Promise<Response> {
  const { offset = 0, limit = 10 } = req.query;

  if (limit > 50 || limit <= 0) {
    return res.status(400).send({ errors: ['Cannot specify limit must be in the range 1 and 50'] });
  }

  if (offset < 0) {
    return res.status(400).send({ errors: ['Cannot specify offset that is less than 0'] });
  }

  const realLimit = limit >= 10 ? +limit : 10;
  const realOffset = +offset;

  try {
    const trips = await Trip.findAll({
      offset: realOffset,
      limit: realLimit,
      include: {
        model: Signature,
        as: 'signatures'
      }
    });
    const count = await Trip.count();

    return res.status(200).send({
      data: trips,
      meta: {
        count,
        page: Math.floor(realOffset / realLimit) + 1,
        pages: Math.ceil(count / realLimit),
        offset: realOffset,
        limit: realLimit
      }
    });
  } catch (error) {
    return res.status(200).send({ errors: ['There was a problem getting the trips'] });
  }
}

export async function getTrip (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByPk(tripId, {
      include: {
        model: Signature,
        as: 'signatures'
      }
    });

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
  const { member, signature } = req.body as { member: string, signature: SignatureInput };

  try {
    const createdSignature = await Signature.create({
      ...signature,
      UserUsername: member,
      TripId: +tripId
    }, {
      include: [Trip, User]
    });

    return res.status(201).send(createdSignature);
  } catch (error) {
    void logger.error('ADD_SIGNATURE_FAIL', `Failed to add signature to trip ${tripId}`, error);

    return res.status(500).send({ errors: ['There was a problem signing that trip'] });
  }
}
