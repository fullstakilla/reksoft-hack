import { Navigate, createBrowserRouter } from "react-router-dom"
import { LoginPage } from "@/pages/login";
import { HomePage } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { RegisterPage } from "@/pages/register";
import { LayoutHome, LayoutMain } from "@/widgets/layouts";
import { useAppSelector } from "@/shared/model/redux-hooks";
import { ReactElement } from "react";
import { NewsPage } from "@/pages/news";
import { VacanciesPage } from "@/pages/vacancies";
import { MyResumePage } from "@/pages/my-resumes";
import { MyResponsesPage } from "@/pages/my-responses";
import { OwnerResponsePage } from "@/pages/owner-response";

type GuardProps = {
    children: ReactElement
}

function GuestGuard({ children }: GuardProps) {
    const {isAuthorized} = useAppSelector(state => state.session)
  
    if (!isAuthorized) return <Navigate to="/login" />
  
    return children
}
  
function AuthGuard({ children }: GuardProps) {
    const {isAuthorized} = useAppSelector(state => state.session)
  
    if (isAuthorized) return <Navigate to="/news" />
  
    return children
}

export const setupRouter = () => 
    createBrowserRouter([
        {
            element: <NotFound />,
            path: '*',
        },
        {
            element: <LayoutHome />,
            path: '/',
            children: [
                {
                    path: "",
                    element: <HomePage />
                },
                {
                    path: "/register",
                    element: (
                        <AuthGuard>
                            <RegisterPage />
                        </AuthGuard>
                    )
                },
                {
                    path: "/login",
                    element: (
                        <AuthGuard>
                            <LoginPage />
                        </AuthGuard>
                    )
                },
            ]
        },
        {
            element: <LayoutMain />,
            path: '/',
            children: [
                {
                    path: "/news",
                    element: <NewsPage />
                },
                {
                    path: "/vacancies",
                    element: <VacanciesPage />
                },
                {
                    path: "/my-resume",
                    element: <GuestGuard><MyResumePage /></GuestGuard>
                },
                {
                    path: "/my-responses",
                    element: <GuestGuard><MyResponsesPage /></GuestGuard>
                },
                {
                    path: "/owner-responses",
                    element: <GuestGuard><OwnerResponsePage /></GuestGuard>
                },
            ]
        },
    ]);