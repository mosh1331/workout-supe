import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ArticleIcon from '@mui/icons-material/Article';

import DateRangeIcon from '@mui/icons-material/DateRange';
const BottomTabNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex justify-around items-center">
      <Link to="/" className="flex flex-col items-center text-gray-600">
        <HomeIcon size={24} />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/add-exercises" className="flex flex-col items-center text-gray-600">
        <FitnessCenterIcon size={24} />
        <span className="text-xs">Exercises</span>
      </Link>
      <Link to="/calender-view" className="flex flex-col items-center text-gray-600">
        <DateRangeIcon size={24} />
        <span className="text-xs">Calendar</span>
      </Link>
      <Link to="/progress" className="flex flex-col items-center text-gray-600">
        <ArticleIcon size={24} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
};

export default BottomTabNavigation;
