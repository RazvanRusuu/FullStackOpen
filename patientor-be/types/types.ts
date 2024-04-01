export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientNonSensitive = Omit<Patient, "ssn" | "entries">;
