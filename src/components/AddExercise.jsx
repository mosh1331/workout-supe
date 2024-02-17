
import React, { useEffect, useState } from 'react';
import { isNOTNullOrUndefined } from '../utils/helpers';
import { addExercise, addWorkout, editWorkout } from '../apis/workoutApis';
import { useMutation, useQueryClient } from 'react-query';
import { Add, Delete } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Drawer, TextField, Toolbar } from '@mui/material';


const defaultState = {
  name: '',
  type: null,
  muscle: null
}
const AddExercise = () => {
  const [formData, setFormData] = useState(defaultState);

  const queryClient = useQueryClient()

  const muscles = ['back', 'leg','biceps','calf','triceps','shoulder', 'overall']
  const typeOptions = ['stength', 'cardio', 'calisthenic']

  const addWorkoutMutation = useMutation(addExercise, {
    onSuccess: () => {
      queryClient.invalidateQueries("exercises")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData, 'data')

    addWorkoutMutation.mutate(formData)
    setFormData(defaultState)
  }
  return (
    <div className='pt-[20%]'>
      <form onSubmit={handleSubmit} style={{ padding: '16px', height: "90vh", }}>
        <TextField type="text" value={formData.name} onChange={(e) => setFormData(prev => {
          return { ...prev, name: e.target.value }
        })} placeholder="Name" required label="Name" />

        <div className='my-4'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={muscles}
            sx={{ width: 300, background: "#fff" }}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Muscle group" />}
            renderOption={(props, option) => {
              return (
                <Box component="li" {...props} key={option._id}>
                  {option}
                </Box>
              );
            }}
            onChange={(event, newValue) => {
              setFormData(prev => {
                return { ...prev, muscle: newValue }
              })
            }}
            value={formData.muscle}
          />
        </div>

        <div className='my-4'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={typeOptions}
            sx={{ width: 300, background: "#fff" }}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Type" />}
            renderOption={(props, option) => {
              return (
                <Box component="li" {...props} key={option._id}>
                  {option}
                </Box>
              );
            }}
            onChange={(event, newValue) => {
              setFormData(prev => {
                return { ...prev, type: newValue }
              })
            }}
            value={formData.type}
          />
        </div>
        <div style={{ height: 20 }}></div>

        <div style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center", columnGap: 4 }}>
          <button className='p-2 border-2 rounded text-sm text-amber-500' type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default AddExercise