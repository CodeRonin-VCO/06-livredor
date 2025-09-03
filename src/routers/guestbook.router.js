import { Router } from "express";
import guestbookController from "../controllers/guestbook.controller.js";


const guestbookRouter = Router();

guestbookRouter.route("/")
    // .get(guestbookController.message) // test connect
    .get(guestbookController.cutOffMessage)
    .post(guestbookController.postMessage);

guestbookRouter.route("/:id")
    .get(guestbookController.detailsMessage)


export default guestbookRouter;