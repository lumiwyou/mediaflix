import connection from "../../../../config/database/index.ts"
import { type User } from "../model/user.model.ts"

export async function getById(uuid: string) {
    const user = await new Promise<User>((resolve, reject) => connection.query(`
        SELECT users.email FROM users WHERE users.uuid == '${uuid}'
        `, (error: any, results: any) => {
            if(error) reject(false)

            const user: User = {
                uuid: uuid,
                email: results[0].email,
                password_hash: "", // Do not send out hash
                deletion: results[0].deletion,
                locked: results[0].locked
            }

            resolve(user)
        }))

    return user
}

export async function createUser(user: User) {
    connection.query(`
        INSERT INTO users('uuid', 'email', 'password_hash') VALUES('${user.uuid}', '${user.email}', '${user.password_hash}')
        `)
    const res = await getById(user.uuid)
    if(res.email == null) return false
    return true
}

export async function deleteUser(modify_user: User) {
    // Schedule for deletion
    // TODO: Implement routine deletion procedure
    connection.query(`
        UPDATE users
        SET users.deletion = ${modify_user.deletion}, users.locked = ${modify_user.locked}
        WHERE users.id == ${modify_user.uuid}
        `)

    const res = await getById(modify_user.uuid)
    if(res.deletion != true || res.locked != true) return false
    return true
}

export async function updateUser(modify_user: User) {
    connection.query(`
        UPDATE users
        SET users.email = ${modify_user.email}, users.password_hash = ${modify_user.password_hash}
        WHERE users.id == ${modify_user.uuid}
        `)
    
    const res = await getById(modify_user.uuid)
    if(res.email != modify_user.email || res.password_hash != modify_user.password_hash) return false
    return true
}

export default { getById, createUser, deleteUser, updateUser }