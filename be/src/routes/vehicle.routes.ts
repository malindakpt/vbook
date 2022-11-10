import { createVehicle, deleteVehicle, readVehicles, updateVehicle } from "controllers/vehicle.controller";
import { Application } from "express";

export const setVehicleRoutes = (app: Application) => {
    app.post('/vehicle/create', [createVehicle]);
    app.post('/vehicle/read', [readVehicles]);
    app.post('/vehicle/update', [updateVehicle]);
    app.post('/vehicle/delete', [deleteVehicle]);
}