import { Delete, ExpandLess, ExpandMore, FitnessCenter, StarBorder } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import axios from 'axios';
import dayjs from 'dayjs'
import React from 'react'
import SmallLoader from './SmallLoader';

const WorkoutList = ({ datalist, deleteExercise, isFetchingWorkouts }) => {
    const workoutFortheDay = datalist

    const [open, setOpen] = React.useState('');

    if (isFetchingWorkouts) {
        return <SmallLoader />
    }

    if (!workoutFortheDay) {
        return <div className="grid place-content-center pt-20">
            <div className="text-sm font-normal text-[tomato]">No workout logged</div>
        </div>
    }

    return (
        <div style={{ padding: 12 , paddingLeft:4}}> {workoutFortheDay?.exercises?.map(i => <div>
            <ListItemButton sx={{
                '& .css-elzd3y-MuiButtonBase-root-MuiListItemButton-root': {
                    background: "red !important"
                }
            }} onClick={() => i._id === open ? setOpen('') : setOpen(i._id)}>
                <ListItemIcon>
                    <FitnessCenter />
                </ListItemIcon>
                <ListItemText primary={i.name} />
                {open === i._id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse sx={{ position: "relative" }} in={open === i._id} timeout="auto" unmountOnExit>
                    {/* {i.sets.map(set => <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={`${set.weight} kg`} />
                        <ListItemText primary={'x'} />
                        <ListItemText primary={`${set.reps} reps`} />
                    </ListItemButton>)} */}
                    <div className="flex pl-8">
                    
                    {i.sets.map(set => <div className="border-2 ">
                        <div className="border-b-2 text-sm p-1">
                            {set.weight} kg
                        </div>
                        <div className="text-sm font-normal p-1">
                            {set.reps} reps
                        </div>
                    </div>
                    )}
                    </div>
                   
                <div style={{ position: "absolute", right: "20px", top: "10px", width: "20px", height: "20px" }} onClick={() => deleteExercise(workoutFortheDay, i._id)} >
                    <Delete color='tomato' />
                </div>
            </Collapse>
        </div>)}
        </div>
    )
}

export default WorkoutList