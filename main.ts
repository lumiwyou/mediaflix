/**
 * @file server.js
 * @author Lumi Hyväri <lumi.hyvari@gmail.com>
 * @description Service set up, API routes and endpoints, etc.
 */

import express from "express"
import morgan from "morgan"
import config from "./settings.json" with { type: 'json' }
import api from "./src/modules/v1/index.ts"
import database from "./src/config/database/index.ts"

const app = express();

// App configuration
app.use(api);
app.use(express.static("public"));

database.connect()

if(config.logging.enabled) {
    app.use(morgan(config.logging.format));
}

app.listen(config.network.port, config.network.host, () => {
    console.info(`Running up service @ http://${config.network.host}:${config.network.port}`);
})

// database.close()