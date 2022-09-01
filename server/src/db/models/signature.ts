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
  userId: string
  tripId: string
  startDate: Date
  endDate: Date
  status?: Status
  picture?: string
}

export interface SignatureInput extends Optional<SignatureAttributes, 'userId' | 'tripId' | 'startDate' | 'endDate'> {}

export class Signature extends Model<SignatureAttributes, SignatureInput> implements SignatureAttributes {
  declare userId: string;
  declare tripId: string;
  declare startDate: Date;
  declare endDate: Date;
  declare status?: Status;
  declare picture?: string;
}

Signature.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: User,
      key: 'username'
    }
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Trip,
      key: 'id'
    }
  },
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

Signature.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Signature.belongsTo(Trip, {
  foreignKey: 'tripId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default Signature;
