import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data : []
}
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      console.log("action",action);
      state.data = action.payload
    },
    addTodo: (state, action) => {
      // Shows the action type and payload
      console.log(action);
      state.data.push(action.payload)
    },
    editTodo: (state, action) => {
      // grab the id, title & details from the action payload 
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