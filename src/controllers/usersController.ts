import { Request, Response } from "express"
import { User } from "../models/user"

export class UserController {

    public async registerUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({ userId: req.body.id })

        if (user === null) {
            const result = await User.create({
                userId: req.body.id,
                username: req.body.username,
                email: req.body.email
            })
    
            res.send({ 
                status: 201,
                data: result,
                message: 'Usuário criado com sucesso!'
            })
        } else {
            res.send({
                message: 'Usuário já cadastrado.'
            })
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({ userId: req.params.id })

        if (user === null) {
            res.json({
                data: {},
                message: 'Não foi encontrado um usuário com este id.'
            })
        } else {
            res.json({
                data: user,
                message: 'Query do usuário em especifico realizado com sucesso!'
            })
        }
    }
}