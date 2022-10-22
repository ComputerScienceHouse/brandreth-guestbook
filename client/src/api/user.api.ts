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
  return (await Get({
    route: '/user',
  })) as unknown as User[];
}

export async function getUser(username: string): Promise<User> {
  return (await Get({
    route: `/user/${username}`,
  })) as unknown as User;
}
