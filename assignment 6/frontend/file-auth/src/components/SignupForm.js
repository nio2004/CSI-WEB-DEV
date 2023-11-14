import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import SucessModal from './RegSuccessModal';
import { useAuth } from './AuthContext';

const SignupForm = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successModal, setSucessModal] = useState(false);
    const { isLoggedIn, setIsLoggedIn, login } = useAuth();

    const signup = async (username, password) => {
      try{
        const response = await axios.post('http://localhost:4000/register', {
          username, 
          password
        });
        setIsLoggedIn(false);

        if(response){
          setSucessModal(true);
          setIsLoggedIn(true);
        }

      }catch (error){
        console.error("signup failed", error);
        throw error;
      }
    }
  
    const handleSignup = async (e) => {
      e.preventDefault();

      try{
        const token = await signup(username, password);
      }catch(error){
        console.error("signup failed", error);
      }

      };
  return (
    <>
    <section className="bg-[#B7CECE]">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-[#14110F] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={handleSignup} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vyratkohli" required="" />
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-red hover:text-blue hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:text-blue-600 dark:hover:bg-white dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 text-bold hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  {successModal && (
        <SucessModal
          message="New user created!"
          onClose={() => setSucessModal(false)}
        />
      )}
  </section>
    </>
  )
}

export default SignupForm