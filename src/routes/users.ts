import { Router } from "express"
import { UserController } from "../controllers/usersController"

export class Users {
    router: Router
    public usersController: UserController = new UserController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post("/", this.usersController.create)
        this.router.put("/:id", this.usersController.update)
        this.router.get("/:id", this.usersController.retrieveOne)
    }
}