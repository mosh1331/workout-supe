// dateUtils.js
import dayjs from 'dayjs';

  // Function to generate an array of 5 consecutive days including today
 export  const generateConsecutiveDays = () => {
    const days = [];
    for (let i = 4; i >= 0; i--) {
      days.push(dayjs().subtract(i, 'day'));
    }
    return days;
  };
