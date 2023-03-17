
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setLogin } from '../features/todos/authSlice'
import { useDispatch } from "react-redux"
import { notifier } from '../features/todos/notificationSlice'
import { useFormik } from "formik";
import * as Yup from 'yup'
import FormErrorMessage from './FormErrorMessage';

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = () => Yup.object().shape({
    email: Yup.string().email().required('Please Enter Email'),
    password: Yup.string().required(
        'Please Enter Password'
    ).min(8, 'Min Length should be 2!').max(12, 'Max Length should be 12!'),
})

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = getAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    dispatch(setLogin(userCredential?.user))
                }).then(() => {
                    notifier.success("User Logged In SuccessFully")
                    navigate("/")
                })
                .catch((err) => {
                    console.log("errrrrr", err.message)
                    notifier.error(err.message)

                });
        },
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='mx-auto flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 bg-white border shadow-md rounded-md mt-10'>
                <h1 className='text-center text-3xl font-semibold'>SignIn To Todo App</h1>
                <div className='flex items-center space-x-3 mt-6'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Email :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/person.png" alt='person' />
                        <input
                            type="email"
                            name='email'
                            value={formik.values.email}
                            placeholder="Enter Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='outline-none pl-2 w-full'
                        />
                    </div>
                </div>
                <FormErrorMessage touched={formik.touched.email} error={formik.errors.email} />
                <div className='flex items-center space-x-3'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Password :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/lock.png" alt='password' />
                        <input
                            type="password"
                            name='password'
                            value={formik.values.password}
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='outline-none pl-2 w-full'
                        />
                    </div>
                </div>
                <FormErrorMessage touched={formik.touched.password} error={formik.errors.password} />

                <div className='mx-auto'>
                    <button className='bg-blue-600 text-white p-2 text-center font-semibold rounded-md border shadow-md w-fit px-4 hover:bg-blue-700' type='submit'>Log In</button>
                </div>
                <p onClick={() => navigate("/register")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pb-5'>If Not Register Then Click Here</p>

            </form>
        </div>
    )
}

export default Login