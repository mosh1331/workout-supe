// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link if you are using React Router
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate()

  const navigateTo =(path)=>{
    setMobileMenuOpen(false)
    navigate(path, { replace: true })
  }

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">Your Fitness App</h1>
      <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
        <MenuIcon size={24} />
      </div>
      <nav className={`z-10 lg:flex space-x-4 h-[100vh] absolute top-0 left-0 w-[100%] bg-gray-800 ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
        <div className="text-white cursor-pointer" onClick={toggleMobileMenu}>
          <Close size={24} />
        </div>
       <div className="grid place-content-center h-full text-[30px] text-center">
       <div onClick={() => navigateTo("/")} className="block py-2 px-4 hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:scale-105">
          Daily Log
        </div>
        <div onClick={() => navigateTo("/add-exercises")} className="block py-2 px-4 hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:scale-105">
          Add Exercises
        </div>
        <div onClick={() => navigateTo("/progress")} className="block py-2 px-4 hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:scale-105">
          Progress
        </div>
        <div onClick={() => navigateTo("/calender-view")} className="block py-2 px-4 hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:scale-105">
          Calendar View
        </div>
       </div>
      </nav>
    </div>
  </header>
  );
};

export default Header;
