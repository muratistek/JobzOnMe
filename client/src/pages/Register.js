import { useEffect, useState } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useSelector, useDispatch } from 'react-redux'
import { registerUserThunk, loginUserThunk } from '../redux/slices/user/userThunk'
import { displayAlertThunk } from '../redux/slices/alert/alertThunk'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialState)
  // global state and useNavigate
  const navigate = useNavigate()

  const { user } = useSelector(state => state.user)
  const { isLoading, showAlert } = useSelector(state => state.alert)

  const { theme } = useSelector(state => state.theme)

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlertThunk(dispatch);
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      // "name" property here will be an empty string. It won't affect the functionality
      loginUserThunk(dispatch, currentUser)
    }
    else {
      registerUserThunk(dispatch, currentUser)
    }

    setValues(initialState)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className={`form ${theme === 'dark' ? 'form-dark' : ''}`} onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        {/* email input field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        {/* password input field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
        <button type='button' className='btn btn-block btn-hipster' disabled={isLoading} onClick={() => loginUserThunk(dispatch, { email: 'test@mail.com', password: 'secretTestUser' })}>
          {isLoading ? 'loading...' : 'Demo App'}
        </button>
        <p>
          {values.isMember ? "Not a member yet? " : "Already a member?"}
          <button type="button" onClick={toggleMember} className='member-btn'>{values.isMember ? "Register" : "Login"}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register