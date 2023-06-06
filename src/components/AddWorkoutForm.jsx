import { AppBar, Autocomplete, Box, Drawer, TextField, Toolbar } from '@mui/material';
import React, { useState } from 'react';

const AddWorkoutForm = ({ exercises,showForm,setShowForm }) => {
  const [workout, setWorkout] = useState("");
  const [sets, setSets] = useState([{ reps: 0, weight: 0 }]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic here, e.g., send data to the server
    console.log({ workout, sets });
    // Reset form
    setWorkout(" ");
    setSets([{ reps: 0, weight: 0 }]);
  };

  return (

    <Drawer
      anchor={"bottom"}
      open={showForm}
      onClose={() => { setShowForm(false) }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workout">workout:</label>
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
        <div>
          <label>Sets:</label>
          {sets.map((set, index) => (
            <div key={index}>
              <TextField type="number" value={set.weight} onChange={(e) => handleWeightChange(e, index)} placeholder="Weight" required label="kg" />
              <TextField type="number" value={set.reps} onChange={(e) => handleRepsChange(e, index)} placeholder="Reps" required label="Reps" />
              <button type="button" onClick={() => handleRemoveSet(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddSet}>Add Set</button>
        </div>

        <button type="submit">Submit</button>
      </form>

    </Drawer>

  );
};

export default AddWorkoutForm;
