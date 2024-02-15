import React from 'react'
import { datePickerStyle } from './styles';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CalenderView = () => {
  const currentDate = new Date()
  return (
    <div className='h-[100vh]'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker   sx={datePickerStyle}
         variant='static'
         orientation='portrait'
         value={dayjs(currentDate)}
        //  onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("DD-MM-YYYY")})
        // }}
         renderInput={(params) => {
           <TextField {...params} />
         }}
       slotProps={{day:[1,5,9],actionBar: { actions: [] }}}
        />
      </LocalizationProvider> 
    </div>
  )
}

export default CalenderView