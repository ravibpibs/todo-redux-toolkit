import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import authReducer from '../features/todos/authSlice'
import notificationSlice from '../features/todos/notificationSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
    notification: notificationSlice
  },
});
