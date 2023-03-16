import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data : []
}
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.data = action.payload
    },
    addTodo: (state, action) => {
      state.data.push(action.payload)
    },
    editTodo: (state, action) => {
      const { id, title, details } = action.payload
      const existingTodo = state.data.find(todo => todo.id === id)
      if(existingTodo) {
        existingTodo.title = title
        existingTodo.details = details
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload
      const existingTodo = state.data.find(todo => todo.id === id)
      if(existingTodo) {
        return state.data.filter(todo => todo.id !== id)
      }
    }
  }
})

export const selectTodo = (state) => state.todo.value

export const { addTodo, editTodo, deleteTodo,setTodo } = todoSlice.actions
export default todoSlice.reducer