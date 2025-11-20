import { Router } from "express";
import { CreateRegistration, GetRegistrations } from "../services/registration.js";
import { isAuthenticated } from "../services/authentication.js";
import { isAdminOrSuperuser } from "../services/user.js";

export const registrationRouter = Router()

registrationRouter.post('/create', isAuthenticated, CreateRegistration)
registrationRouter.get('/get', isAdminOrSuperuser, GetRegistrations)