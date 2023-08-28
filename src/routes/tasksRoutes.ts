import { Router } from "express"
import { TasksController } from "../controllers/tasksController"

export class TasksRoutes {

    public router: Router
    public tasksController: TasksController = new TasksController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.get("/", this.tasksController.getTasks)
        this.router.get("/:id", this.tasksController.getTasksById)
        this.router.post("/", this.tasksController.createTasks)
        this.router.put("/:id", this.tasksController.updateTasks)
        this.router.delete("/:id", this.tasksController.deleteTasks)
    }
}