export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientNonSensitive = Omit<Patient, "ssn">;
