import { Router } from "express"
import userController from "../controller/user.controller.ts"

export const router = Router()

router.get("/:id", userController.getById)
router.post("/", userController.createUser)
router.delete("/", userController.deleteUser)
router.put("/", userController.updateUser)

export default router