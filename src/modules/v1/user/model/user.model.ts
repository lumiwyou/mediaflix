export interface User {
    uuid: string,
    email: string,
    password_hash: string,
    deletion: boolean,
    locked: boolean
}