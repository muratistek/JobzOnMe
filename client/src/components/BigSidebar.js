import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'

export default function BigSidebar() {
  // Potentially we can use "toggleSidebar" if we want the big sidebar to be closed once a user clicks any nav link
  const { showSidebar } = useAppContext()

  return (
    <Wrapper>
      {/* We want to show bigSidebar immediately after a page reloads. Because the initial value is "false" we reverse the logic */}
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
