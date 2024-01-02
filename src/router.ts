import { Router } from "express";
import packageJson from './../package.json'
import { getNota } from "./Controllers/getNota";
import { createNota } from "./Controllers/createNota";
import { deleteNota } from "./Controllers/deleteNota";
import express, { json } from "express";

const router = Router();

router.use(express.json());

router.get("/notas", getNota);
router.post("/notas", createNota);
router.delete("/notas", deleteNota);

//Rota Base Para Validar a Aplicação
router.get("/", (_, res) => {
    const { name, version, description, author } = packageJson

    res.json({ name, version, description, author })
})

export default router;