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
    isError: isWorkoutsByDateError,
    error: workoutsByDateError,
    data: datalist,
  } = useQuery(['workouts', selectedDate.display], () => getWorkoutsByDate(selectedDate.display), {
    enabled: selectedDate.display !== '',
  });


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
    setDays(generateConsecutiveDays());
  }, []);

  if (isFetchingExercises) {
    return <Loader />
  }

  if (isError) {
    return <div>{error}</div>
  }

  console.log(workoutDays, 'workoutDays')
  return (
    <div className="text-3xl font-bold min-h-[100vh] w-full relative pt-[40px]" >
      <div className="flex flex-row w-full justify-between">
        {days.map((date, index) => {
          return(
            <div key={index} className={`w-[15%] m-2 text-center bg-[white] border-2 rounded relative `}>
              {workoutDays.find(d => dayjs(d.date).format('MM DD YYYY') === date.format('MM DD YYYY')) ? <div className='w-2 h-2 bg-[green] absolute top-2 right-2 rounded-lg'/> : null}
              <div onClick={(e) => {
                setSelectedDate({ standard: dayjs(date), display: dayjs(date).format("YYYY-MM-DD") })
              }} className={`text-black p-4 rounded-md mb-2`}>
                {date.format('MMM D')}
              </div>
            </div>
          )
        })}
      </div>
      <Fab sx={{ position: "absolute", bottom: 50, right: 20 }} onClick={() => setShowForm(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <WorkoutList isFetchingWorkouts={isFetchingWorkouts} deleteExercise={removeExercise} datalist={datalist} selectedDate={selectedDate} />
      <AddWorkoutForm datalist={datalist} selectedDate={selectedDate} showForm={showForm} exercises={exercises} setShowForm={setShowForm} />
    </div>
  )
}

export default ViewScreen