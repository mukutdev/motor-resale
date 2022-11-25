import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthProvider } from '../../context/AuthConText';
import toast from 'react-hot-toast';

const Login = () => {
    const {register , handleSubmit , formState: { errors }} = useForm()
    const {handleSignInWithEmailAndPassword , handleGoogleLogin} = useContext(AuthProvider)
    const navigate = useNavigate()

    const handleUserSubmit = data =>{
        console.log(data);
        
        // email and password based login
        handleSignInWithEmailAndPassword(data.email, data.password)
        .then(result =>{
          const user = result.user
          toast.success('User logged in successfully')
          console.log(user);
          navigate('/')
        })
        .catch(err => console.log(err))
    }

    //google login function

    const handleLoginUsingGoogle = ()=>{
        handleGoogleLogin()
        .then(result =>{
          toast.success('User logged in successfully')
          const user = result.user
          console.log(user);
          navigate('/')
        })
        .catch(err => console.log(err))
    }
    

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