import { Request, Response } from 'express';

export async function getTrips (req: Request, res: Response): Promise<Response> {
  return res.status(200).send([]);
}

export async function getTrip (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;

  console.log(tripId);

  return res.status(200).send({});
}

export async function createTrip (req: Request, res: Response): Promise<Response> {
  return res.status(201).send({});
}

export async function updateTrip (req: Request, res: Response): Promise<Response> {
  return res.status(201).send({});
}

export async function addSignature (req: Request, res: Response): Promise<Response> {
  const { tripId } = req.params;

  console.log(tripId);

  return res.status(201).send({});
}
