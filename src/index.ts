/**
 * @file server.js
 * @author Lumi Hyväri <lumi.hyvari@gmail.com>
 * @description Service set up, API routes and endpoints, etc.
 */

import express from "express"
import morgan from "morgan"
import config from "../settings.json" with { type: 'json' }
import apiRouter_v1 from "./modules/v1/index.ts"
import { database, bootstrapDatabase, insertTestDatabase } from "./config/database/index.ts"
import { exit } from "node:process"
import printRegisteredRoutes from "./utils/routes.ts"

const app = express()

// App configuration
app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: `
        Available endpoints: /api/v1/users: GET,POST,PUT,DELETE
        `
    })
})

app.use("/api/v1", apiRouter_v1)
app.use(express.static("public"))

try {
    console.info("Connecting to database ...")
    // TODO: Implement checking and verbose message if connected
    database.connect()
}catch(exception) {
    console.error(`Unable to connect to database: ${exception}`)
    exit
}

bootstrapDatabase()
insertTestDatabase(50, 3)

if(config.logging.enabled) {
    app.use(morgan(config.logging.format))
}

app.listen(config.network.port, config.network.host, () => {
    console.info(`Running up service @ http://${config.network.host}:${config.network.port}\n`)
})

printRegisteredRoutes(app.router.stack)