import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

export default function ProtectedRoute({ children }) {
  const { user, userLoading } = useSelector(state => state.user)

  if (userLoading) return <Loading />

  if (!user) {
    return <Navigate to="/landing" />
  }
  return children
}
