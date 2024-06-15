import { format } from 'date-fns';

export const formatData = (data: any) => {
    const formattedData = {
        ...data,
        experience: data.experience.slice(1),
        birthDate: data.birthDate ? format(new Date(data.birthDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : undefined,
    };

    return formattedData
}

export const formatPdf = (pdfFile: any) => {
    let formData = new FormData();
    formData.append('resume', pdfFile[0]?.originFileObj);

    return formData
}