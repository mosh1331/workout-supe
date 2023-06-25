import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import AddWorkoutForm from './AddWorkoutForm'
import { Badge, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import WorkoutList from './WorkoutList'
import { useQuery,useQueryClient,useMutation } from 'react-query'
import { deleteExercise, getExercises, getWorkouts } from '../apis/workoutApis'

const ViewScreen = () => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState({standard:dayjs(),display: dayjs().format("DD-MM-YYYY")});

  const {
    isLoading:isFetchingExercises,
    isError,
    error,
    data:exercises
  } = useQuery('exerises',getExercises)

  const {
    isLoading:isFetchingWorkouts,
    isError:isWorkouterror,
    error:workoutsError,
    data:datalist,
  } = useQuery('workouts',getWorkouts)


  const deleteWorkoutMutation = useMutation(deleteExercise,{
      onSuccess:()=>{
        queryClient.invalidateQueries("workouts")
      }
    })
  


const removeExercise =async(workoutFortheDay, exerciseId)=>{
  const newList = workoutFortheDay.exercises.filter(i => i._id != exerciseId)
  const exerciseData = {
      date: selectedDate.standard,
      exercises: newList
    }
    deleteWorkoutMutation.mutate({id:workoutFortheDay._id,exerciseData:exerciseData})
}

if(isFetchingExercises || isFetchingWorkouts){
  return <div>Fetching</div>
}

if(isError){{
  return <div>{error}</div>
  
}}
 

  return (
    <div className="text-3xl font-bold underline" style={{ position: 'relative', minHeight: "100vh",width:"100%",background:"#2b2a2a" }}>
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
            '& .css-qa7bje-MuiButtonBase-root-MuiPickersDay-root.Mui-selected':{
              background:"purple !important"
            },
          background:"#423b3b",width:"95%",margin:"0 auto",fontSize:20,color:'tomato'}}
         variant='static'
         orientation='portrait'
         value={selectedDate.standard}
         onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("DD-MM-YYYY")})
        }}
         renderInput={(params) => {
           <TextField {...params} />
         }}
       slotProps={{day:[1,5,9],actionBar: { actions: [] }}}
        />
      </LocalizationProvider>
      <Fab sx={{ position: "absolute", bottom: 50, right: 20 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
     <WorkoutList deleteExercise={removeExercise}  datalist={datalist} selectedDate={selectedDate} />
      <AddWorkoutForm  datalist={datalist} selectedDate={selectedDate} showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen