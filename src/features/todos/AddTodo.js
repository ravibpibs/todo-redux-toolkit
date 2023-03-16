import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
// features
import { addTodo } from "./todoSlice"
// components
import { Button, TextField, FormContainer } from "../../components"
import { addDoc, collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { notifier } from './notificationSlice'


const AddTodo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    details: ''
  })


  // const handleAddTodo = () => {
  //   setValues({ title: '', details: ''})
  //   console.log(values);
  //   dispatch(addTodo({
  //     id: nanoid(8),
  //     title: values.title,
  //     details: values.details
  //   }))
  //   navigate('/')
  // }

  const handleAddTodo = async () => {
    if (values.title == '') {
      notifier.error("Please Add Title")
      return
    }
    if (values.details == '') {
      notifier.error("Please Add Details")
      return
    }
    try {
      await addDoc(collection(db, 'todos'), {
        title: values.title,
        details: values.details
      })
      notifier.success("Added Sucessfully")
      navigate('/')
    } catch (e) {
      notifier.error(e.message)
    }


    // dispatch(addTodo({
    //   id: nanoid(8),
    //   title: values.title,
    //   details: values.details
    // }))

  }

  return (
    <FormContainer title="Add Todo">
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
      <Button onClick={handleAddTodo}>Create</Button>
    </FormContainer>
  )
}
export default AddTodo