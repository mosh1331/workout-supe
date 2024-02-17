import { useState } from 'react'
import './App.css'
import ViewScreen from './components/ViewScreen'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AddExercise from './components/AddExercise'
import CalenderView from './components/CalenderView'
import ProgressView from './components/ProgressView'
import BottomTabNavigation from './components/BottomTabNav'

function App() {

  return (
    <div>
      <Header />
      <div className="md:w-[60%] w-[90%] mx-auto">
        <Routes>
          <Route path="/" element={<ViewScreen />} />
          <Route path="/add-exercises" element={<AddExercise />} />
          <Route path="/calender-view" element={<CalenderView />} />
          <Route path="/progress" element={<ProgressView />} />
        </Routes>
      </div>
      <BottomTabNavigation />
    </div>
  )
}

export default App
