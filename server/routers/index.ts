import {Router} from "express";
import TicketRouter from './tickets';

let MainRouter = Router();

MainRouter.use('/tickets/', TicketRouter);

export default MainRouter;