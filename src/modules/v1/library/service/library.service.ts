import database from "../../../../config/database/index.ts"
import type { Library } from "../model/library.model.ts"

export async function getLibraryById(userId: string, libraryId: number) {
    const library: Library = await new Promise<Library>((resolve, reject) => database.query(`
        SELECT * FROM library WHERE library.libraryId == '${libraryId}' 
        AND library.userId == '${userId}'
        `, (error: any, results: any) => {
            if(error) reject(false)

            const library: Library = {
                libraryId: results[0].libraryId
            }

            resolve(library)
        }))

    return library
}

export default { getLibraryById }