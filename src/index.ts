import express, { json } from "express";
import "dotenv/config";
import router from "./router";
import cors from "cors";

const app = express();

app.use(router);
app.use(express.json());
app.use(cors());

const portaBackEnd = process.env.PORTA_BACK_END;

app.listen(portaBackEnd, () => {
    console.log(`Servidor Back-end rodando na porta ${portaBackEnd} 🚀`)
});