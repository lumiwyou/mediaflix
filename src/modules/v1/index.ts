import { Router } from "express"

/* Import the modules */
import user from "./user/index.ts"

const api = Router()
    .use("/user", user)

export default Router().use("/api", api)