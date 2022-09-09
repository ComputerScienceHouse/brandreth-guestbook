import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Signature from './signature';

export enum Role {
  POTTER_STEWARD = 'POTTER_STEWARD',
  GUEST = 'GUEST'
}

interface UserAttributes {
  username: string
  name?: string
  tripCount?: number
  role?: Role
  signatures?: Signature[]

}

export interface UserInput extends Optional<UserAttributes, 'username'> {}

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare username: string;
  declare name: string;
  declare tripCount?: number;
  declare role?: Role;
  declare signatures?: Signature[];
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  tripCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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

export default User;
