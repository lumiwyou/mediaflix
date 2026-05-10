import { Router } from "express"

/* Import the modules by path "./<module-directory>/index.ts" */
import usersRouter from "./user/index.ts"

const apiRouter_v1: Router = Router()
    .use(usersRouter)

export default apiRouter_v1