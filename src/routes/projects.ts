import { Router } from "express"
import { ProjectController } from "../controllers/projectsController"

export class Projects {

    public router: Router
    public tasksController: ProjectController = new ProjectController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post("/", this.tasksController.create)
        this.router.put("/:id", this.tasksController.update)
        this.router.delete("/:id", this.tasksController.delete)
        this.router.get("/:id", this.tasksController.retrieveOne)
    }
}