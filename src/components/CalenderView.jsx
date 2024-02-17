import React, { useState } from 'react'
import { datePickerStyle } from './styles';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ServerDay from './CalenderHighlightedDay';
import { useQuery } from 'react-query';
import { getWorkoutDays, getWorkoutsByDate } from '../apis/workoutApis';
import SmallLoader from './SmallLoader';

const CalenderView = () => {
  const [selectedDate, setSelectedDate] = useState({ standard: dayjs(), display: dayjs().format("YYYY-MM-DD") });

  const {
    isLoading: isFetchingWorkoutDays,
    data: workoutDays
  } = useQuery('workoutDays', getWorkoutDays)

  const {
    isLoading: isFetchingWorkouts,
    data: workouts,
  } = useQuery(['workouts', selectedDate.display], () => getWorkoutsByDate(selectedDate.display), {
    enabled: selectedDate.display !== '',
  });


  const highlightedDays = workoutDays?.map(i => dayjs(i.date).format('YYYY-MM-DD'))
  const currentDate = new Date()

  if(isFetchingWorkoutDays){
    return <SmallLoader />
  }
  return (
    <div className='h-[100vh]'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker sx={datePickerStyle}
          variant='static'
          orientation='portrait'
          value={dayjs(currentDate)}
           onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("YYYY-MM-DD")})
          }}
          renderInput={(params) => {
            <TextField {...params} />
          }}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            actionBar:{actions:[]},
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
      <div>
        {workouts?.exercises?.length > 0 ?  <div>
        <p className="text-sm">Workouts done : {workouts?.exercises?.length}</p>
        <button  className='text-[blue] text-sm '>View more details</button>
        </div>: <p className="text-sm">No workouts logged for this day</p>}
      </div>
    </div>
  )
}

export default CalenderView