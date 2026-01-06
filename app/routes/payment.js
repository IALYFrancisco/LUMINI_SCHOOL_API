import { Router } from "express";
import { InitiateTransaction } from "../services/payment";
import { isAuthenticated } from "../services/authentication";

const paymentRouter = Router()

paymentRouter.post('/initiate', isAuthenticated, InitiateTransaction)