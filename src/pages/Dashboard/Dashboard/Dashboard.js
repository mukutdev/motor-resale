import React, { useContext } from 'react';
import { AuthProvider } from '../../../context/AuthConText';
import { useAdmin } from '../../../Hooks/useAdmin';
import AddProduct from '../AddProduct/AddProduct';
import AllSellers from '../AllSellers/AllSellers';
import MyOrders from '../MyOrders/MyOrders';

const Dashboard = () => {
    const {user} = useContext(AuthProvider)
    const [userLevel] = useAdmin(user?.email)
    console.log(userLevel.accountMode);
    return (
        <div>
            {
                userLevel.accountMode === 'admin' && <AllSellers/>
            }
            {
                userLevel.accountMode === 'buyer' && <MyOrders/>
            }
            {
                userLevel.accountMode === 'seller' && <AddProduct/>
            }
            
        </div>
    );
};

export default Dashboard;