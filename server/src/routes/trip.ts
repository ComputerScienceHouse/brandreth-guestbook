import { RequestHandler, Router } from 'express';
import { addSignature, createTrip, getTrips, getTrip, updateTrip } from '../handlers';

const tripRouter = Router();

tripRouter.get('/', getTrips as RequestHandler);
tripRouter.post('/', createTrip as RequestHandler);
tripRouter.get('/:tripId', getTrip as RequestHandler);
tripRouter.put('/:tripId', updateTrip as RequestHandler);
tripRouter.post('/:tripId/sign', addSignature as RequestHandler);

export default tripRouter;
