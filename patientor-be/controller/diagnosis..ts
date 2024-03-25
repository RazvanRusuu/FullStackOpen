import { Request, Response } from "express";
import diagnosis from "../data/diagnosis";

const getDiagnosis = (_req: Request, res: Response) => {
  res.status(200).json({ data: diagnosis });
};

export { getDiagnosis };
