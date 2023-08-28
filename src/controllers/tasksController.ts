import { Request, Response } from "express"
import { ITask, Task } from "../models/task"

export class TasksController {
    public async getTasks(req: Request, res: Response): Promise<void> {
        const tasks = await Task.find()
        res.json({
            data: tasks,
            message: 'Query de todas as tasks realizado com sucesso!'
        })
    }

    public async getTasksById(req: Request, res: Response): Promise<void> {
        const task = await Task.findOne({ taskId: req.params.id })
        if (task === null) {
            res.json({
                status: 404,
                data: [],
                message: 'Não foi encontrado uma task com o id enviado.'
            })
        } else {
            res.json({
                data: task,
                message: 'Query da task em especifico realizado com sucesso!'
            })
        }
    }

    public async createTasks(req: Request, res: Response): Promise<void> {
        const newTask: ITask = new Task(req.body)

        const task = await Task.findOne({ taskId: req.body.taskId })

        if (task === null) {
            const result = await newTask.save()

            if (result === null) {
                res.sendStatus(500)
            } else {
                res.status(201).json({ status: 201, data: result })
            }

        } else {
            res.sendStatus(422)
        }
    }

    public async updateTasks(req: Request, res: Response): Promise<void> {
        const task = await Task.findOneAndUpdate({ taskId: req.params.id }, req.body)

        if (task === null) {
            res.json({
                status: 404,
                data: [],
                message: 'Não foi encontrado uma task com o id enviado para ser atualizada.'
            })
        } else {
            const updatedTask = { taskId: req.params.id, ...req.body }
            res.json({ status: res.status, data: updatedTask })
        }
    }

    public async deleteTasks(req: Request, res: Response): Promise<void> {
        const task = await Task.findOneAndDelete({ taskId: req.params.id })

        if (task === null) {
            res.json({
                status: 404,
                data: [],
                message: 'Não foi encontrado uma task com o id enviado para ser deletada.'
            })
        } else {
            res.json({ message: "Task deletada com sucesso" })
        }
    }
}