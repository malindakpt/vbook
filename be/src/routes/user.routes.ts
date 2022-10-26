import { Application } from "express";
import { getAllUsers, getUser, resetPassordToEmail, addUser } from "../controllers/users.controller";

export const setUserRoutes = (app: Application) => {
    app.post('/user/signUp', [addUser]);
    app.post('/user/getUser', [getUser]);
    // app.post('/user', [insert]);
    app.get('/user/all', [getAllUsers]);
    app.post('/user/reset/email', [resetPassordToEmail]);
    // app.get('/users', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    //     UsersController.list
    // ]);
    // app.get('/users/:userId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     UsersController.getById
    // ]);
    // app.patch('/users/:userId', [    
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     UsersController.patchById
    // ]);
    // app.delete('/users/:userId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    //     UsersController.removeById
    // ]);
}