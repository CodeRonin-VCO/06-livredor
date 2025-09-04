import express from "express";
import apiRouter from "./routers/index.js";
import morgan from "morgan";
import { authentificationMiddleware } from "./middlewares/auth.middleware.js";

// ==== Setup ====
const {PORT, NODE_ENV} = process.env;
const app = express();

// ==== Global middlewares ====
app.use(morgan("tiny"));
app.use(authentificationMiddleware());
app.use(express.json());

// ==== Routing ====
app.use("/api", apiRouter);

// ==== Middleware Error ====
app.use((error, req, res, next) => {
    console.log('Erreur : ' + error.cause);

    if (NODE_ENV === "dev") {
        res.status(500)
            .json({
                name: error.name, 
                message: error.message || "Aucun message", 
                content: error.stack
            })
    } else {
        res.status(500).json({
            message: `Une erreur s'est produite en production. Type d'erreur : ${error.name}`
        })
    }

    // next(error)
})

// ==== Serveur ====
app.listen(PORT, (error) => {
    if(error) {
        console.log(`Failure to start server`, error);
        return;
    }

    console.log(`Web api running on:`, `http://localhost:${PORT}`, `[${NODE_ENV}]`);
})