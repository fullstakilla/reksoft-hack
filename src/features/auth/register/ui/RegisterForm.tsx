import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.scss'
import { FormInput } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { memo, useState } from 'react';
import { useAppDispatch } from '@/shared/model/redux-hooks';
import { registration } from '../model/register';

interface RegisterFormInterface {
    roleId: roleIdType;
}

const RegisterForm = memo(({roleId}: RegisterFormInterface) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLoginSubmit = async (data: any) => {
        const credentials = {...data, role_id: roleId}

        try {
            setServerError('')
            await dispatch(registration(credentials)).unwrap()
            navigate('/news')
        } catch  {
            setServerError('Произошла ошибка. Убедитесь, что вы вводите корректные данные.')
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLoginSubmit)} className={styles.form}>
            <h1 className={styles.title}>Создание аккаунта <br />
                для
                <span className={roleId === 1 ? styles.fillTitle : ''}> соискателя </span>
                /
                <span className={roleId === 2 ? styles.fillTitle : ''}> рекрутера</span>
            </h1>

            <div className={styles.inputs}>
                <FormInput 
                    name="name" 
                    control={control} 
                    errors={errors} 
                    rules={{ required: "Это поле обязательно." }} 
                    label="Имя"
                />

                <FormInput 
                    name="surname" 
                    control={control} 
                    errors={errors} 
                    rules={{ required: "Это поле обязательно." }} 
                    label="Фамилия"
                />

                <FormInput 
                    name="patronymic" 
                    control={control} 
                    errors={errors} 
                    label="Отчество"
                />

                <FormInput 
                    name="phone" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                        pattern: {
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: "Неправильно указан телефон."
                        }
                    }} 
                    label="Телефон"
                />

                <FormInput 
                    name="email" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Неправильно указана почта."
                        }
                    }} 
                    label="Почта"
                />

                <FormInput 
                    name="password" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                        minLength: {
                            value: 8,
                            message: "Пароль должен быть не менее 8 символов."
                        }
                    }}
                    type="password"
                    label="Пароль"
                />

                <span className={styles.error}>{serverError}</span>
            </div>

            <footer>
                <Button className={styles.submitBtn} type="primary" htmlType="submit">Зарегистрироваться</Button>
                <span className={styles.underBtn}>Уже есть аккаунт? <Link to='/login'>Войти</Link> </span>
            </footer>
        </form>
    );
})

export default RegisterForm;
