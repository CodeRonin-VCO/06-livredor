import { Router } from "express"
import guestbookRouter from "./guestbook.router.js";
import messageRouter from "./message.router.js";
import authRouter from "./auth.router.js";


const apiRouter = Router();

apiRouter.use("/message", messageRouter);
apiRouter.use("/guestbook", guestbookRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;