import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSelector } from 'react-redux'

export default function AreaChartComponent({ data }) {
  const { theme } = useSelector(state => state.theme)

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }} >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#353535" : "#fff" }} />
        <Area dataKey='count' type='monotone' stroke='#209CEE' fill='#69bcf4' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
