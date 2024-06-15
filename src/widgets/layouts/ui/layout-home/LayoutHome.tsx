import { Button } from 'antd';
import styles from './LayoutHome.module.scss'
import { classNames } from '@/shared/lib/classNames';
import { Logo } from '@/shared/ui';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useSetupUser from '../../lib/useSetupUser';

const LayoutHome = () => {
    const [roleId, setRoleId] = useState<roleIdType>(1)
    const navigate = useNavigate()
    useSetupUser()

    return (
        <>
            <header className={styles.header}>
                <Logo />
                <div className={styles.switchers}>
                    <div
                        className={classNames(styles.switcher, {[styles.fillCont]: roleId === 1}, [])}
                        onClick={() => setRoleId(1)}
                    >
                        Соискателям
                    </div>
                    <div
                        className={classNames(styles.switcher, {[styles.fillCont]: roleId === 2}, [])}
                        onClick={() => setRoleId(2)}
                    >
                        Рекрутерам
                    </div>
                </div>
                <Button className={styles.btn} type='primary' onClick={() => navigate('/login')}>Войти</Button>
            </header>
            <Outlet context={roleId}/>
        </>
    )
}

export default LayoutHome;