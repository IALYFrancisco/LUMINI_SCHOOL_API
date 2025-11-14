import { Router } from "express";
import { CreateRegistration, GetRegistrations } from "../services/registration.js";
import { isAuthenticated } from "../services/authentication.js";
import { isAdmin } from "../services/user.js";

export const registrationRouter = Router()

registrationRouter.post('/create', isAuthenticated, CreateRegistration)
registrationRouter.post('/get', isAdmin, GetRegistrations)