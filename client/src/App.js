import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages';
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from './pages/dashboard'

import { useEffect } from 'react';
import { getCurrentUserThunk } from './redux/slices/user/userThunk';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const { theme } = useSelector(state => state.theme)

  // The "effect" function below will be executed each time we refresh a page. 
  // This is done to get the "current user" using a cookie (instead of a local storage) and prevent from logging out with each page refresh
  useEffect(() => {
    document.body.setAttribute("theme", theme)
    getCurrentUserThunk(dispatch);
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='all-jobs' element={<AllJobs />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
