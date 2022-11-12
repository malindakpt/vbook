import { createVehicle, deleteVehicle, readVehicles, updateVehicle, readVehicle } from "controllers/vehicle.controller";
import { Application } from "express";

export const setVehicleRoutes = (app: Application) => {
    app.post('/vehicle/delete/:id', [deleteVehicle]);
    app.post('/vehicle/update', [updateVehicle]);
    app.post('/vehicle/create', [createVehicle]);
    app.post('/vehicle/list', [readVehicles]);
    app.post('/vehicle/:id', [readVehicle]);
}