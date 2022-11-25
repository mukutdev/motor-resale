import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="bg-slate-600 h-screen">
      <div className="absolute h-full flex flex-col justify-center items-center left-0 right-0 top-0 bottom-0">
        <div>
          <img
            src="https://i.ibb.co/Vpp9J31/logo-auto-parts.png"
            className="h-9"
            alt=""
          />
        </div>
        <div className="bg-base-100 w-[400px] mt-10 p-6">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <img
            src="https://i.ibb.co/BNfMBPX/ts-Ulw-sw-RF-Giqr-Ms-U5-RCQ.png"
            className="mt-3"
            alt=""
          />
          <p className="text-center text-xl font-medium mt-2">
            Enter your Details Here
          </p>
          <form>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-5 text-slate-900 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Enter Your Email"
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            <div className="mt-3">
                <p className="text-lg font-medium">Which type of Account You want to create?</p>
              <label className="label cursor-pointer">
                <span className="text-lg font-medium">Seller</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-yellow-500 "
                  
                />
              </label>
              <label className="label cursor-pointer">
                <span className="text-lg font-medium">Buyer</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-yellow-500"
                  checked
                />
              </label>
            </div>
             
             <input type="submit" value="Create Your Account"  className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer py-3 mt-4 font-semibold text-xl"/>
          </form>
          <div className="mt-4">
             <p className="font-medium">Already have an account ? <Link to={'/login'} className="underline text-lg font-semibold"> Login Now !</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
