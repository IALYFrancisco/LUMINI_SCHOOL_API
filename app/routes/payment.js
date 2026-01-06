import { Router } from "express";
import { InitiateTransaction } from "../services/payment.js";
import { isAuthenticated } from "../services/authentication.js";

export const paymentRouter = Router()

paymentRouter.post('/initiate', isAuthenticated, InitiateTransaction)