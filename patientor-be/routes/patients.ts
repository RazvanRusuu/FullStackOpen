import express from "express";
import { getPatients } from "../controller/patients";

const router = express.Router();

router.route("/").get(getPatients);

export default router;
