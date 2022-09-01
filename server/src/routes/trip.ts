import { RequestHandler, Router } from 'express';
import { addSignature, createTrip, getTrips, updateTrip } from '../handlers';

const tripRouter = Router();

tripRouter.get('/', getTrips as RequestHandler);
tripRouter.post('/', createTrip as RequestHandler);
tripRouter.put('/', updateTrip as RequestHandler);
tripRouter.post('/sign', addSignature as RequestHandler);

export default tripRouter;
