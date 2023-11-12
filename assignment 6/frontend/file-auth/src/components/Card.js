import React from 'react'

const Card = () => {
  return (
    <div className="max-w-10 mx-auto bg-white rounded-md overflow-hidden shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">File name</h2>
        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor, nulla eu dictum efficitur, nisl ante volutpat magna, id cursus ipsum arcu vel ex.</p>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Read More</button>
      </div>
    </div>
  )
}

export default Card