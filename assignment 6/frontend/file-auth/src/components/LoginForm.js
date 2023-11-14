import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import FailModal from './LoginFailModal';

const LoginForm = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showFailModal, setShowFailModal] = useState(false);

    const handleLogin = async (event) => {
      event.preventDefault();
    
      try {
        const token = await login(username, password);
        if (token) {
          console.log("Login successful");
          navigate('/dashboard');
          setIsLoggedIn(true);
        } else {
          console.log("Login failed: No token received");
          setShowFailModal(true);
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    };

  
  return (
    <>
    <section class="bg-[#B7CECE]">
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-[#14110F] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form onSubmit={handleLogin} class="space-y-4 md:space-y-6">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vyratkohli" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" class="w-full text-white bg-red hover:text-blue hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:text-blue-600 dark:hover:bg-white dark:focus:ring-primary-800">Login</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account? <a href="/register" class="font-medium text-primary-600 text-bold hover:underline dark:text-primary-500">Signup here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
      {showFailModal && (
        <FailModal
          message="Login failed. Please check your credentials and try again."
          onClose={() => setShowFailModal(false)}
        />
      )}
  </section>
    </>
  )
}

export default LoginForm