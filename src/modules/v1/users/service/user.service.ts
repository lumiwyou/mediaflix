import database from "../../../../config/database/index.ts"
import { type User } from "../model/user.model.ts"

export async function getUserById(userId: string) {
    const user: User = await new Promise<User>((resolve, reject) => database.query(`
        SELECT users.email FROM users WHERE users.uuid == '${userId}'
        `, (error: any, results: any) => {
            if(error) reject(false)

            const user: User = {
                userId: userId,
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
    database.query(`
        INSERT INTO users('uuid', 'email', 'password_hash') VALUES('${user.userId}', '${user.email}', '${user.password_hash}')
        `)
    const res = await getUserById(user.userId)
    if(res.email == null) return false
    return true
}

export async function deleteUser(modify_user: User) {
    // Schedule for deletion
    // TODO: Implement routine deletion procedure
    database.query(`
        UPDATE users
        SET users.deletion = ${modify_user.deletion}, users.locked = ${modify_user.locked}
        WHERE users.id == ${modify_user.userId}
        `)

    const res = await getUserById(modify_user.userId)
    if(res.deletion != true || res.locked != true) return false
    return true
}

export async function updateUser(modify_user: User) {
    database.query(`
        UPDATE users
        SET users.email = ${modify_user.email}, users.password_hash = ${modify_user.password_hash}
        WHERE users.id == ${modify_user.userId}
        `)
    
    const res = await getUserById(modify_user.userId)
    if(res.email != modify_user.email || res.password_hash != modify_user.password_hash) return false
    return true
}

export async function getUsers() {
    return await new Promise<User[]>((resolve, reject) => database.query(`
        SELECT * FROM users
        `, (error: any, results: any) => {
            if(error) reject(false)

            let users: User[] = []

            results.array.forEach((found_user: any) => {
                const user: User = {
                    userId: found_user.userId,
                    email: found_user.email,
                    password_hash: found_user.password_hash,
                    deletion: found_user.deletion,
                    locked: found_user.locked
                }

                users.push(user)
            });

            resolve(users)
        }))
}

export default { getUserById, createUser, deleteUser, updateUser, getUsers }