import { useSelector, useDispatch, } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditIcon } from '../../assets/icons'
import { useEffect, useState } from 'react'
// components
import { Button } from "../../components"
import { collection, deleteDoc, onSnapshot, query, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { setTodo } from './todoSlice'
import { notifier } from './notificationSlice'
import {
  TrashIcon
} from '@heroicons/react/outline'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const TodoList = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const todos = useSelector(store => store.todos.data)



  const handleDeleteTodo = async (id,title) => {
    await deleteDoc(doc(db, 'todos', id))
    notifier.info(`${title} Deleted`)
  }



  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = []
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      dispatch(setTodo(todosArr))
    })
    setLoading(false)
    return () => unsubscribe()
  }, [dispatch])


  const renderCard = () => todos.map(todo => (
    <div
      className="bg-white p-5 flex flex-col justify-between shadow-xl ring-1 ring-gray-900/5 border rounded-md"
      key={todo.id}
    >
      <div className='w-72'>
        <h3 className="font-bold text-lg text-gray-700">{todo.title}</h3>
        <span className="font-normal text-gray-600  break-words flex-wrap">{todo.details}</span>
      </div>

      <div className="flex gap-4 justify-end mt-1">
        <Link to={`edit-todo/${todo.id}`} className="flex">
          <Tooltip overlay="Update" placement="bottom">
            <button className="w-6 h-6 hover:-rotate-12">
              <EditIcon />
            </button>
          </Tooltip>
        </Link>
        <Tooltip overlay="Delete" placement="bottom">
          <button
            className="w-6 h-6 hover:scale-110"
            onClick={() => handleDeleteTodo(todo.id,todo.title)}
          >
            <TrashIcon className='text-red-500' />
          </button>
        </Tooltip>
      </div>

    </div>
  ))

  if (loading) {
    return <div className='grid place-items-center h-full text-2xl font-bold'>
      Loading............
    </div>
  }

  return (
    <>
      <div className="flex flex-wrap flex-col xxs:flex-row justify-between text-center items-center mx-auto max-w-screen-xl mb-4">
        <h1 className='font-bold text-2xl text-gray-700 '>TodoList</h1>
        <Link to='/add-todo'>
          <Button>Add Todo</Button>
        </Link>

      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {todos.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">No Todos</p>}
      </div>
    </>
  )
}
export default TodoList