import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Trip from './trip';
import User from './user';

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

interface SignatureAttributes {
  TripId?: number
  UserUsername?: string
  startDate: Date
  endDate: Date
  status?: Status
  picture?: string
}

export interface SignatureInput extends Optional<SignatureAttributes, /* 'tripId' | 'username' | */ 'startDate' | 'endDate'> {}

export class Signature extends Model<SignatureAttributes, SignatureInput> implements SignatureAttributes {
  declare TripId?: number;
  declare UserUsername?: string;
  declare startDate: Date;
  declare endDate: Date;
  declare status?: Status;
  declare picture?: string;
}

Signature.init({
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      Status.APPROVED,
      Status.DENIED,
      Status.PENDING
    ),
    defaultValue: Status.PENDING
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: sequelizeConnection
});

// Define the one to many relationship between trips and signatures and users and signatures
Trip.hasMany(Signature, { as: 'signatures' });
User.hasMany(Signature, { as: 'signatures' });

Signature.belongsTo(Trip);
Signature.belongsTo(User);

export default Signature;
