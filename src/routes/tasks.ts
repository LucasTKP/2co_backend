import { Router } from "express"
import { TaskController } from "../controllers/tasksController"

export class Tasks {

    public router: Router
    public tasksController: TaskController = new TaskController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post("/", this.tasksController.create)
        this.router.get("/", this.tasksController.retrieveAll)
        this.router.put("/:id", this.tasksController.update)
        this.router.delete("/:id", this.tasksController.delete)
    }
}