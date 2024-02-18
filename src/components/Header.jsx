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
      <h1 className="text-2xl font-bold">Log Workout</h1>
    </div>
  </header>
  );
};

export default Header;
