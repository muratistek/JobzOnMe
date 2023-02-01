import { useEffect, useState } from 'react'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  // global state and useNavigate

  const handleChange = (e) => {
    console.log(e.target)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target);
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* name input field */}
        <FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="Name" />
        {/* email input field */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} labelText="Email" />
        {/* password input field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} labelText="Password" />
        <button type='submit' className='btn btn-block'>Submit</button>
      </form>
    </Wrapper>
  )
}

export default Register