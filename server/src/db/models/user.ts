import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Signature from './signature';

export enum Role {
  POTTER_STEWARD = 'POTTER_STEWARD',
  GUEST = 'GUEST'
}

interface UserAttributes {
  username: string
  name: string
  role?: Role
}

export interface UserInput extends Optional<UserAttributes, 'username' | 'name'> {}

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare username: string;
  declare name: string;
  declare role?: Role;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(
      Role.POTTER_STEWARD,
      Role.GUEST
    ),
    defaultValue: Role.GUEST

  }
}, {
  sequelize: sequelizeConnection
});

User.hasMany(Signature);

export default User;
