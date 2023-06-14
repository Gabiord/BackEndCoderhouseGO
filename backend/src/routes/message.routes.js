import { Router } from "express";
import * as MessagesController from "../controllers/messages.controller.js"

const router = Router();

router.get("/", MessagesController.getAllMessages);

router.post("/", MessagesController.saveNewMessage);

export default router;