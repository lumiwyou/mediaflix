import { Router } from "express"
import userController from "../controller/user.controller.ts"

export const usersRouter: Router = Router()
    .get("/users/:userId", userController.getUserById)
    .get("/users", userController.getUsers)
    .post("/users", userController.createUser)
    .delete("/users", userController.deleteUser)
    .put("/users", userController.updateUser)

export default usersRouter