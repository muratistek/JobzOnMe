import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'
import { useSelector } from 'react-redux'

export default function StatItem({ count, title, icon, color, bcg }) {
  const { theme } = useSelector(state => state.theme)

  return (
    <Wrapper color={color} bcg={bcg} bgColor={theme === "dark" ? "#353535" : "#fff"}>
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}
