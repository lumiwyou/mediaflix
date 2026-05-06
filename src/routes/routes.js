import { Router } from "express";
//import bookController from "./root/root.controller.js";

const api = Router()
    // Route controllers here
    //.use(rootController)

export default Router().use("/api", api);