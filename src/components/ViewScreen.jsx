import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import AddWorkoutForm from './AddWorkoutForm'
import { Badge, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import WorkoutList from './WorkoutList'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { deleteExercise, getExercises, getWorkouts } from '../apis/workoutApis'
import Loader from './Loader';

const ViewScreen = () => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ standard: dayjs(), display: dayjs().format("DD-MM-YYYY") });
  const [days, setDays] = useState([]);

  const {
    isLoading: isFetchingExercises,
    isError,
    error,
    data: exercises
  } = useQuery('exerises', getExercises)

  const {
    isLoading: isFetchingWorkouts,
    isError: isWorkouterror,
    error: workoutsError,
    data: datalist,
  } = useQuery('workouts', getWorkouts)


  const deleteWorkoutMutation = useMutation(deleteExercise, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts")
    }
  })



  const removeExercise = async (workoutFortheDay, exerciseId) => {
    const newList = workoutFortheDay.exercises.filter(i => i._id != exerciseId)
    const exerciseData = {
      date: selectedDate.standard,
      exercises: newList
    }
    deleteWorkoutMutation.mutate({ id: workoutFortheDay._id, exerciseData: exerciseData })
  }

  useEffect(() => {
    // Function to generate an array of 5 consecutive days including today
    const generateConsecutiveDays = () => {
      const days = [];
      for (let i = 4; i >= 0; i--) {
        days.push(dayjs().subtract(i, 'day'));
      }
      return days;
    };

    setDays(generateConsecutiveDays());
  }, []);

  if (isFetchingExercises || isFetchingWorkouts) {
    return <Loader />
  }

  if (isError) {
    {
      return <div>{error}</div>

    }
  }

  return (
    <div className="text-3xl font-bold min-h-[100vh] w-full relative pt-[40px]" >
      <div className="flex flex-row w-full justify-between">
        {days.map((date, index) => (
          <div key={index} className="w-[15%] m-2 text-center bg-[white] border-2 rounded  ">
            <div  onClick={(e)=>{setSelectedDate({standard:dayjs(date),display: dayjs(date).format("DD-MM-YYYY")})
        }} className={`text-black p-4 rounded-md mb-2`}>
              {date.format('MMM D')}
            </div>
          </div>
        ))}
      </div>
      <Fab sx={{ position: "absolute", bottom: 50, right: 20 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <WorkoutList deleteExercise={removeExercise} datalist={datalist} selectedDate={selectedDate} />
      <AddWorkoutForm datalist={datalist} selectedDate={selectedDate} showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen