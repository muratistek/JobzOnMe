import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebarThunk } from "../redux/slices/job/jobThunk";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const dispatch = useDispatch()
  const { showSidebar } = useSelector(state => state.job)

  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={() => toggleSidebarThunk(dispatch)}>
            <FaTimes />
          </button>
          <header>
            <Logo styleLogo={{ width: "164px", height: "50px" }} />
          </header>
          <NavLinks toggleSidebar={() => toggleSidebarThunk(dispatch)} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar