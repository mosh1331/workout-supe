import React from 'react'
import { getCurrentStreak } from '../apis/workoutApis'
import { useQuery } from 'react-query'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const CurrentStreak = () => {
    const {
        isLoading: isFetching,
        isError,
        error,
        data: data
      } = useQuery('current_streak', getCurrentStreak)

  return (
    <div className='flex items-center mb-2'>
    <LocalFireDepartmentIcon />
        <p className="text-sm mr-2">Current Streak : {data?.currentStreak} days</p>
    </div>
  )
}

export default CurrentStreak