import { Router } from "express"
import userController from "../controller/user.controller.ts"

export const usersRouter: Router = Router()

usersRouter.get("/users", userController.getById)
usersRouter.post("/users", userController.createUser)
usersRouter.delete("/users", userController.deleteUser)
usersRouter.put("/users", userController.updateUser)

export default usersRouter