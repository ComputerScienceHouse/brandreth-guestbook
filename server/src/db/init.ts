import dotenv from 'dotenv';
import {
  Log,
  Signature,
  Trip,
  User
} from './models';

dotenv.config();

export default async function dbInit (): Promise<void> {
  const { DEPLOYMENT_ENV, DB_DROP_TABLES } = process.env;
  const force = DB_DROP_TABLES === 'true';
  const alter = DEPLOYMENT_ENV !== 'production';

  Trip.hasMany(Signature);
  User.hasMany(Signature);

  if (force) {
    await Signature.drop();

    await Trip.drop();
    await User.drop();
    await Log.drop();
  }

  await Log.sync({ alter });
  await Trip.sync({ alter });
  await User.sync({ alter });
  await Signature.sync({ alter });
}
