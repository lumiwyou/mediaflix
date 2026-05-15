import { Router } from "express"
import libraryController from "../controller/library.controller.ts"

export const libraryRouter = Router()
    .get("/users/:userId/library/:libraryId", libraryController.getLibraryById)
    //.post("/users/:userId/library", libraryController.createLibrary)
    //.put("/users/:userId/library/:libraryId", libraryController.updateLibrary)
    //.delete("/users/:userId/library/:libraryId", libraryController.deleteLibrary)

export default libraryRouter