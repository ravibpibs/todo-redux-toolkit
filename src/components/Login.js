import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { setLogin } from '../features/todos/authSlice'
import { useDispatch } from "react-redux"
import { notifier } from '../features/todos/notificationSlice'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = getAuth()

    const loginForm = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                dispatch(setLogin(userCredential?.user))
                // ...
            }).then(() => {
                notifier.success("User Logged In SuccessFully")
                navigate("/")
            })
            .catch((err) => {
                console.log("errrrrr",err.message)
                notifier.error(err.message)
                // if (
                //     err.code === AuthErrorCodes.INVALID_PASSWORD ||
                //     err.code === AuthErrorCodes.USER_DELETED
                // ) {
                //     setError("The email address or password is incorrect");
                // } else {
                //     console.log(err.code);
                //     alert(err.code);
                // }
            });
    }
    return (
        <div>
            <form className='mx-auto flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 bg-white border shadow-md rounded-md mt-10' onSubmit={loginForm}>
                <h1 className='text-center text-3xl font-semibold'>SignIn To Todo App</h1>
                <div className='flex items-center space-x-3 mt-6'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Email :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/person.png" />
                        <input
                            type="email"
                            value={values.email}
                            placeholder="Enter Email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='outline-none pl-2 w-full'
                            required />
                    </div>
                </div>
                <div className='flex items-center space-x-3'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Password :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/lock.png" />
                        <input
                            type="password"
                            value={values.password}
                            placeholder="Enter Password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='outline-none pl-2 w-full'
                            required />
                    </div>
                </div>

                <div className='mx-auto'>
                    <button className='bg-blue-600 text-white p-2 text-center font-semibold rounded-md border shadow-md w-fit px-4 hover:bg-blue-700' type='submit'>Log In</button>
                </div>
                <p onClick={() => navigate("/register")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pb-5'>If Not Register Then Click Here</p>

            </form>
           </div>
    )
}

export default Login