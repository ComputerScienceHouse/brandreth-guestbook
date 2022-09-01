import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Signature from './signature';

interface UserAttributes {
  username: string
}

export interface UserInput extends Optional<UserAttributes, 'username'> {}

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare username: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize: sequelizeConnection
});

User.hasMany(Signature);

export default User;
