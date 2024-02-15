import { Delete, ExpandLess, ExpandMore, FitnessCenter, StarBorder } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import axios from 'axios';
import dayjs from 'dayjs'
import React from 'react'

const WorkoutList = ({ datalist, selectedDate,deleteExercise }) => {
    const formattedDate = (date) => dayjs(date).format("DD-MM-YYYY")
    const workoutFortheDay = datalist?.find(i => formattedDate(i.date) == selectedDate.display)
    console.log(selectedDate,'selectedDate')

    const [open, setOpen] = React.useState('');

    const handleClick = (id) => {
        if (id === open) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

  
    return (
        <div style={{ padding: 12 }}> {workoutFortheDay?.exercises?.map(i => <div>
            <ListItemButton sx={{
                '& .css-elzd3y-MuiButtonBase-root-MuiListItemButton-root': {
                    background: "red !important"
                }
            }} onClick={() => handleClick(i._id)}>
                <ListItemIcon>
                    <FitnessCenter />
                </ListItemIcon>
                <ListItemText primary={i.name} />
                {open === i._id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse sx={{ position: "relative" }} in={open === i._id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {i.sets.map(set => <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={`${set.weight} kg`} />
                        <ListItemText primary={'x'} />
                        <ListItemText primary={`${set.reps} reps`} />
                    </ListItemButton>)}
                </List>
                <div style={{ position: "absolute", right: "20px", top: "10px", width: "20px", height: "20px" }} onClick={() => deleteExercise(workoutFortheDay,i._id)} >
                    <Delete color='tomato' />
                </div>
            </Collapse>
        </div>)}
        </div>
    )
}

export default WorkoutList