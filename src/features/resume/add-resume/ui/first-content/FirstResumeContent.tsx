import { Control, FieldErrors} from 'react-hook-form';
import styles from './FirstResumeContent.module.scss'
import { FormInput } from '@/shared/ui';

interface FirstResumeContentInterface {
    control: Control<any>;
    errors: FieldErrors<any>;
}

const FirstResumeContent = ({control, errors}: FirstResumeContentInterface) => {
    return (
        <div className={styles.container}>
            <FormInput 
                name="workSphere" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="В какой сфере вы бы хотели работать?"
                small
            />

            <FormInput 
                name="education" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="Какое у вас образование?"
                small
            />

            <FormInput 
                name="university" 
                control={control} 
                errors={errors}
                label="Какое учебное заведение вы окончили?"
                small
            />

            <footer>
                <FormInput 
                    name="speciality" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Специальность"
                    small
                />

                <FormInput 
                    name="endingYear" 
                    control={control} 
                    errors={errors} 
                    label="Год окончания"
                    small
                />
            </footer>
        </div>
    )
}

export default FirstResumeContent;