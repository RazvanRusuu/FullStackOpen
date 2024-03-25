import express from "express";
import { getDiagnosis } from "../controller/diagnosis.";

const router = express.Router();

router.route("/").get(getDiagnosis);

export default router;
