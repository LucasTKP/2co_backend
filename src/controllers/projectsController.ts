import { Request, Response } from "express"
import prisma from '../database/client'
import { encryptId } from "../encrypt/crypto"

export class ProjectController {
    public async create(req: Request, res: Response): Promise<void> {
        req.body.id = encryptId(req.body.id)
        try {
            await prisma.projects.create({ data: req.body })
            res.status(201).end()
        } catch (error) {
            console.error(error)
            res.end()
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id = encryptId(req.params.id)
        try {
            const result = await prisma.projects.update({
                where: { id: id},
                data: req.body
            })

            if (result) {
                res.status(204).end()
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado um projeto com o id enviado para ser atualizado.'
                })
                .end()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id = encryptId(req.params.id)
        
        try {
            const result = await prisma.projects.delete({
                where: { id: id}
            })

            if (result) {
                res.json({ status: 204 }).end()
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado um projeto com o id enviado para ser deletado.'
                })
                    .end()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }

    public async retrieveOne(req: Request, res: Response): Promise<void> {
        const id = encryptId(req.params.id)
        try {
            const result = await prisma.projects.findUnique({
                where: { id: id }
            })

            if (result) {
                res.json({ status: 200, ...result })
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado um projeto com o id enviado.'
                })
                    .end()
            }
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
}