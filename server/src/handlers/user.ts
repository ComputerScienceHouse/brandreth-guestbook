import { Request, Response } from 'express';
import { POTTER_STEWARDS } from '../constants';
import { User } from '../db/models';
import { Role } from '../db/models/user';
import { logger } from '../utils';

export async function getUser (req: Request, res: Response): Promise<Response> {
  const { username } = req.params;
  const isSteward = POTTER_STEWARDS.includes(username);

  try {
    const [user] = await User.findOrCreate({
      defaults: {
        username,
        role: isSteward ? Role.POTTER_STEWARD : Role.GUEST
      },
      where: {
        username
      }
    });

    return res.status(200).send({ data: user });
  } catch (error) {
    void logger.error('CREATE_USER_FAIL', `Failed to create the user ${username}`, error);

    return res.status(500).send({ errors: [`Failed to get the user ${username}`] });
  }
}

export async function getUsers (_: Request, res: Response): Promise<Response> {
  try {
    const users = await User.findAll({
      order: [
        ['tripCount', 'ASC'],
        ['name', 'ASC']
      ]
    });

    return res.status(200).send({ data: users });
  } catch (error) {
    void logger.error('GET_USERS_FAIL', 'Failed to get the users', error);

    return res.status(500).send({ errors: ['Failed to get users'] });
  }
}

// TODO: Make this function
export async function updateUserRole (_: Request, res: Response): Promise<Response> {
  return res.status(500).send('Route not implemented');
}
