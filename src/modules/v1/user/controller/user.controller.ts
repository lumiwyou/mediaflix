import userService from "../service/user.service.ts"
import User from "../model/user.model.ts"
import { randomUUID } from "node:crypto"

// Use async because otherwise we're gonna back up the entire queue
// TODO: This should be removed in production
export async function getById(req: any, res: any, next: any) {
    const user: User = await userService.getById(req.params.uuid);

    return res.status(200).json({
        success: true,
        user: user
    })
}

export async function createUser(req: any, res: any, next: any) {
    const user: User = {
        uuid: randomUUID(),
        email: req.body.email,
        password_hash: req.body.password_hash,
        deletion: false,
        locked: false
    }

    if(!userService.createUser(user)) {
        res.status(500).json({
            success: false,
            message: "Unable to create user"
        })
    }else{
        res.status(200).json({
            success: true,
            message: "Successfully created user",
            user: user
        })
    }
}

export async function deleteUser(req: any, res: any, next: any) {
    // TODO: Implement cookie check before deletion
    // Require email and password as well for confirmation through authentication
    if(req.params.id == undefined
        || req.params.email == undefined
        || req.params.password_hash == undefined
    ) {
        res.status(400).json({
            success: false,
            message: "Invalid credentials for confirmation"
        });
        return
    }

    const modify_user: User = {
        uuid: req.params.id,
        email: req.params.email,
        password_hash: req.params.password_hash,
        deletion: true,
        locked: true
    }

    if(!userService.deleteUser(modify_user)) {
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
        return
    }

    res.status(200).json({
        success: true,
        message: "Account has been scheduled for deletion"
    })
}

export default { getById, createUser, deleteUser }