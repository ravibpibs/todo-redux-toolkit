import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editTodo } from "./todoSlice"
// components
import { Button, TextField, FormContainer } from "../../components"
import { addDoc, updateDoc, doc, collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { notifier } from './notificationSlice'


const EditTodo = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const todos = useSelector(store => store.todos.data)
  const navigate = useNavigate()
  const existingTodo = todos.filter(todo => todo.id === params.id)
  const { title, details } = existingTodo[0]
  const [values, setValues] = useState({
    title,
    details
  })

  // const handleEditTodo = () => {
  //   setValues({ title: '', details: ''})
  //   // console.log(values);
  //   dispatch(editTodo({
  //     id: params.id,
  //     title: values.title,
  //     details: values.details
  //   }))
  //   navigate('/')
  // }

  const handleEditTodo = async () => {
    if (values.title == '') {
      notifier.error("Please Add Title")
      return
    }
    if (values.details == '') {
      notifier.error("Please Add Details")
      return
    }
    try {
      await updateDoc(doc(db, 'todos', params.id), {
        title: values.title,
        details: values.details
      })
      notifier.success("Edited Sucessfully")
      navigate('/')
    } catch (e) {
      notifier.error(e.message)
    }

  }


  return (
    <FormContainer title="Edit Todo">
      <TextField
        label="Todo"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo Item Title',maxlength:"30" }}
      />
      <TextField
        label="Details"
        value={values.details}
        onChange={(e) => setValues({ ...values, details: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo item details...',maxlength:"100" }}
      />
      <Button onClick={handleEditTodo}>Update</Button>
    </FormContainer>
  )
}
export default EditTodo