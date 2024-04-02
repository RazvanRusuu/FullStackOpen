import { Entry, EntryType, Gender, Patient } from "../types/types";
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

const isEntryType = (type: string): type is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(type);
};

const parseEntryType = (type: unknown) => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Invalid type");
  }

  return type;
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
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient = {
      id: uuid(),
      name: parseValue(object.name),
      dateOfBirth: parseValue(object.dateOfBirth),
      ssn: parseValue(object.ssn),
      occupation: parseValue(object.occupation),
      gender: parseGender(object.gender),
      // entries: object.entries,
      entries: handleEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const handleEntries = (arrayEntry: unknown): Entry[] => {
  if (!arrayEntry || !Array.isArray(arrayEntry)) {
    throw new Error("Invalid data");
  }

  return arrayEntry.map(toNewEntries);
};

const toNewEntries = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid Data");
  }

  if (
    "date" in object &&
    "type" in object &&
    "description" in object &&
    "specialist" in object &&
    "employerName" in object
  ) {
    return {
      id: uuid(),
      date: parseValue(object.date),
      type: parseEntryType(object.type),
      description: parseValue(object.description),
      specialist: parseValue(object.specialist),
      employerName: parseValue(object.employerName),
    };
  }
  throw new Error("Incorrect data: some fields are missing");
};

export { toNewPatientData };
