import axios from "axios";
// import { logoutUser } from 

// Setting Axios custom instance
const authFetch = axios.create({
  baseURL: "/api/v1"
})


// Attach an interceptor that will be executed once we get the response from the "authFetch" request. The first block is executed if the response codes are in 200 range. The last block is executed if the response code are in 400 range
// This is very handy because we can logout user if we have 401 (Unauthorized) error in a response
authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // logoutUser()
    }
    return Promise.reject(error)
  }
)

export default authFetch;