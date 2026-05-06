/**
 * @file server.js
 * @author Lumi Hyväri <lumi.hyvari@gmail.com>
 * @description Service set up, API routes and endpoints, etc.
 */

import express from "express";
import morgan from "morgan";
import config from "./settings.json" with { type: 'json' };
import routes from "./src/routes/routes.js";

const app = new express();

// App configuration
app.use(routes);
app.use(express.static("public"));

if(config.logging.enabled) {
    app.use(morgan(config.logging.format));
}

app.listen(config.network.port, config.network.host, () => {
    console.info(`Running up service @ http://${config.network.host}:${config.network.port}`);
});