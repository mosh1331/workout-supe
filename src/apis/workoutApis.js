import axios from 'axios'

const baseURL = 'http://localhost:3000'
// const baseURL = 'https://workout-app-server.vercel.app'
const workoutApi = axios.create({
  baseURL: baseURL
})

export const getExercises = async () => {
  const response = await workoutApi.get('/exercises')
  return response?.data
}

export const getWorkouts = async () => {
  const response = await workoutApi.get('/workouts')
  return response?.data
}

export const getWorkoutDays = async () => {
  const response = await workoutApi.get('/workoutDays')
  return response?.data
}

export const getWorkoutsByDate = async (date) => {
  const response = await workoutApi.get(`/workouts/date/${date}`)
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