import { Optional, DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';
import Signature from './signature';

interface TripAttributes {
  id?: number
  title: string
  startDate: Date
  endDate: Date
  galleryLink?: string
  signatures?: Signature[]
}

export interface TripInput extends Optional<TripAttributes, 'startDate' | 'endDate' | 'title'> {}

export class Trip extends Model<TripAttributes, TripInput> implements TripAttributes {
  declare id: number;
  declare title: string;
  declare startDate: Date;
  declare endDate: Date;
  declare galleryLink?: string;
  declare signatures?: Signature[];
}

Trip.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
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

export default Trip;
