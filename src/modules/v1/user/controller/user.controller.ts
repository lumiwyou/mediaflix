import userService from "../service/user.service"
import User from "../model/user.model"
import { randomUUID } from "node:crypto"

// Use async because otherwise we're gonna back up the entire queue
export async function getById(req, res, next) {
    const user = userService.getById(req.params.uuid);
    return res.status(200).json({
        success: true,
        user: user
    })
}

export async function createUser(req, res, next) {
    const user: User = {
        uuid: randomUUID(),
        email: req.body.email,
        password_hash: req.body.password_hash
    }
    if(!userService.createUser(user)) {
        res.status(500).send("Unable to create user")
    }else{
        res.status(200).json(user)
    }
}

export default { getById, createUser }