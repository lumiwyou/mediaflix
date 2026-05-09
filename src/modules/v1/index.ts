import { Router } from "express"

/* Import the modules */
import user from "./user/index.ts"

const api = Router()
    .use("/users", user)

export default Router().use("/api/v1", api)