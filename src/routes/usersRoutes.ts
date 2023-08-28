import { Router } from "express"
import { UserController } from "../controllers/usersController"

export class UsersRoutes {
    router: Router
    public usersController: UserController = new UserController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.get("/:id", this.usersController.getUserById)
        this.router.post("/register", this.usersController.registerUser)
    }
}