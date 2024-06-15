import { Control, FieldErrors } from 'react-hook-form';
import styles from './SecondResumeContent.module.scss'
import { FormInput } from '@/shared/ui';

interface SecondResumeContentInterface {
    control: Control<any>;
    errors: FieldErrors<any>;
}

const SecondResumeContent = ({control, errors}: SecondResumeContentInterface) => {
    return (
        <div className={styles.container}>
            <FormInput 
                name="city" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="В каком городе вы проживаете?"
                small
            />

            <FormInput 
                name="birthDate" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="Введите вашу дату рождения"
                type="date"
            />

            <FormInput 
                name="citizenship" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="Какое у вас гражданство?"
                small
            />

            <FormInput 
                name="genderId" 
                control={control} 
                errors={errors} 
                rules={{
                    required: "Это поле обязательно.",
                }} 
                label="Ваш пол"
                type="radio"
            />
        </div>
    )
}

export default SecondResumeContent;