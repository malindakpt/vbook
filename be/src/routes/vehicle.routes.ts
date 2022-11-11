import { createVehicle, deleteVehicle, readVehicles, updateVehicle, readVehicle } from "controllers/vehicle.controller";
import { Application } from "express";

export const setVehicleRoutes = (app: Application) => {
    app.post('/vehicle/create', [createVehicle]);
    app.post('/vehicle/:id', [readVehicle]);
    app.post('/vehicles', [readVehicles]);
    app.post('/vehicle/update', [updateVehicle]);
    app.post('/vehicle/delete', [deleteVehicle]);
}