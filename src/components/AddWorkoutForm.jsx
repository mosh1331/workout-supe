import { Add, Delete } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Drawer, TextField, Toolbar } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { isNOTNullOrUndefined } from '../utils/helpers';
import { addWorkout, editWorkout } from '../apis/workoutApis';
import { useMutation, useQueryClient } from 'react-query';

const AddWorkoutForm = ({ exercises, showForm, setShowForm, selectedDate ,datalist}) => {
  const [workout, setWorkout] = useState(exercises[0]);
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);

  const formattedDate = (date) => dayjs(date).format("DD-MM-YYYY")
  const workoutFortheDay = datalist?.find(i => formattedDate(i.date) == selectedDate.display)
  const queryClient = useQueryClient()


  const addWorkoutMutation = useMutation(addWorkout,{
    onSuccess:()=>{
      queryClient.invalidateQueries("workouts")
    }
  })

  const updateWorkoutMutation = useMutation(editWorkout,{
    onSuccess:()=>{
      queryClient.invalidateQueries("workouts")
    }
  })

  const handleRepsChange = (e, index) => {
    const newSets = [...sets];
    newSets[index].reps = parseInt(e.target.value);
    setSets(newSets);
  };

  const handleWeightChange = (e, index) => {
    const newSets = [...sets];
    newSets[index].weight = parseInt(e.target.value);
    setSets(newSets);
  };

  const handleAddSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const handleRemoveSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here, e.g., send data to the server
   
    if(isNOTNullOrUndefined(workoutFortheDay?._id)){
      updateWorkout()
    }else{
      createWorkout()
    }
 
  };

  const createWorkout =async()=>{
    const exerciseData = {
      date: selectedDate.standard,
      exercises: [{
        name: workout.name,
        sets: sets.map(i => { return { reps: i.reps, weight: i.weight } })
      }]
    }
    addWorkoutMutation.mutate(exerciseData)
    resetform()
  }
 
  const updateWorkout =async()=>{
    const exerciseData = {
      date: selectedDate.standard,
      exercises: [...workoutFortheDay.exercises,{
        name: workout.name,
        sets: sets.map(i => { return { reps: i.reps, weight: i.weight } })
      }]
    }
    updateWorkoutMutation.mutate({id:workoutFortheDay._id,exerciseData:exerciseData})
    resetform()
  }

  const resetform =()=>{
    // Reset form
    setWorkout(exercises[0]);
    setSets([{ reps: 0, weight: 0 }]);
    setShowForm(false)
  }
  const inputsContainer = {
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }

  const inputStyle = {
    width: "40%"
  }


  return (

    <Drawer
      anchor={"bottom"}
      open={showForm}
      onClose={() => { setShowForm(false) }}
    >
      <form onSubmit={handleSubmit} style={{ padding: '16px',height:"90vh" ,}}>
        <div style={{ marginBottom: 4 }}>
           <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={exercises}
            sx={{ width: 300, background: "#fff" }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="exercises" />}
            renderOption={(props, option) => {
              return (
                <Box component="li" {...props} key={option._id}>
                  {option.name}
                </Box>
              );
            }}
            onChange={(event, newValue) => {
              setWorkout(newValue);
            }}
            value={workout}
          />
        </div>
        <div style={{ height: 20 }}></div>
        <div>
          {sets.map((set, index) => (
            <div style={inputsContainer} key={index}>
              <TextField type="number" sx={inputStyle} value={set.weight} onChange={(e) => handleWeightChange(e, index)} placeholder="Weight" required label="kg" />
              <TextField type="number" sx={inputStyle} value={set.reps} onChange={(e) => handleRepsChange(e, index)} placeholder="Reps" required label="Reps" />
              <button type="button" onClick={() => handleRemoveSet(index)}><Delete /></button>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: "center",columnGap:4 }}>
          <button type="button"  onClick={handleAddSet}>Add set</button>
          <button style={{ height: "100%" }} type="submit">Submit</button></div>
      </form>

    </Drawer>

  );
};

export default AddWorkoutForm;
