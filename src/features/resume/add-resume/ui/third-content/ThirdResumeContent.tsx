import { Control, FieldErrors } from 'react-hook-form';
import styles from './ThirdResumeContent.module.scss'
import { FormInput } from '@/shared/ui';

interface ThirdResumeContentInterface {
    control: Control<any>;
    errors: FieldErrors<any>;
    prefix: string;
}

const ThirdResumeContent = ({ control, errors, prefix }: ThirdResumeContentInterface) => {
    return (
        <div className={styles.container}>
            <FormInput 
                name={`${prefix}.company`} 
                control={control} 
                errors={errors} 
                label="В какой компании вы работали?"
                small
            />

            <FormInput 
                name={`${prefix}.jobPosition`} 
                control={control} 
                errors={errors}
                label="Какую должность вы занимали?"
                small
            />

            <FormInput 
                name={`${prefix}.responsibilities`} 
                control={control} 
                errors={errors} 
                label="Расскажите о ваших обязанностях"
                small
            />

            <FormInput 
                name={`${prefix}.workExperience`} 
                control={control} 
                errors={errors} 
                label="Какой опыт работы в данной компании?"
                small
            />
        </div>
    );
}

export default ThirdResumeContent;