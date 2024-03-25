import { Request, Response } from "express";
import patients from "../data/patients";
import { PatientNonSensitive } from "../types/types";

const getPatientNonSensitive = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const getPatients = (_req: Request, res: Response) => {
  res.send(getPatientNonSensitive());
};

export { getPatients };
