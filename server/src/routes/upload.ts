import { RequestHandler, Router } from 'express';
import { uploadSignatureImage } from '../handlers';

const uploadRouter = Router();

uploadRouter.post('/', uploadSignatureImage as RequestHandler);

export default uploadRouter;
