import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthConText";
import { useAdmin } from "../../Hooks/useAdmin";
import Header from "../Header/Header";

const DashboardLayout = () => {
  const {user} = useContext(AuthProvider)  
  const [userLevel ] = useAdmin(user?.email)
  // console.log(userLevel);


  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile container mx-auto">
        <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {
                userLevel?.accountMode === 'admin' && <>
                 <li>
              <Link
                className="text-xl mx-2 rounded-lg font-medium  hover:bg-yellow-400 hover:text-white"
                to={"/dashboard/allsellers"}
              >
                All Sellers
              </Link>
            </li>
            <li>
              <Link
                className="text-xl mx-2 rounded-lg font-medium  hover:bg-yellow-400 hover:text-white"
                to={"/dashboard/allbuyers"}
              >
                All Buyers
              </Link>
            </li>
            <li>
              <Link
                className="text-xl mx-2 rounded-lg font-medium  hover:bg-yellow-400 hover:text-white"
                to={"/dashboard/report"}
              >
                Reported Order
              </Link>
            </li>
                </>
            }
            {
                userLevel?.accountMode === 'buyer' && <li>
                <Link
                  className="text-xl mx-2 rounded-lg font-medium  hover:bg-yellow-400 hover:text-white"
                  to={"/dashboard/myorders"}
                >
                  My Orders
                </Link>
              </li>
            }
           
           {
            userLevel?.accountMode === 'seller' && <> <li>
           
            <Link
              className="text-xl mx-2 rounded-lg font-medium  hover:bg-yellow-400 hover:text-white"
              to={"/dashboard/addproduct"}
            >
              Add Product
            </Link>
          </li>
         </>
           }
          
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
