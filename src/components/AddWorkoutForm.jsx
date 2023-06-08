import { Add, Delete } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, Drawer, TextField, Toolbar } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { isNOTNullOrUndefined } from '../utils/helpers';

const AddWorkoutForm = ({ exercises, showForm, setShowForm, url, selectedDate ,datalist}) => {
  const [workout, setWorkout] = useState("");
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);

  const formattedDate = (date) => dayjs(date).format("DD-MM-YYYY")
  const workoutFortheDay = datalist?.find(i => formattedDate(i.date) == selectedDate.display)
  console.log(workoutFortheDay,'workoutId')

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
    console.log({ workout, sets });
   
    if(isNOTNullOrUndefined(workoutFortheDay._id)){
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
    console.log(exerciseData, 'exerciseData')
    try {
      await axios.post(`${url}/workouts`, exerciseData);
      console.log('Exercise data successfully posted!');
    } catch (error) {
      console.error('Error posting exercise data:', error);
    }
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
    console.log(exerciseData, 'exerciseData update')
    try {
      await axios.put(`${url}/workouts/${workoutFortheDay._id}`, exerciseData);
      console.log('Exercise data successfully posted!');
    } catch (error) {
      console.error('Error posting exercise data:', error);
    }
    resetform()
  }

  const resetform =()=>{
    // Reset form
    setWorkout(" ");
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
      <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
        <div style={{ marginBottom: 4 }}>
          {exercises?.length > 0 ? <Autocomplete
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
          /> : null}
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
