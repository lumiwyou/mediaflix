import type { NextFunction, Request, Response } from "express";
import libraryService from "../service/library.service.ts"
import type { Library } from "../model/library.model.ts"

export async function getLibraryById(req: Request, res: Response, next: NextFunction) {
    // Validate user
    const { userId, libraryId } = req.params

    const library: Library = await libraryService.getLibraryById(
        userId as string,
        libraryId as unknown as number
    )

    if(library == undefined) {
        res.status(500).json({
            success: false,
            message: "Library was not found"
        })
        return
    }
    res.status(200).json({
        success: true,
        message: "Library was found",
        library: library
    })
}

export default { getLibraryById, createLibrary, updateLibrary, deleteLibrary }