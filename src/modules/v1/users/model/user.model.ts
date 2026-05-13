export interface User {
    userId: string,
    email: string,
    password_hash: string,
    deletion: boolean,
    locked: boolean
}