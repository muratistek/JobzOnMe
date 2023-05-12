import React from 'react'
import main from '../assets/images/main.png'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = () => {
  const { user } = useSelector(state => state.user)

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}

      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className="info">
            <h1>job <span>tracking </span> app</h1>
            <p>
              Welcome to JobzOnMe, the ultimate job application tracking website!<br /><br />

              Are you tired of keeping track of multiple job applications and resumes? With JobzOnMe, you can easily organize and keep track of all your job applications in one place. Our user-friendly platform allows you to add your job application to the system and track the status of each application giving a user peace of mind.<br /><br />

              Don't miss out on your dream job because of disorganization. Sign up for JobzOnMe today and take control of your job search.

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