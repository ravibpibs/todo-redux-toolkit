import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { notifier } from './notificationSlice'
import { useFormik } from "formik";
import * as Yup from 'yup'
import FormErrorMessage from '../../components/FormErrorMessage'

const initialValues = {
  title: "",
  details: ""
}

const validationSchema = () => Yup.object().shape({
  title: Yup.string().required('Please Enter Title').min(2, 'Min Length should be 2!').max(20, 'Max Length should be 20!'),
  details: Yup.string().required(
    'Please Enter Details'
  ).min(5, 'Min Length should be 5!').max(100, 'Max Length should be 100!'),
})

const EditTodo = () => {
  const params = useParams()
  const todos = useSelector(store => store.todos.data)
  const navigate = useNavigate()
  // const existingTodo = todos.filter(todo => todo.id === params.id)
  // const { title, details } = existingTodo[0]

  const fetchData = (id) => {
    const existingTodo = todos.filter(todo => todo.id === id)
    const { title, details } = existingTodo[0]
    formik.setValues({
      title: title,
      details: details
    })
  }

  useEffect(() => {
    fetchData(params.id)
// eslint-disable-next-line
  }, [params.id])


  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      try {
        await updateDoc(doc(db, 'todos', params.id), {
          date: new Date().toUTCString(),
          title: values.title,
          details: values.details
        })
        notifier.success("Edited Sucessfully")
        navigate('/')
      } catch (e) {
        notifier.error(e.message)
      }
    },
  })



  return (
    <form onSubmit={formik.handleSubmit} className="p-3 mt-10 max-w-xl mx-auto rounded-lg bg-slate-50 border border-gray-200 shadow-lg sm:p-6 md:p-8">
      <h1 className="my-3 text-center font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-400">Edit Todo</h1>
      <div className='flex flex-col'>
        <label className='mb-2 text-lg uppercase font-semibold text-gray-800'>TODO</label>
        <input
          className='bg-gray-200 mb-3 py-2 px-3 border-2 outline-none rounded'
          type="string"
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <FormErrorMessage touched={formik.touched.title} error={formik.errors.title} />

      <div className='flex flex-col'>
        <label className='mb-2 text-lg uppercase font-semibold text-gray-800'>DETAILS</label>
        <input
          className='bg-gray-200 mb-3 py-2 px-3 border-2 outline-none rounded'
          type="string"
          name='details'
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <FormErrorMessage touched={formik.touched.details} error={formik.errors.details} />
      <button className='bg-blue-600 text-white p-2 text-center font-semibold rounded-md border shadow-md w-fit px-4 hover:bg-blue-700 flex justify-center mx-auto' type="submit">Update</button>

    </form>
  )
}
export default EditTodo