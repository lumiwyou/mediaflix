import { Router } from "express"
import userController from "../controller/user.controller"

export const router = Router()

router.get("/:id", userController.getById)
router.post("/", userController.createUser)

export default router