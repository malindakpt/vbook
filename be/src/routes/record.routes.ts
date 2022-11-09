import { createRecord, deleteRecord, readRecords, updateRecord } from "controllers/record.controller";
import { Application } from "express";

export const setRecordRoutes = (app: Application) => {
    app.post('/record/create', [createRecord]);
    app.post('/record/read', [readRecords]);
    app.post('/record/update', [updateRecord]);
    app.post('/record/delete', [deleteRecord]);
}