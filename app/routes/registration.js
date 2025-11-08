import { Router } from "express";
import { CreateRegistration } from "../services/registration";
import { isAuthenticated } from "../services/authentication";

export const registrationRouter = Router()

registrationRouter.post('/create', isAuthenticated, CreateRegistration)