import { createSlice } from '@reduxjs/toolkit'

// declaring the types for our state


const initialState = {
  accessToken: null,
  loading: true,
  auth: false,
  user: null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLogin: (state, action) => {
      console.log(action.payload)
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('user', JSON.stringify(action.payload))
      //   state.loading = false
      state.auth = true
      state.user = action.payload
      //   state.accessToken = action.payload.accessToken
    },
    setLogout: (state) => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      //   state.loading = false
      state.auth = false
      state.user = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setLoading, setLogin, setLogout, setError } = authSlice.actions

export const verifySession =
  () => async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      dispatch(setLoading(true))
      if (token) {

        dispatch(setLogin(user))
      } else {
        dispatch(setLogout())
      }
    } catch (err) {
      console.log(err)
      dispatch(setLogout())
      dispatch(setLoading(false))
    }
  }


// exporting the reducer here, as we need to add this to the store
export default authSlice.reducer
