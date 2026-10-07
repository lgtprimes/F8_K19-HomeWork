import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {
    LoginPage, RegisterPage, CardDetailsPage, PostingJobPage, CompaniesPage, EmployeeRegisterPage
} from '../pages/index.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/employer/register",
        element: <EmployeeRegisterPage />
    },
    {
        path: "cards/:slug",
        element: <CardDetailsPage />
    },
    {
        path: "employer/post-job",
        element: <PostingJobPage />
    },
    {
        path: "admin/companies",
        element: <CompaniesPage />
    }
    
]);


export default router;