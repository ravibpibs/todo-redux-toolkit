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
      alert("Please Add Title")
      return
    }
    if (values.details == '') {
      alert("Please Add Details")
      return
    }
    await addDoc(collection(db, 'todos'), {
      title: values.title,
      details: values.details
    })
    
    // dispatch(addTodo({
    //   id: nanoid(8),
    //   title: values.title,
    //   details: values.details
    // }))
    navigate('/')
  }

  return (
    <FormContainer title="Add Todo">
      <TextField
        label="Todo"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo Item Title' }}
      />
      <TextField
        label="Details"
        value={values.details}
        onChange={(e) => setValues({ ...values, details: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo item details...' }}
      />
      <Button onClick={handleAddTodo}>Create</Button>
    </FormContainer>
  )
}
export default AddTodo