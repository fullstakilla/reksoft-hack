import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input, DatePicker, Radio, Upload, Button } from 'antd';
import styles from './FormInput.module.scss';
import { classNames } from '@/shared/lib/classNames';
import upload from '@/shared/assets/upload.svg';

interface FormInputProps {
    name: string;
    control: Control<any>;
    errors: FieldErrors<any>;
    rules?: { [key: string]: any };
    label: string;
    small?: boolean;
    type?: string;
}

const getErrorMessage = (error: any) => {
    if (error) {
        if (typeof error === 'string') {
            return error;
        }
        if (error.message) {
            return error.message;
        }
    }
    return null;
}

const FormInput = ({ name, control, errors, rules, label, small, type }: FormInputProps) => {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) => {
                    if (type === 'date') {
                        return <DatePicker value={value} onChange={onChange} id={name} className={classNames(styles.input, {[styles.small]: small}, [])} />;
                    }
                    if (type === 'radio') {
                        return (
                            <Radio.Group value={value} onChange={onChange} id={name} className={classNames(styles.input, {[styles.small]: small}, [])}>
                                <Radio value={1}>Мужской</Radio>
                                <Radio value={2}>Женский</Radio>
                            </Radio.Group>
                        );
                    }
                    if (type === 'file') {
                        return (
                            <Upload
                                maxCount={1}
                                beforeUpload={() => false}
                                fileList={value || []}
                                onChange={({ fileList }) => onChange(fileList)}
                                id={name}
                                className={styles.dashed}
                            >
                                <Button className={classNames(styles.uploadInput, {[styles.small]: small}, [])}>
                                    <img src={upload} alt="img" />
                                    <span>Поместите сюда файл с готовым резюме</span>
                                </Button>
                            </Upload>
                        );
                    }
                    return <Input value={value} onChange={onChange} id={name} type={type} className={classNames(styles.input, {[styles.small]: small}, [])} />;
                }}
            />
            {errors[name] && <span className={styles.error}>{getErrorMessage(errors[name])}</span>}
        </div>
    );
};

export default FormInput;
