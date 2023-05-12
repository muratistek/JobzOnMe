import React, { useEffect } from 'react'
import { showStatsThunk } from '../../redux/slices/stat/statThunk'
import { useSelector, useDispatch } from 'react-redux'
import { StatsContainer, ChartsContainer, Loading } from '../../components'

export default function Stats() {
  const dispatch = useDispatch()

  const { monthlyApplications } = useSelector(state => state.stat)
  const { isLoading } = useSelector(state => state.alert)

  useEffect(() => {
    showStatsThunk(dispatch)
    // You can also use the useCallback() hook
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length !== 0 && <ChartsContainer />}
    </>
  )
}
