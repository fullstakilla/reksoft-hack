import { FormInput } from "@/shared/ui";
import { Button } from "antd"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from './LoginForm.module.scss'
import { useAppDispatch } from "@/shared/model/redux-hooks";
import { login } from "../model/login";
import { useState } from "react";

interface LoginFormInterface {
    roleId: roleIdType;
}

const LoginForm = ({roleId}: LoginFormInterface) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLoginSubmit = async (data: any) => {
        const credentials = { ...data, role_id: roleId };
    
        try {
            setServerError('')
            await dispatch(login(credentials)).unwrap();
            navigate('/news');
        } catch {
            setServerError('Произошла ошибка. Убедитесь, что вы вводите корректные данные.')
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLoginSubmit)} className={styles.form}>
            <h1 className={styles.title}>Авторизация <br />
                <span className={roleId === 1 ? styles.fillTitle : ''}> соискателя </span>
                /
                <span className={roleId === 2 ? styles.fillTitle : ''}> рекрутера</span>
            </h1>

            <div className={styles.inputs}>
                <FormInput 
                    name="login" 
                    control={control} 
                    errors={errors} 
                    rules={{
                        required: "Это поле обязательно.",
                    }} 
                    label="Номер телефона или почта"
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
                <Button className={styles.submitBtn} type="primary" htmlType="submit">Войти</Button>
                <Link className={styles.noAcc} to='/register'>Нет аккаунта?</Link>
            </footer>
        </form>
    )
}

export default LoginForm