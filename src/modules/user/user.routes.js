import * as UC from "./user.controllers.js"
import { Router } from "express";

// ! creating userRouter
const userRouter = Router()

userRouter.route("/")
    .get(UC.getUsers)
    .post(UC.addUser)

userRouter.route("/:id")
    .get(UC.getUser)
    .put(UC.updateUser)
    .delete(UC.deleteUser)
// ! exporting userRouter
export default userRouter