import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Signature from './signature';

interface TripAttributes {
  id?: number
  startDate: Date
  endDate: Date
  galleryLink?: string
}

export interface TripInput extends Optional<TripAttributes, 'startDate' | 'endDate'> {}

export class Trip extends Model<TripAttributes, TripInput> implements TripAttributes {
  declare id: number;
  declare startDate: Date;
  declare endDate: Date;
  declare galleryLink?: string;
}

Trip.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  galleryLink: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: sequelizeConnection
});

Trip.hasMany(Signature);

export default Trip;
