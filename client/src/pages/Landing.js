import React from 'react'
import logo from '../assets/images/logo.png'
import main from '../assets/images/main.png'
import styled from 'styled-components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobzonme" className='logo' />
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
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt="job hunting journey" className='img main-img' />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .logo{
    width: 164px;
    height: 50px;
  }

  nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page{
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1{
    font-weight: 700;
    span{
      color: var(--primary2-500);
    }
  }

  p{
    color: var(--grey-600);
  }

  .main-img{
    display: none;
  }

  @media (min-width: 992px) {
    .page{
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img{
      display: block;
    }
  }
`

export default Landing