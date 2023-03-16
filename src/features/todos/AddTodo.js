import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button, TextField, FormContainer } from "../../components"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { notifier } from './notificationSlice'


const AddTodo = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    details: ''
  })



  const handleAddTodo = async () => {
    if (values.title === '') {
      notifier.error("Please Add Title")
      return
    }
    if (values.details === '') {
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


  }

  return (
    <FormContainer title="Add Todo">
      <TextField
        label="Todo"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo Item Title', maxlength: "30" }}
      />
      <TextField
        label="Details"
        value={values.details}
        onChange={(e) => setValues({ ...values, details: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo item details...', maxlength: "100" }}
      />
      <Button onClick={handleAddTodo}>Create</Button>
    </FormContainer>
  )
}
export default AddTodo