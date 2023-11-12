import React from 'react'
import SignupForm from '../components/SignupForm'
import Navbar from '../components/Navbar'

const Signup = () => {
  return (
    <>
    <Navbar />
    <div className="bg-[#B7CECE] min-h-screen">
    <SignupForm />
    </div>
    </>
  )
}

export default Signup