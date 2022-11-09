import { Request, Response } from "express";
import { RecordModel } from "models/record.model";

export const createRecord = async (req: Request, res: Response) => {
  try {
    const record = await RecordModel.create(req.body);
    return res.status(201).send(record);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const readRecords = async (req: Request, res: Response) => {
  try {
    const foundRecords = await RecordModel.findAll({
      where: req.body,
    });
    return res.status(201).send(foundRecords);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const foundRecord = await RecordModel.findOne({
      where: { id },
    });
    if (foundRecord) {
      const updated = await foundRecord.update(req.body);
      return res.status(201).send(updated);
    } else {
      return res.status(404).send({});
    }
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await RecordModel.destroy({
      where: { id },
    });
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

