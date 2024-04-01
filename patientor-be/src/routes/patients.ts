import express from "express";
import { addPatient, getPatients, getPatient } from "../controller/patients";

const router = express.Router();

router.route("/").get(getPatients).post(addPatient);
router.route("/:id").get(getPatient);

export default router;
