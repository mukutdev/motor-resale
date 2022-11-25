import { createBrowserRouter } from "react-router-dom";
import Blog from "../../pages/Blog/Blog";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../pages/Dashboard/AllSellers/AllSellers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../pages/Dashboard/MyOrders/MyOrders";
import ReportedItems from "../../pages/Dashboard/ReportedItems/ReportedItems";
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
            },
            {
                path:'/dashboard/myorders',
                element : <MyOrders/>
            },
            {
                path:'/dashboard/allsellers',
                element : <AllSellers/>
            },
            {
                path:'/dashboard/allbuyers',
                element : <AllBuyers/>
            },
            {
                path:'/dashboard/addproduct',
                element : <AddProduct/>
            },
            {
                path:'/dashboard/report',
                element : <ReportedItems/>
            },
        ]
    },
    
])