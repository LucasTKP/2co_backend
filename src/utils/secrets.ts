import 'dotenv/config'

export const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.log("Nenhuma chave de conexão foi passada para o Mongo, adicione em seu .env a variavel: 'MONGODB_URI'")
    process.exit(1)
}