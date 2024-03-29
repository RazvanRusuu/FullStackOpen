import { Gender, Patient } from "../types/types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const parseValue = (text: unknown) => {
  if (!text || !isString(text)) {
    throw new Error("Invalid name");
  }

  return text;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown) => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender");
  }

  return gender;
};

const toNewPatientData = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      id: uuid(),
      name: parseValue(object.name),
      dateOfBirth: parseValue(object.dateOfBirth),
      ssn: parseValue(object.ssn),
      occupation: parseValue(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export { toNewPatientData };
