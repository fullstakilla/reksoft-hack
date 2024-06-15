export type Resume = {
    birthDate: string,
    citizenship: string,
    city: string,
    education: string,
    experience: [
      {
        company: string,
        id: number,
        jobPosition: string,
        responsibilities: string,
        resumeId: number,
        workExperience: string
      }
    ],
    genderId: number,
    speciality: string,
    university: string,
    workSphere: string
}