import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, ChartsContainer, Loading } from '../../components'

export default function Stats() {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
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
