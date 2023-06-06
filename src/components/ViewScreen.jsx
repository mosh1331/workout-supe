import React, { useEffect, useState } from 'react'
import { fetchList } from '../services/api'
import dayjs from 'dayjs'
import AddWorkoutForm from './AddWorkoutForm'
import { Fab } from '@mui/material'
import { AddIcCallOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const url = "https://workout-app-server.vercel.app"
const ViewScreen = () => {
  const [datalist, setDatalist] = useState([])
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    getData()
    getExercises()
    return () => { }
  }, [])

  const getData = async () => {
    const data = await fetchList(`${url}/workouts`)
    setDatalist(data)
  }

  const getExercises = async () => {
    const data = await fetchList(`${url}/exercises`)
    setExercises(data)
  }

  const [showForm, setShowForm] = useState(true)

  return (
    <div className="text-3xl font-bold underline" style={{ position: 'relative', height: "100vh",width:"100%",background:"#2b2a2a" }}>
      {datalist?.length > 0 ? datalist.map(item => <div style={{ color: '#fff' }}>{item.id} - {dayjs(item.date).format("DD/MM/YYYY")}</div>) : null}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker sx={{background:"#423b3b",width:"95%",margin:"0 auto"}} defaultValue={dayjs(new Date())} />
      </LocalizationProvider>
      <Fab sx={{ position: "absolute", bottom: 50, right: 20 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <AddWorkoutForm showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen