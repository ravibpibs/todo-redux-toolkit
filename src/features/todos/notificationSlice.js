import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from '../../app/store'



const initialState = {
  show: false,
  message: '',
  type: '',
  timeout: 3000,
  title: '',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    success: (state, action) => {
      state.show = true
      state.type = 'success'
      state.message = action.payload.message
      state.title = 'Success'
      !action.payload.noHide && autoHideNotification(state, state.timeout)
    },
    error: (state,action) => {
      state.show = true
      state.type = 'error'
      state.message = action.payload.message
      state.title = 'Error'
      !action.payload.noHide && autoHideNotification(state, state.timeout)
    },
    warning: (state,action) => {
      state.show = true
      state.type = 'warning'
      state.message = action.payload.message
      state.title = 'Warning'
      !action.payload.noHide && autoHideNotification(state, state.timeout)
    },
    info: (state, action) => {
      state.show = true
      state.type = 'info'
      state.message = action.payload.message
      state.title = 'Info'
      !action.payload.noHide && autoHideNotification(state, state.timeout)
    },
    hide: (state) => {
      state.show = false
    },
  },
})

export const { success, error, warning, info, hide } = notificationSlice.actions
export const notifier = {
  success: (message, noHide) => {
    store.dispatch(success({ message, noHide }))
  },
  error: (message,noHide) => {
    store.dispatch(error({ message, noHide }))
  },
  warning: (message, noHide) => {
    store.dispatch(warning({ message, noHide }))
  },
  info: (message, noHide) => {
    store.dispatch(info({ message, noHide }))
  },
  hide: () => {
    store.dispatch(hide())
  },
}
function autoHideNotification(state,delay) {
  setTimeout(() => {
    store.dispatch(hide())
  }, delay)
}

export default notificationSlice.reducer
