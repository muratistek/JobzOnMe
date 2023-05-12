import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {

  const { alertType, alertText } = useSelector(state => state.alert);

  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}

export default Alert