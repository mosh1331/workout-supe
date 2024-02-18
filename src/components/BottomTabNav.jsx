import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Make sure to install 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const BottomTabNavigation = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex justify-around items-center">
          
            <NavLink to="/">
                {({ isActive, isPending, isTransitioning }) => (
                    <div className="flex flex-col items-center text-gray-600">
                        <ArticleIcon style={{color:isActive ? 'tomato':'grey'}} size={24} />
                        <span className="text-xs">Log</span>
                    </div>

                )}
            </NavLink>
            <NavLink to="/add-exercises">
                {({ isActive, isPending, isTransitioning }) => (
                    <div className="flex flex-col items-center text-gray-600">
                        <FitnessCenterIcon style={{color:isActive ? 'tomato':'grey'}} size={24} />
                        <span className="text-xs">Exercises</span>
                    </div>

                )}
            </NavLink>
            <NavLink to="/calender-view">
                {({ isActive, isPending, isTransitioning }) => (
                    <div className="flex flex-col items-center text-gray-600">
                        <DateRangeIcon style={{color:isActive ? 'tomato':'grey'}} size={24} />
                        <span className="text-xs">Calendar</span>
                    </div>

                )}
            </NavLink>
            <NavLink to="/progress">
                {({ isActive, isPending, isTransitioning }) => (
                    <div className="flex flex-col items-center text-gray-600">
                        <QueryStatsIcon style={{color:isActive ? 'tomato':'grey'}} size={24} />
                        <span className="text-xs">Progress</span>
                    </div>

                )}
            </NavLink>
        </nav>
    );
};

export default BottomTabNavigation;
