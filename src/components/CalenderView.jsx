import React from 'react'
import { datePickerStyle } from './styles';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CalenderView = () => {
  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker   sx={datePickerStyle}
         variant='static'
         orientation='portrait'
         value={selectedDate.standard}
         onChange={(e)=>{setSelectedDate({standard:dayjs(e.$d),display: dayjs(e.$d).format("DD-MM-YYYY")})
        }}
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