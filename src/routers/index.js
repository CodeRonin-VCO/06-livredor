import { Router } from "express"
import guestbookRouter from "./guestbook.router.js";
import messageRouter from "./message.router.js";


const apiRouter = Router();

apiRouter.use("/message", messageRouter);
apiRouter.use("/guestbook", guestbookRouter);

export default apiRouter;