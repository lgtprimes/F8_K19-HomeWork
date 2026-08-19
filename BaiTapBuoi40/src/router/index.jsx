import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {
    LoginPage, CardDetailsPage, PostingJobPage, CompaniesPage
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
        path: "cards/:id",
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