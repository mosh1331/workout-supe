// DateList.js
import React from 'react';
import dayjs from 'dayjs';
import IndicatorDot from './IndicatorDot';

const DateRow = ({ days, workoutDays, selectedDate, setSelectedDate }) => {
    const isSelectedDate = (date) => dayjs(date).format("YYYY-MM-DD") === selectedDate.display
    return (
        <div className="flex flex-row w-full justify-between">
            {days.map((date, index) => {
                return (
                    <div
                        key={index}
                        className={`w-[18%]  text-center bg-[white] border-2 pt-2 ${isSelectedDate(date)
                                ? 'border-[#2564C0] '
                                : ''
                            } rounded relative `}
                    >
                        {workoutDays.find((d) => dayjs(d.date).format('MM DD YYYY') === date.format('MM DD YYYY')) ? (
                            <IndicatorDot color="green" />
                        ) : <IndicatorDot color="red" />}
                        <div
                            onClick={(e) => {
                                setSelectedDate({ standard: dayjs(date), display: dayjs(date).format("YYYY-MM-DD") });
                            }}
                            className={`text-black p-2 text-[12px] text-center flex flex-col justify-end`}
                        >
                            <p> {date.format('ddd')}</p>
                            <p>{date.format('DD ')}</p> 
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DateRow;
