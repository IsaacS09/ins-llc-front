import type { MedicalTreatment } from "./medical-treatment.interface";

export interface Patient extends PatientAddons {
    id: string;
    address: string;
    age: number;
    birthday: string;
    emergencyContact: string;
    gender: Gender;
    lastVisit: string;
    name: string;
    notes: string;
    status: Status;
    supervisor: string;
}

export interface PatientAddons {
    photo?: File | undefined | string;
    medicalTreatments?: MedicalTreatment[];
    documents?: File[];
    haveSignature?: boolean;
    signature?: string;
}

type Status = 'Active' | 'Inactive';
type Gender = 'Male' | 'Female';

export type CreatePatient = Pick<Patient,
    | 'address'
    | 'age'
    | 'birthday'
    | 'documents'
    | 'emergencyContact'
    | 'gender'
    | 'haveSignature'
    | 'name'
    | 'notes'
    | 'photo'
    | 'status'
    | 'supervisor'
>;
export type UpdatePatient = Pick<Patient,
    | 'address'
    | 'age'
    | 'birthday'
    | 'emergencyContact'
    | 'gender'
    | 'lastVisit'
    | 'name'
    | 'notes'
    | 'photo'
    | 'status'
    | 'supervisor'
>;
export type PatientSummary = Pick<Patient,
    | 'id'
    | 'name'
    | 'age'
    | 'gender'
    | 'status'
    | 'lastVisit'>;

