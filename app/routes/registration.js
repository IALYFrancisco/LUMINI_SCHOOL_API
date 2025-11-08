import { Router } from "express";
import { CreateRegistration } from "../services/registration.js";
import { isAuthenticated } from "../services/authentication.js";

export const registrationRouter = Router()

registrationRouter.post('/create', isAuthenticated, CreateRegistration)