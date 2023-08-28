import express from "express"
import mongoose from "mongoose"

import compression from "compression"
import cors from "cors"

import { MONGODB_URI } from "./utils/secrets"

import { TasksRoutes } from "./routes/tasksRoutes"
import { UsersRoutes } from "./routes/usersRoutes"

class Server {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.mongo()
    }

    public routes(): void {
        this.app.use("/api/users", new UsersRoutes().router)
        this.app.use("/api/tasks", new TasksRoutes().router)
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 3000)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(compression())
        this.app.use(cors())
    }

    private mongo() {
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Mongo foi conectado 🟢")
        })

        connection.on("reconnected", () => {
            console.log("Mongo foi reconectado 🔵")
        })

        connection.on("disconnected", () => {
            console.log("Mongo foi desconectado 🔴")
            console.log("Tentando reconectar 🟡 ...")
            setTimeout(() => {
                mongoose.connect(MONGODB_URI!, {
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                })
            }, 3000)
        })

        connection.on("close", () => {
            console.log("Mongo foi desligado ⚪")
        })

        connection.on("error", (error: Error) => {
            console.log("Mongo retornou o seguinte erro: " + error)
        })

        const run = async () => {
            await mongoose.connect(MONGODB_URI!)
        }
    
        run().catch(error => console.error(error))
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