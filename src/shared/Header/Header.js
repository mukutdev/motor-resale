import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const menuItems = <>
        <li><Link className='text-xl mx-2 rounded-lg font-medium  hover:bg-primary hover:text-white' to={'/'}>Home</Link></li>
        <li><Link className='text-xl  mx-2 rounded-lg font-medium  hover:bg-primary hover:text-white' to={'/blogs'}>Blogs</Link></li>
        <li><Link className='text-xl mx-2 rounded-lg font-medium  hover:bg-primary hover:text-white' to={'/login'}>Login</Link></li>
    </>
    return (
        <div className="navbar  container mx-auto bg-base-100 justify-between">
   <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 mx-4 p-2 shadow bg-base-100 rounded-box w-52">
        {menuItems}
      </ul>
    </div>
    <Link to={'/'} className="text-2xl font-bold ">Reseller</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
     {menuItems}
    </ul>
  </div>
  
</div>
    );
};

export default Header;