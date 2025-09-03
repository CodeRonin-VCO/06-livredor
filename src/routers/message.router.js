import { Router } from "express";
import messageController from "../controllers/message.controller.js";


const messageRouter = Router();
messageRouter.route("/hello-world").get(messageController.message);


export default messageRouter;