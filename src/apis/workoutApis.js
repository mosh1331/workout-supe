import axios from 'axios'

const workoutApi = axios.create({
  baseURL: 'https://workout-app-server.vercel.app'
})

export const getExercises = async () => {
  const response = await workoutApi.get('/exercises')
  return response?.data
}

export const getWorkouts = async () => {
  const response = await workoutApi.get('/workouts')
  return response?.data
}

export const deleteExercise = async ({id,exerciseData}) => {
  return await workoutApi.put(
    `/workouts/${id}`,
    exerciseData
  )
}

export const addWorkout = async (exerciseData)=>{
    return  await workoutApi.post(`/workouts`, exerciseData)
}


export const editWorkout = async ({id,exerciseData}) => {
    return await workoutApi.put(
      `/workouts/${id}`,
      exerciseData
    )
  }