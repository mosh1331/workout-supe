import { styled } from "@mui/material/styles";
import {  PickersDay } from '@mui/x-date-pickers'


const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: 'green',
      color: theme.palette.primary.contrastText,
    },
  }));
  
  //higlight the dates in highlightedDays arra
  const ServerDay = (props) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.includes(day.format("YYYY-MM-DD"));
  
    return (
      <HighlightedDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={isSelected}
      />
    );
  };

  export default ServerDay