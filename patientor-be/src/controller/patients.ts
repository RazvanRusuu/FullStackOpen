import { Request, Response } from "express";
import patients from "../../data/patients";
import { PatientNonSensitive } from "../../types/types";
import { toNewPatientData } from "../../utilis/utils";
import patientData from "../../data/patients";

const getPatientNonSensitive = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const getPatients = (_req: Request, res: Response) => {
  res.send(getPatientNonSensitive());
};

const addPatient = (req: Request, res: Response) => {
  const newPatientData = toNewPatientData(req.body);

  patientData.push(newPatientData);

  res.json(newPatientData);
};

export { getPatients, addPatient };
