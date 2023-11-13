import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Dashcontent from '../components/Dashboard-content'

const Dashboard = () => {
  return (
    <>
        <div className="flex">
            <Sidebar />
            <div className="max-w-md mx-auto p-5 bg-white rounded-md overflow-hidden align-items-left">
                <Dashcontent />
            </div>
        </div>
    </>
  )
}

export default Dashboard