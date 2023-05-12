import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DayNightToggle from 'react-day-and-night-toggle'
import { toggleThemeThunk } from '../redux/slices/theme/themeThunk'

const Landing = () => {
  const { user } = useSelector(state => state.user)
  const { theme } = useSelector(state => state.theme)

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}

      <Wrapper>
        <nav>
          <Logo />
          <DayNightToggle onChange={() => toggleThemeThunk(dispatch)} checked={theme === "light" ? false : true} />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className="info">
            <h1>job <span>tracking </span> app</h1>
            <p className={theme === 'dark' ? "darkTheme-text" : ""}>
              Welcome to JobzOnMe, the ultimate job application tracking website!<br /><br />

              Are you tired of keeping track of multiple job applications and resumes? With JobzOnMe, you can easily organize and keep track of all your job applications in one place. Our user-friendly platform allows you to add your job application to the system and track the status of each application giving a user peace of mind.<br /><br />

              Don't miss out on your dream job because of disorganization. Sign up for JobzOnMe today and take control of your job search.<br /><br />

              * You can access the "demo" app by clicking the button below and following the related link.

            </p>
            <Link to="/register" className='btn btn-hero'>Login/Register</Link>
          </div>
          <img src={main} alt="job hunting journey" className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Landing