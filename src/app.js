import express from "express";
import apiRouter from "./routers/index.js";

const {PORT, NODE_ENV} = process.env;
const app = express();

// Middlewares
app.use(express.json());

// Routing
app.use("/api", apiRouter);

app.listen(PORT, (error) => {
    if(error) {
        console.log(`Failure to start server`, error);
        return;
    }

    console.log(`Web api running on:`, `http://localhost:${PORT}`, `[${NODE_ENV}]`);
})