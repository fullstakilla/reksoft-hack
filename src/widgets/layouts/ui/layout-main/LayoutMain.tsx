import { Logo } from "@/shared/ui";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import profileIcon from '@/shared/assets/profile-icon.svg';
import styles from './LayoutMain.module.scss';
import { useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import { AddResumeBtn, AddResumeModal, UploadResumeModal } from "@/features/resume/add-resume";
import { useAppDispatch, useAppSelector } from "@/shared/model/redux-hooks";
import useSetupUser from "../../lib/useSetupUser";
import { Dropdown, MenuProps, Space } from "antd";
import { logout } from "@/entities/session";
import { AddVacancyBtn, AddVacancyModal } from "@/features/vacancy/add-vacancy";

const LayoutMain = () => {
    useSetupUser();
    const [modalResumeOpen, setModalResumeOpen] = useState<boolean>(false);
    const [uploadResumeOpen, setUploadResumeOpen] = useState<boolean>(false);
    const [modalVacancyOpen, setModalVacancyOpen] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const { isAuthorized, roleId, name, surname } = useAppSelector(state => state.session);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const authorizedItems: MenuProps['items'] = [
        {
            label: <b>{name} {surname}</b>,
            key: '0',
        },
        {
            label: <span>{roleId === 1 ? 'Соискатель' : 'Рекрутер'}</span>,
            key: '1',
        },
        {
            type: 'divider' as const,
        },
        ...(roleId === 1 ? [
            {
                label: <Link to='/my-resume'>Мое резюме</Link>,
                key: '2',
            },
            {
                label: <Link to='/my-responses'>Мои отклики</Link>,
                key: '3',
            },
        ] : []),
        {
            label: <span onClick={handleLogout} style={{ color: 'red' }}>Выйти из аккаунта</span>,
            key: '4',
        },
    ];

    const unauthorizedItems: MenuProps['items'] = [
        {
            label: <Link to='/login'>Войти в аккаунт</Link>,
            key: '0',
        },
    ];

    const items = isAuthorized ? authorizedItems : unauthorizedItems;

    return (
        <>
            <header className={styles.header}>
                <Logo />
                <div className={styles.rightContent}>
                    {roleId === 1 && (
                        <>
                            <AddResumeBtn setModalResumeOpen={setModalResumeOpen} />
                            <AddResumeModal
                                modalResumeOpen={modalResumeOpen}
                                setModalResumeOpen={setModalResumeOpen}
                                setUploadResumeOpen={setUploadResumeOpen}
                                refreshData={refreshData}
                                setRefreshData={setRefreshData}
                            />
                            <UploadResumeModal
                                uploadResumeOpen={uploadResumeOpen}
                                setUploadResumeOpen={setUploadResumeOpen}
                                setModalResumeOpen={setModalResumeOpen}
                                refreshData={refreshData}
                                setRefreshData={setRefreshData}
                            />
                        </>
                    )}
                    {roleId === 2 && (
                        <>
                            <AddVacancyBtn setModalVacancyOpen={setModalVacancyOpen} />
                            <AddVacancyModal
                                modalVacancyOpen={modalVacancyOpen}
                                setModalVacancyOpen={setModalVacancyOpen}
                            />
                        </>
                    )}
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <img src={profileIcon} alt="acc" />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </header>
            <div className={styles.pages}>
                <Link
                    to='/news'
                    className={classNames(styles.title, { [styles.picked]: pathname === '/news' }, [])}
                >
                    Новости
                </Link>
                <Link
                    to='/vacancies'
                    className={classNames(styles.title, { [styles.picked]: pathname === '/vacancies' }, [])}
                >
                    Вакансии
                </Link>
            </div>
            <Outlet context={{refreshData, setRefreshData}}/>
        </>
    );
}

export default LayoutMain;
