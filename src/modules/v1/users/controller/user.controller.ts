import userService from "../service/user.service.ts"
import { type User } from "../model/user.model.ts"
import { randomUUID } from "node:crypto"
import type { NextFunction, Request, Response } from "express";

// Use async because otherwise we're gonna back up the entire queue
// TODO: This should be removed in production
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    if(req.query.userId == undefined) {
        res.status(400).json({
            success: false,
            message: "No UUID was received"
        })
        return
    }

    const user: User = await userService.getUserById(req.query.userId as string);

    return res.status(200).json({
        success: true,
        user: user
    })
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    const users: User[] = await userService.getUsers()
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const user: User = {
        userId: randomUUID(),
        email: req.params.email as string,
        password_hash: req.params.password_hash as string,
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

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement cookie check before deletion
    // Require email and password as well for confirmation through authentication
    if(req.query.userId == undefined
        || req.query.email == undefined
        || req.query.password_hash == undefined
    ) {
        res.status(400).json({
            success: false,
            message: "Invalid credentials for confirmation"
        });
        return
    }

    const modify_user: User = {
        userId: req.query.userId as string,
        email: req.query.email as string,
        password_hash: req.query.password_hash as string,
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

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const modify_user: User = {
        userId: req.query.userId as string,
        email: req.query.email as string,
        password_hash: req.query.password_hash as string,
        deletion: false,
        locked: false
    }

    if(!userService.updateUser(modify_user)) {
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
        return
    }
    res.status(200).json({
        success: true,
        message: "User has been updated"
    })
}

export default { getUserById, createUser, deleteUser, updateUser, getUsers }