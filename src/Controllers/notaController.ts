import { Request, Response } from "express";
import { database } from "../Services/database";
import { Bimestre, Disciplina } from "@prisma/client";


export const createNota = async (request: Request, response: Response) => {
    try {

        // Extrai os dados do corpo da requisição
        const { bimestre, disciplina, nota } = request.body;

        // Verifica se a nota é um número válido entre 0 e 10
        const notaFloat = parseFloat(nota);
        if (isNaN(notaFloat) || notaFloat < 0 || notaFloat > 10) {
            return response.status(400).json({ message: "Por favor, insira uma nota válida" });
        }

        // Verifica se o bimestre é válido
        if (!Object.values(Bimestre).includes(bimestre)) {
            return response.status(400).json({ message: "A nota não pode ser lançada, o bimestre fornecido é inválido" });
        }

        // Verifica se a disciplina é válida
        if (!Object.values(Disciplina).includes(disciplina)) {
            return response.status(400).json({ message: "A nota não pode ser lançada, a disciplina fornecida é inválida" });
        }

        // Verifica se já existe uma nota lançada para o mesmo bimestre e disciplina
        const verificaNota = await database.resultado.findFirst({
            where: { bimestre, disciplina },
        });

        if (verificaNota) {
            return response.status(400).json({ message: "Nota existente" });
        }

        // Cria a nota no banco de dados
        const salvaNota = await database.resultado.create({
            data: {
                bimestre,
                disciplina,
                nota: notaFloat,
            },
        });

        return response.status(201).json(salvaNota);
    } catch (error) {
        // Se ocorrer um erro, retorna um status 500 com detalhes do erro
        console.error("Erro ao obter as notas:", error);
        return response.status(500).json({ error: "Erro interno do servidor ao obter as notas" });
    }
};

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
