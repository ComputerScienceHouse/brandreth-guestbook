import { Get } from '.';

export enum Role {
  POTTER_STEWARD = 'POTTER_STEWARD',
  GUEST = 'GUEST',
}

export interface User {
  username: string;
  name: string;
  tripCount: number;
  role: Role;
}

export async function getUsers(): Promise<User[]> {
  const users = (await Get({ route: '/user' })) as unknown as User[];

  return users;
}
