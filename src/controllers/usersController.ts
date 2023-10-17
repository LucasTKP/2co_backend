import { Request, Response } from "express"

import prisma from '../database/client'
import { decrypt, encryptId } from "../encrypt/crypto"

export class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        req.body.id = encryptId(req.body.id)

        try {
            await prisma.users.create({ data: req.body })
            res.status(201).end()
        } catch (error) {
            res.end()
            console.error(error)
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const result = await prisma.users.update({
                where: { id: req.params.id },
                data: req.body
            })

            if (result) {
                res.status(204).end()
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado um usuário com o id enviado para ser atualizado.'
                })
                    .end()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }


    }

    public async retrieveOne(req: Request, res: Response): Promise<void> {
        try {
            req.params.id = encryptId(req.params.id)
            const result = await prisma.users.findUnique({
                where: { id: req.params.id }
            })

            if (result) {
                res.json({ status: 200, ...result})
            } else {
                res.json({
                    status: 404,
                    message: 'Não foi encontrado um usuário com o id enviado.'
                })
                    .end()
            }
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    }
}