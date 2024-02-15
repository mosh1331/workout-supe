import React from 'react'

const SmallLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50 pt-[20%]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
  )
}

export default SmallLoader