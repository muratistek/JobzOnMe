import React, { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserThunk } from '../../redux/slices/user/userThunk'
import { displayAlertThunk } from '../../redux/slices/alert/alertThunk'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


export default function Profile() {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user);

  const { isLoading, showAlert } = useSelector(state => state.alert)

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()

    // If you need to test the server-side error handling, comment out the below code
    if (!name || !email || !lastName || !location) {
      displayAlertThunk(dispatch)
      return
    }

    updateUserThunk(dispatch, { name, email, lastName, location })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type='text'
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>{isLoading ? "Please Wait..." : "save changes"}</button>
        </div>
      </form>
    </Wrapper>
  )
}
