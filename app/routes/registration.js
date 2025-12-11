import { Router } from "express";
import { CreateRegistration, GetRegistrations } from "../services/registration.js";
import { isAuthenticated } from "../services/authentication.js";

export const registrationRouter = Router()

registrationRouter.post('/create', isAuthenticated, CreateRegistration)
registrationRouter.get('/get', isAuthenticated, GetRegistrations)