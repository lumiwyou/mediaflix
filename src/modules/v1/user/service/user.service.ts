import connection from "../../../../config/database"
import User from "../model/user.model"

const NONE_FOUND = "none found"

export function getById(uuid: string) {
    const res = connection.query(`
        SELECT users.email FROM users WHERE users.uuid == '${uuid}'
        `)

    const user: User = {
        uuid: uuid,
        email: NONE_FOUND,
        password_hash: "" // Do not send out hash
    }

    if(res != undefined) {
        user.email = res.email
    }

    return user
}

export function createUser(user: User) {
    connection.query(`
        INSERT INTO users VALUES('${user.uuid}', '${user.email}', '${user.password_hash}')
        `)
    if(getById(user.uuid).email == NONE_FOUND) {
        return false
    }
    return true
}

export default { getById, createUser }