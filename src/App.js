import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// features
import { TodoList, AddTodo, EditTodo } from './features/todos'
// components
import { Layout, NotFound } from './components'
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch,useSelector } from "react-redux"
import {verifySession} from './features/todos/authSlice'



function App() {
 
  const logInData = useSelector(store => store.auth.user)
  
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('VERIFY')
    dispatch(verifySession())
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     router.push('/auth/login')
  //   }
  //   if (!!token && router.pathname.includes("/auth/login")) {
  //     router.push('/')
  //   }
  // }, [authState])


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* TodoList component acting as homepage here */}
        <Route
          path="/"
          element={logInData
            ? <TodoList />
            : <Login />
          }
        />
        {/* <Route index element={<TodoList />} /> */}
        <Route path="add-todo" element={<AddTodo />} />
        <Route path="edit-todo/:id" element={<EditTodo />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App
