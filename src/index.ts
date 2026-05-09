/**
 * @file server.js
 * @author Lumi Hyväri <lumi.hyvari@gmail.com>
 * @description Service set up, API routes and endpoints, etc.
 */

import express from "express"
import morgan from "morgan"
import config from "../settings.json" with { type: 'json' }
import api from "./modules/v1/index.ts"
import database from "./config/database/index.ts"
import { exit } from "node:process"

const app = express();

// App configuration
app.use(api);
app.use(express.static("public"));

try {
    console.info("Connecting to database ...")
    // TODO: Implement checking and verbose message if connected
    database.connect()
}catch(exception) {
    console.error(`Unable to connect to database: ${exception}`)
    exit
}

if(config.logging.enabled) {
    app.use(morgan(config.logging.format));
}

app.listen(config.network.port, config.network.host, () => {
    console.info(`Running up service @ http://${config.network.host}:${config.network.port}`);
})

// database.close()