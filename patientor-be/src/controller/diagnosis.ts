import { Request, Response } from "express";
import { getDiagnosisData } from "../services/api-service";

const getDiagnosis = (_req: Request, res: Response) => {
  res.send(getDiagnosisData());
};

export { getDiagnosis };
