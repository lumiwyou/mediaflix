import { database } from "../../../../config/database/index.ts"
import { type User } from "../model/user.model.ts"

export async function getUserById(userId: string) {
    const [rows, fields] = await database.query(`SELECT users.userId, users.email, users.deletion, users.locked FROM users WHERE users.userId == '${userId}'`)
    return {
        userId: rows[0].userId as unknown as string,
        email: rows[0].email,
        password_hash: "",
        deletion: rows[0].deletion,
        locked: rows[0].locked
    }
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
    const [rows, fields] = await database.query("SELECT users.userId, users.email, users.deletion, users.locked FROM users")
    let users: User[] = [];
    rows.array.forEach((row: {userId: string, email: string, deletion: boolean, locked: boolean}) => {
        users.push({
            userId: row.userId,
            email: row.email,
            password_hash: "",
            deletion: row.deletion,
            locked: row.locked
        })
    });
    return users
}

export default { getUserById, createUser, deleteUser, updateUser, getUsers }