import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../context/AuthConText";
import { useToken } from "../../Hooks/useToken";

const Register = () => {

    const {handleCreateUser , handleUpdateProfile} = useContext(AuthProvider)
    const {register , handleSubmit , formState: { errors }} = useForm()
    const navigate = useNavigate()
    const [createdEmail , setCreatedEmail] = useState('')
    const [token] = useToken(createdEmail)
    const [errorMessage , setErrorMessage] = useState('')


    if(token){
      navigate('/')
    }

    const handleUserSubmit = data =>{
        console.log(data);

        //email password based account creation

        handleCreateUser(data.email , data.password)
        .then(result =>{
          const user = result.user
          const userInfo = {
            displayName : data.name
          }
          toast.success('Your account has been created')
          // updateProfile 
           handleUpdateProfile(userInfo)
           .then(()=>{
            saveUserToDb(data.name , data.email , data.accountMode)
           })
           .catch(err => console.log(err))

          console.log(user);
        })
        .catch(err => {
          setErrorMessage(err.message)
        })
    }

    const saveUserToDb = (name , email , accountMode )=>{
      const user = {name , email , accountMode , verified : false}
      fetch(`https://resale-server-mukutdev.vercel.app/users/${email}`, {
        method : 'PUT',
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data);
        setCreatedEmail(email)
      })
      .catch(err => console.log(err))
    }


    //jwt token creation



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
        <div className="bg-base-100 md:w-[400px] mt-10 p-6 md:mx-0 mx-4">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <img
            src="https://i.ibb.co/BNfMBPX/ts-Ulw-sw-RF-Giqr-Ms-U5-RCQ.png"
            className="mt-3"
            alt=""
          />
          <p className="text-center text-xl font-medium mt-2">
            Enter your Details Here
          </p>
          <form onSubmit={handleSubmit(handleUserSubmit)}>
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("name" , { required: true })}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-5 text-slate-900 placeholder-gray-500"
            />
            {errors.name && <span className="text-red-500">Please enter your name</span>}
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email" , { required: true })}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
               {errors.email && <span className="text-red-500">Please enter a valid email address</span>}
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password" , { required: true })}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            {errors.password && <span className="text-red-500">Please enter a strong password</span>}
            <div className="mt-3">
                <p className="text-lg font-medium">Which type of Account You want to create?</p>
              <label className="label cursor-pointer">
                <span className="text-lg font-medium">Seller</span>
                <input
                  type="radio"
                  name="radio-10"
                  {...register("accountMode")}
                  value="seller"
                  className="radio checked:bg-yellow-500 "
                  
                />
              </label>
              <label className="label cursor-pointer">
                <span className="text-lg font-medium">Buyer</span>
                <input
                  type="radio"
                  name="radio-10"
                  {...register("accountMode")}
                  value="buyer"
                  className="radio checked:bg-yellow-500"
                  checked
                />
              </label>
            </div>
             
             <input type="submit" value="Create Your Account"  className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer py-3 mt-4 font-semibold text-xl"/>
          </form>
           <p className="text-red-500 font-medium text-lg my-3">{errorMessage}</p>
          <div className="mt-4">
             <p className="font-medium">Already have an account ? <Link to={'/login'} className="underline text-lg font-semibold"> Login Now !</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
