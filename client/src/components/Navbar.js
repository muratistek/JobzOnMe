import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { logoutUserThunk } from "../redux/slices/user/userThunk";
import { toggleSidebarThunk } from "../redux/slices/job/jobThunk";
import Logo from "./Logo";

export default function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [showLogout, setShowLogout] = useState(false)

  const { theme } = useSelector(state => state.theme)

  return (
    <Wrapper bgColor={theme === "dark" ? "#353535" : "#fff"}>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebarThunk(dispatch)} type="button">
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={() => logoutUserThunk(dispatch)}>logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}