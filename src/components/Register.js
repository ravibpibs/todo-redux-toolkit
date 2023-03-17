
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { notifier } from '../features/todos/notificationSlice';
import { useFormik } from "formik";
import * as Yup from 'yup'
import FormErrorMessage from './FormErrorMessage';

const initialValues = {
    name: "",
    email: "",
    password: ""
}

const validationSchema = () => Yup.object().shape({
    name: Yup.string().required('Please Enter Name').min(2, 'Min Length should be 2!')
        .max(30, 'Max Length should be 100!')
        .matches(
            /^[a-zA-Z ]*$/,
            'Only alphabet characters are allowed!'
        ),
    email: Yup.string().email().required('Please Enter Email'),
    password: Yup.string().required(
        'Please Enter Password'
    ).min(8, 'Min Length should be 2!').max(12, 'Max Length should be 12!'),
})





const Register = () => {
    const navigate = useNavigate();
    const auth = getAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((cred) => {
                    addDoc(collection(db, "users"), {
                        uid: cred.user.uid,
                        name: values.name,
                        email: values.email,
                        password: values.password
                    });
                }).then(() => {
                    updateProfile(auth.currentUser, { displayName: values.name })
                })
                .then(() => {
                    notifier.success("User Registered SuccessFully")
                    navigate("/login")
                })
                .catch((error) => {
                    console.log(error)
                    notifier.error(error.message)
                });
        },
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='mx-auto bg-white flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 border shadow-md rounded-md mt-10'>
                <h1 className='text-center text-2xl font-semibold'>SignUp To Todo App</h1>
                <div className='flex items-center space-x-3 mt-6'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Name :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/profilepic.png" className='w-5 h-5 object-contain' alt='name' />
                        <input type="string"
                            value={formik.values.name}
                            name='name'
                            placeholder="Enter Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='outline-none pl-2 w-full'
                        />
                    </div>

                </div>
                <FormErrorMessage touched={formik.touched.name} error={formik.errors.name} />
                <div className='flex items-center space-x-3'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Email :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/person.png" alt='email' />
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
                <div className='flex items-center space-x-3 mt-6'>
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
                    <button className='bg-blue-600 text-white p-2 text-center font-semibold rounded-md border shadow-md w-fit px-4 hover:bg-blue-700' type='submit'>Register</button>
                </div>
                <p onClick={() => navigate("/login")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pb-5'>If Registered Then Click Here</p>

            </form>
        </div>
    )
}

export default Register