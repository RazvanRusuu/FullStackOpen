import express from "express";
import { addPatient, getPatients } from "../controller/patients";

const router = express.Router();

router.route("/").get(getPatients).post(addPatient);

export default router;
