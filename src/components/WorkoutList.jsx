import dayjs from 'dayjs'
import React from 'react'

const WorkoutList = ({datalist,selectedDate}) => {
  return (
    <div> {datalist?.filter(i => dayjs(i.date).format("DD-MM-YYYY") == selectedDate.display)?.map(i => <div>{dayjs(i.date).format("DD-MM-YYYY")}</div>)}</div>
  )
}

export default WorkoutList