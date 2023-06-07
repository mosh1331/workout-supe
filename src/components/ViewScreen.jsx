import React, { useEffect, useState } from 'react'
import { fetchList } from '../services/api'
import dayjs from 'dayjs'
import AddWorkoutForm from './AddWorkoutForm'
import { Badge, Fab } from '@mui/material'
import { AddIcCallOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CheckIcon from '@mui/icons-material/Check';
import WorkoutList from './WorkoutList'

const url = "https://workout-app-server.vercel.app"
const ViewScreen = () => {
  const [datalist, setDatalist] = useState([])
  const [exercises, setExercises] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);

  useEffect(() => {
    getExercises()
    
    return () => { }
  }, [])

  useEffect(()=>{
    if(!showForm){
      getData()
    }
  },[showForm])

  const getData = async () => {
    const data = await fetchList(`${url}/workouts`)
    setDatalist(data)
  }

  const getExercises = async () => {
    const data = await fetchList(`${url}/exercises`)
    setExercises(data)
  }


 

  return (
    <div className="text-3xl font-bold underline" style={{ position: 'relative', height: "100vh",width:"100%",background:"#2b2a2a" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker   sx={{
          	'& .css-qa7bje-MuiButtonBase-root-MuiPickersDay-root': {
              fontSize: '20px !important',
              color:"white",
              width:"40px",
              borderRadius:2,
              height:"40px"
            },
            '& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root.Mui-selected':{
              fontSize: '20px !important',
              color:"purple",
              width:"40px",
              borderRadius:2,
              height:"40px"

            },
            '& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)':{
              fontSize: '20px !important',
              color:"#ccc",
              width:"40px",
              borderRadius:2,
              height:"40px",
              fontWeight:800
            },
            '& .css-qa7bje-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover':{
              background:"tomato !important"
            },
            '& .css-1hbyad5-MuiTypography-root':{
              display:"none"
            },
            '& .css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel':{
              fontSize:'20px',
              width:"40px",
              height:"40px",
              fontWeight:600
            },
          background:"#423b3b",width:"95%",margin:"0 auto",fontSize:20,color:'tomato'}}
         variant='static'
         orientation='portrait'
         onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("DD-MM-YYYY")})
        }}
         renderInput={(params) => {
           <TextField {...params} />;
         }}
       slotProps={{day:[1,5,9],actionBar: { actions: [] }}}
        />
      </LocalizationProvider>
      <Fab sx={{ position: "absolute", bottom: 50, right: 20 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
     <WorkoutList datalist={datalist} selectedDate={selectedDate} />
      <AddWorkoutForm selectedDate={selectedDate} url={url} showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen