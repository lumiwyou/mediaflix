import { Router } from "express"

/* Import the modules by path "./<module-directory>/index.ts" */
import usersRouter from "./users/index.ts"
import libraryRouter from "./library/routes/library.routes.ts"

const apiRouter_v1: Router = Router()
    .use(usersRouter)
    .use(libraryRouter)

export default apiRouter_v1