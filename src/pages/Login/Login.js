import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthProvider } from '../../context/AuthConText';
import toast from 'react-hot-toast';
import { useToken } from '../../Hooks/useToken';

const Login = () => {
    const {register , handleSubmit , formState: { errors }} = useForm()
    const {handleSignInWithEmailAndPassword , handleGoogleLogin} = useContext(AuthProvider)
    const location = useLocation()
    const navigate = useNavigate()
    const [createdEmail , setCreatedEmail] = useState('')
    const [token] = useToken(createdEmail)
    const [errorMessage , setErrorMessage] = useState('')

    const from = location.state?.from?.pathname || '/'

    if(token){
      navigate(from , {replace : true})
    }

    const handleUserSubmit = data =>{
        console.log(data);

        // email and password based login
        handleSignInWithEmailAndPassword(data.email, data.password)
        .then(result =>{
          const user = result.user
          toast.success('User logged in successfully')
          setCreatedEmail(data.email)
          console.log(user);
        })
        .catch(err => {
          setErrorMessage(err.message)
        })
    }

    //google login function

    const handleLoginUsingGoogle = ()=>{
        handleGoogleLogin()
        .then(result =>{
          toast.success('User logged in successfully')
          const user = result.user
          saveUserToDb(user.displayName, user.email )
          console.log(user);
        })
        .catch(err => console.log(err))
    }

    const saveUserToDb = (name , email)=>{
      const user = {name , email , accountMode : 'buyer' , verified : false}
      fetch(`${process.env.REACT_APP_url}/users/${email}`, {
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
    

    return (
        <section className="bg-slate-600 h-screen">
      <div className="absolute h-full flex flex-col justify-center items-center left-0 right-0 top-0 bottom-0">
        <div>
         <Link to={'/'}> <img
            src="https://i.ibb.co/Vpp9J31/logo-auto-parts.png"
            className="h-9"
            alt=""
          /></Link>
        </div>
        <div className="bg-base-100 md:w-[400px] mt-10 p-6 md:mx-0 mx-4">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <img
            src="https://i.ibb.co/BNfMBPX/ts-Ulw-sw-RF-Giqr-Ms-U5-RCQ.png"
            className="mt-3"
            alt=""
          />
          <p className="text-center text-xl font-medium mt-2">
            Enter your login details here
          </p>
          <form onSubmit={handleSubmit(handleUserSubmit)}>
           
            <input
              type="text"
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
            {errors.password && <span className="text-red-500">Please enter correct password</span>}     
             <input type="submit" value="Login"  className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer py-3 mt-4 font-semibold text-xl"/>
          </form>
          <p className="text-red-500 font-medium text-lg my-3">{errorMessage}</p>
          <div className="mt-4">
             <p className="font-medium text-center">New User ? <Link to={'/register'} className="underline text-lg font-semibold"> Create a account!</Link></p>
             <div className="divider">OR</div>
             
             <button onClick={handleLoginUsingGoogle} className='flex items-center justify-center bg-slate-600 hover:bg-slate-500 w-full py-3 text-white text-xl'><FcGoogle className='text-xl mr-2'></FcGoogle> Login using Google</button>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Login;