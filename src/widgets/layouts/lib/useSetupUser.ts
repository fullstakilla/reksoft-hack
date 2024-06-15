import { useEffect } from "react";
import { useAppDispatch } from "@/shared/model/redux-hooks";
import { AuthService, setupUser } from "@/entities/session";

const useSetupUser = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkInfo = async () => {
            try {
                const token = localStorage.getItem('access_token') || null;
                if (token === null) return;

                const response = await AuthService.info()
                const {Id, RoleId, Name, Surname, Patronymic, Phone, Email} = response.data

                dispatch(setupUser({ userId: Id, roleId: RoleId, name: Name, surname: Surname, patronymic: Patronymic, phone: Phone, email: Email}));
            } catch (e) {
                console.log(e)
            }
        }

        checkInfo()
    }, [dispatch]);
}

export default useSetupUser;