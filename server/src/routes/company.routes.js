import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    createCompanyHandler,
    getCompaniesHandler,
    updateCompanyHandler,
    deleteCompanyHandler,
} from "../controllers/company.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/register").post(createCompanyHandler);

router.route("/profile").get(getCompaniesHandler);

router.route("/:id/update").put(updateCompanyHandler);
router.route("/:id/delete").delete(deleteCompanyHandler);

export default router;