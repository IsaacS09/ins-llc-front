export interface MedicalTreatment {
    id: string;
    medication: string;
    frequency: string;
    indication: string;
    status: 'Active' | 'Completed' | 'Discontinued';
    startDate: string;
    endDate: string;
}
