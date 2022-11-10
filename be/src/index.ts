import { RecordModel } from "models/record.model";
import { UserModel } from "models/user.model";
import { VehicleModel } from "models/vehicle.model";
import { startApplication } from "services/app.service";

export const syncDatabase = async () => {
  try {
    UserModel.hasMany(VehicleModel);
    VehicleModel.belongsTo(UserModel);

    VehicleModel.hasMany(RecordModel);
    RecordModel.belongsTo(VehicleModel);

    await UserModel.sync();
    await RecordModel.sync();
    await VehicleModel.sync();

    console.log(
      "-------------------------Connection has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncDatabase();
startApplication();
