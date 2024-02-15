import React from 'react'

const IndicatorDot = ({color}) => {
  return (
    <div className={`w-2 h-2  absolute top-2 right-2 rounded-lg`} style={{background:color}} />
  )
}

export default IndicatorDot