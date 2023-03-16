import { useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
// features
import { TodoList, AddTodo, EditTodo } from './features/todos'
// components
import { Layout, NotFound } from './components'
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch, useSelector } from "react-redux"
import { verifySession } from './features/todos/authSlice'
import NotificationContainer from './features/todos/NotificationContainer'

function App() {

  const logInData = useSelector(store => store.auth.user)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('VERIFY')
    dispatch(verifySession())
  }, [dispatch])

  


  return (
    <div>
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
          <Route path="add-todo" element={logInData ? <AddTodo /> : <Login />} />
          <Route path="edit-todo/:id" element={logInData ? <EditTodo /> : <Login />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App
