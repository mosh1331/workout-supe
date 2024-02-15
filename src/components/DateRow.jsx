// DateList.js
import React from 'react';
import dayjs from 'dayjs';

const DateRow = ({ days, workoutDays, selectedDate, setSelectedDate }) => {
    const isSelectedDate = (date) => dayjs(date).format("YYYY-MM-DD") === selectedDate.display
  return (
    <div className="flex flex-row w-full justify-between">
      {days.map((date, index) => {
        const currentDate = new Date();
        return (
          <div
            key={index}
            className={`w-[15%] m-2 text-center bg-[white] border-2 ${
                isSelectedDate(date)
                ? 'border-[#2564C0]'
                : ''
            } rounded relative `}
          >
            {workoutDays.find((d) => dayjs(d.date).format('MM DD YYYY') === date.format('MM DD YYYY')) ? (
              <div className='w-2 h-2 bg-[green] absolute top-2 right-2 rounded-lg' />
            ) : null}
            <div
              onClick={(e) => {
                setSelectedDate({ standard: dayjs(date), display: dayjs(date).format("YYYY-MM-DD") });
              }}
              className={`text-black p-4 mb-2 text-[12px]`}
            >
              {date.format('MMM D')}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateRow;
