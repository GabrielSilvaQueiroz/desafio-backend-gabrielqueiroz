import { Request, Response } from "express";
import { database } from "../Services/database";

export const deleteNota = async (request: Request, response: Response) => {
    try {
        // Extrai o id do corpo da requisição
        const { id } = request.body;

        // Verifica se o id foi informado
        if (!id) {
            return response.status(400).json({ message: "Por favor, informe o id" });
        }

        // Procura o id na tabela resultados no banco de dados
        const consultaNoBanco = await database.resultado.findFirst({ where: { id } });

        // Caso o id não tenha sido encontrado, retorna o erro
        if (!consultaNoBanco) {
            return response
                .status(404)
                .json({ message: "O id informado não foi encontrado no banco de dados" });
        }

        // Deleta o resultado do banco de dados
        await database.resultado.delete({ where: { id } });

        // Retorna uma resposta indicando sucesso (status 204)
        return response.status(204).json();

    } catch (err) {
        // Se houver erro, retorna um status 400 com detalhes do erro
        return response.status(400).json({ errorNota: err });
    }
};
