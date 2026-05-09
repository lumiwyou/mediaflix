import { Router } from "express"

/* Import the modules */
import user from "./user"

const api = Router()
    .use("/user", user)

export default Router().use("/api", api)