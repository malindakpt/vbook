import { Request, Response } from "express";
import { VehicleModel } from "models/vehicle.model";

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const Vehicle = await VehicleModel.create(req.body);
    return res.status(201).send(Vehicle);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const readVehicles = async (req: Request, res: Response) => {
  try {
    const foundVehicles = await VehicleModel.findAll({
      where: req.body,
    });
    return res.status(201).send(foundVehicles);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const foundVehicle = await VehicleModel.findOne({
      where: { id },
    });
    if (foundVehicle) {
      const updated = await foundVehicle.update(req.body);
      return res.status(201).send(updated);
    } else {
      return res.status(404).send({});
    }
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await VehicleModel.destroy({
      where: { id },
    });
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

