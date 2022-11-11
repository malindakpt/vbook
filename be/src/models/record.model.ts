import { DB } from 'services/db.connection';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export type Record = InferAttributes<RecordModel>;

// order of InferAttributes & InferCreationAttributes is important.
export class RecordModel extends Model<InferAttributes<RecordModel>, InferCreationAttributes<RecordModel>>{
  declare id: CreationOptional<number>;
  declare regNo: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  regNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
};

RecordModel.init(attributes, { // Other model options go here
  sequelize: DB.getInstance(), // We need to pass the connection instance
  modelName: 'Record' // We need to choose the model name
});