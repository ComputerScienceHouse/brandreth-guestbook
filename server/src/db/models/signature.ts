import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

interface SignatureAttributes {
  startDate: Date
  endDate: Date
  status?: Status
  picture?: string
}

export interface SignatureInput extends Optional<SignatureAttributes, 'startDate' | 'endDate'> {}

export class Signature extends Model<SignatureAttributes, SignatureInput> implements SignatureAttributes {
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

export default Signature;
