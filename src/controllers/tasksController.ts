import { Request, Response } from "express"
import prisma from '../database/client'

export class TaskController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await prisma.tasks.create({ data: req.body })
            res.status(201).end()
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }

    public async retrieveAll(req: Request, res: Response): Promise<void> {
        try {
            const result = await prisma.tasks.findMany({ where: { idProject: req.params.id } })
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const result = await prisma.tasks.update({
                where: { id: req.params.id },
                data: req.body
            })

            if (result) {
                res.status(204).end()
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado uma task com o id enviado para ser atualizada.'
                })
                .end()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const result = await prisma.tasks.delete({
                where: { id: req.params.id }
            })

            if (result) {
                res.json({status: 204}).end()
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado uma task com o id enviado para ser deletada.'
                })
                .end()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }
}