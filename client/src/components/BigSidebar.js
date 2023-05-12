import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useSelector, useDispatch } from 'react-redux'
import Logo from './Logo'
import NavLinks from './NavLinks'
import DayNightToggle from 'react-day-and-night-toggle'
import { toggleThemeThunk } from '../redux/slices/theme/themeThunk'

export default function BigSidebar() {
  // Potentially we can use "toggleSidebar" if we want the big sidebar to be closed once a user clicks any nav link
  const { showSidebar } = useSelector(state => state.job);

  const { theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Wrapper bgColor={theme === "dark" ? "#353535" : "#fff"} textColor={theme === "dark" ? "#d9e2ec" : "#627d98"} bgColorHover={theme === "dark" ? "#1b1b1b" : "#f0f4f8"} textColorHover={theme === "dark" ? "#f0f4f8" : "#102a43"} textColorActive={theme === 'dark' ? "#f0f4f8" : "#102a43"}>
      {/* We want to show bigSidebar immediately after a page reloads. Because the initial value is "false" we reverse the logic */}
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo styleLogo={{ width: "164px", height: "50px" }} />
          </header>
          <NavLinks />
          <div className='themeButton'>
            <DayNightToggle onChange={() => toggleThemeThunk(dispatch)} checked={theme === "light" ? false : true} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
