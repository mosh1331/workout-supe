import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import AddWorkoutForm from './AddWorkoutForm'
import { Badge, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import WorkoutList from './WorkoutList'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { deleteExercise, getExercises, getWorkoutDays, getWorkouts, getWorkoutsByDate } from '../apis/workoutApis'
import Loader from './Loader';
import { generateConsecutiveDays } from '../utils/dateUtils';
import DateRow from './DateRow';
import CurrentStreak from './CurrentStreak';

const ViewScreen = () => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ standard: dayjs(), display: dayjs().format("YYYY-MM-DD") });
  const [days, setDays] = useState([]);

  const {
    isLoading: isFetchingExercises,
    isError,
    error,
    data: exercises
  } = useQuery('exerises', getExercises)

  const {
    isLoading: isFetchingWorkoutDays,
    data: workoutDays
  } = useQuery('workoutDays', getWorkoutDays)


  const {
    isLoading: isFetchingWorkouts,
    data: datalist,
  } = useQuery(['workouts', selectedDate.display], () => getWorkoutsByDate(selectedDate.display), {
    enabled: selectedDate.display !== '',
  });


  const deleteWorkoutMutation = useMutation(deleteExercise, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts")
      queryClient.invalidateQueries("workoutDays")
      queryClient.invalidateQueries("current_streak")
      
    }
  })


  const removeExercise = async (workoutFortheDay, exerciseId) => {
    const newList = workoutFortheDay.exercises.filter(i => i._id != exerciseId)
    const exerciseData = {
      date:selectedDate.display,
      exercises: newList
    }
    deleteWorkoutMutation.mutate({ id: workoutFortheDay._id, exerciseData: exerciseData })
  }

  useEffect(() => {
    setDays(generateConsecutiveDays());
  }, []);

  if (isFetchingExercises) {
    return <Loader />
  }

  if (isError) {
    return <div>{error}</div>
  }

  return (
    <div className="text-3xl font-bold min-h-[100vh] w-full relative pt-[40px]" >
      <CurrentStreak />
      <DateRow days={days} workoutDays={workoutDays} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Fab sx={{ position: "absolute", bottom: 100, right: 20, zIndex:1 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <WorkoutList isFetchingWorkouts={isFetchingWorkouts} deleteExercise={removeExercise} datalist={datalist} selectedDate={selectedDate} />
      <AddWorkoutForm datalist={datalist} selectedDate={selectedDate} showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen