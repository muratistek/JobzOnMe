import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebarThunk } from "../redux/slices/job/jobThunk";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { toggleThemeThunk } from '../redux/slices/theme/themeThunk'
import DayNightToggle from 'react-day-and-night-toggle'

const SmallSidebar = () => {
  const dispatch = useDispatch()
  const { showSidebar } = useSelector(state => state.job)

  const { theme } = useSelector(state => state.theme)

  return (
    <Wrapper bgColor={theme === "dark" ? "#353535" : "#fff"} textColor={theme === "dark" ? "#d9e2ec" : "#627d98"} bgColorHover={theme === "dark" ? "#1b1b1b" : "#f0f4f8"} textColorHover={theme === "dark" ? "#f0f4f8" : "#102a43"} textColorActive={theme === 'dark' ? "#f0f4f8" : "#102a43"}>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={() => toggleSidebarThunk(dispatch)}>
            <FaTimes />
          </button>
          <header>
            <Logo styleLogo={{ width: "164px", height: "50px" }} />
          </header>
          <NavLinks toggleSidebar={() => toggleSidebarThunk(dispatch)} />
          <div className='themeButton'>
            <DayNightToggle onChange={() => toggleThemeThunk(dispatch)} checked={theme === "light" ? false : true} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar