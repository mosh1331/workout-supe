import { ExpandLess, ExpandMore, FitnessCenter, StarBorder } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

const WorkoutList = ({ datalist, selectedDate }) => {
    const [open, setOpen] = React.useState('');

    const handleClick = (id) => {
        if(id === open){
        setOpen('');
        }else{
        setOpen(id);
        }
    };
    return (
        <div style={{ padding: 12 }}> {datalist?.filter(i => dayjs(i.date).format("DD-MM-YYYY") == selectedDate.display)?.map(i => <div>{i.exercises?.map(i => <div>
            <ListItemButton  sx={{
                '& .css-elzd3y-MuiButtonBase-root-MuiListItemButton-root':{
                    background:"red !important"
                }
            }} onClick={()=>handleClick(i._id)}>
                <ListItemIcon>
                    <FitnessCenter />
                </ListItemIcon>
                <ListItemText primary={i.name} />
                {open === i._id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open === i._id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {i.sets.map(set =>  <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={`${set.weight} kg`} />
                        <ListItemText primary={'x'} />
                        <ListItemText primary={`${set.reps} reps`} />
                    </ListItemButton>)}
                   
                </List>
            </Collapse>
        </div>)}</div>)}</div>
    )
}

export default WorkoutList