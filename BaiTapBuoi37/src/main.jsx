import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router"
import './index.css'
import App from './App.jsx'
import { Products, ProductDetails } from './pages/index.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/products",
        element: <Products />
    },
    {
        path: "/products/:id",
        element: <ProductDetails />
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
