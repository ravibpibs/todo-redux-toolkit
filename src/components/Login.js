import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { setLogin } from '../features/todos/authSlice'
import { useDispatch } from "react-redux"


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
                console.log(userCredential.user);
                dispatch(setLogin(userCredential.user))
                // ...
            }).then(() => {
                navigate("/")
            })
            .catch((err) => {
                if (
                    err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    err.code === AuthErrorCodes.USER_DELETED
                ) {
                    setError("The email address or password is incorrect");
                } else {
                    console.log(err.code);
                    alert(err.code);
                }
            });
    }
    return (
        <div>
            <form className='mx-auto flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 h-64 border shadow-md rounded-md mt-10' onSubmit={loginForm}>

                <div className='flex space-x-3'>
                    <label className='w-1/3 font-semibold'>Email :</label>
                    <input
                        type="email"
                        value={values.email}
                        placeholder="Enter Email"
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        className='flex-1'
                        required />
                </div>
                <div className='flex space-x-3'>
                    <label className='w-1/3 font-semibold'>password :</label>
                    <input
                        type="password"
                        value={values.password}
                        placeholder="Enter Password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        className='flex-1'
                        required />
                </div>
               
                <div className='mx-auto'>
                    <button className='bg-blue-400 p-2 text-center font-semibold rounded-md border shadow-md w-fit mt-2' type='submit'>Log In</button>
                </div>
                <p onClick={() => navigate("/register")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pt-3'>If Not Register Then Click Here</p>

            </form></div>
    )
}

export default Login