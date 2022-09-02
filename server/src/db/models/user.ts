import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

export enum Role {
  POTTER_STEWARD = 'POTTER_STEWARD',
  GUEST = 'GUEST'
}

interface UserAttributes {
  id: string
  name: string
  role?: Role
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'name'> {}

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare id: string;
  declare name: string;
  declare role?: Role;
}

User.init({
  id: {
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

export default User;
