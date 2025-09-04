import { Router } from "express";
import guestbookController from "../controllers/guestbook.controller.js";
import { authorizedMiddleware } from "../middlewares/auth.middleware.js";


const guestbookRouter = Router();

guestbookRouter.route("/")
    // .get(guestbookController.message) // test connect
    .get(guestbookController.cutOffMessage)
    .post(authorizedMiddleware(),guestbookController.postMessage)
;
guestbookRouter.route("/:id")
    .get(authorizedMiddleware(), guestbookController.detailsMessage)
    .put(authorizedMiddleware(), guestbookController.modifyMsg)
;

export default guestbookRouter;