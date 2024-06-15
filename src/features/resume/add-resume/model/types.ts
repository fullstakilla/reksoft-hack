export type Experience = {
    id: number;
    company: string;
    jobPosition: string;
    responsibilities: string;
    workExperience: string;
}

export type Resume = {
    birthDate: Date;
    citizenship: string;
    city: string;
    education: string;
    endingYear?: number;
    experience: Experience[];
    genderId: number;
    speciality: string;
    university?: string;
    workSpere: string;
    pdfFile: File;
}