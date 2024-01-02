import { database } from "../Services/database";
import { Request, Response } from "express";

export const getNota = async (request: Request, response: Response) => {
    try {
        // Consulta todas as notas no banco de dados
        const notas = await database.resultado.findMany();

        // Retorna as notas como resposta com status 200
        return response.status(200).json(notas);

    } catch (err) {
        // Se houver erro, retorna um status 400 com detalhes do erro
        return response.status(400).json({ errorNota: err });
    }
};

