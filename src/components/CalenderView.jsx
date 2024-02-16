import React, { useState } from 'react'
import { datePickerStyle } from './styles';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ServerDay from './CalenderHighlightedDay';
import { useQuery } from 'react-query';
import { getWorkoutDays } from '../apis/workoutApis';
import SmallLoader from './SmallLoader';

const CalenderView = () => {
  const {
    isLoading: isFetchingWorkoutDays,
    data: workoutDays
  } = useQuery('workoutDays', getWorkoutDays)

  const highlightedDays = workoutDays?.map(i => dayjs(i.date).format('YYYY-MM-DD'))

  console.log(highlightedDays, 'workout Days')

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
          //  onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("DD-MM-YYYY")})
          // }}
          renderInput={(params) => {
            <TextField {...params} />
          }}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

export default CalenderView