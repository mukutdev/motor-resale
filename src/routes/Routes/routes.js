import { createBrowserRouter } from "react-router-dom";
import Blog from "../../pages/Blog/Blog";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import DashboardLayout from "../../shared/DashboardLayout/DashboardLayout";
import ErrorPage from "../../shared/ErrorPage/ErrorPage";
import Main from "../../shared/Main/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/blogs',
                element:<Blog/>  
            },
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
        children:[
            {
                path:'/dashboard',
                element : <Dashboard/>
            }
        ]
    },
    
])