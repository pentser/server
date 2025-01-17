import express from "express";
import cors from "cors";
import Joi from "joi";
import fs from "fs/promises";

const app = express();
const PORT= process.env.PORT | 3000;

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.listen(PORT,()=> {
    console.log("start server...")
})