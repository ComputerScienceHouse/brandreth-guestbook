import { RequestHandler, Router } from 'express';
import { getUser, getUsers } from '../handlers';

const userRouter = Router();

userRouter.get('/:username', getUser as RequestHandler);
userRouter.get('/', getUsers as RequestHandler);

export default userRouter;
