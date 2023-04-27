import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, SmallSidebar, BigSidebar } from '../../components'

export default function SharedLayout() {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* Only one component will be rendered at a time (based on the media query). Check the wrapper styled component */}
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
