import express from "express"

import compression from "compression"
import cors from "cors"

import { Tasks } from "./routes/tasks"
import { Users } from "./routes/users"
import { Projects } from "./routes/projects"

class Server {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    public routes(): void {
        this.app.use("/api/users", new Users().router)
        this.app.use("/api/projects", new Projects().router)
        this.app.use("/api/tasks", new Tasks().router)
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 8080)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(compression())
        this.app.use(cors())
    }


    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(
            "Servidor ligado na porta:",
            this.app.get("port"),
            "🟢"
            )
        })
    }

}

const server = new Server();

server.start();