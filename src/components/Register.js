import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { notifier } from '../features/todos/notificationSlice';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const auth = getAuth()

    const register = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((cred) => {
                addDoc(collection(db, "users"), {
                    uid: cred.user.uid,
                    name: values.name,
                    email: values.email,
                    password: values.password
                });
            }).then(() => {
                setValues({ ...values, name: "" })
                setValues({ ...values, email: "" })
                setValues({ ...values, password: "" })
                notifier.success("User Registered SuccessFully")
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
                notifier.error(error.message)
            });
    }
    return (
        <div>
            <form className='mx-auto bg-white flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 border shadow-md rounded-md mt-10' onSubmit={register}>
            <h1 className='text-center text-2xl font-semibold'>SignUp To Todo App</h1>
                <div className='flex items-center space-x-3 mt-6'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Name :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/profilepic.png" className='w-5 h-5 object-contain' alt='name' />
                        <input type="text"
                            value={values.name}
                            placeholder="Enter Name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className='outline-none pl-2 w-full'
                            required />
                    </div>
                </div>
                <div className='flex items-center space-x-3'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Email :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/person.png" alt='email' />
                        <input
                            type="email"
                            value={values.email}
                            placeholder="Enter Email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='outline-none pl-2 w-full'
                            required />
                    </div>
                </div>
                <div className='flex items-center space-x-3 mt-6'>
                    <label className='w-2/5 md:w-1/3 font-semibold'>Password :</label>
                    <div className='flex items-center border rounded-md p-3 w-full'>
                        <img src="/images/lock.png" alt='password' />
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
                    <button className='bg-blue-600 text-white p-2 text-center font-semibold rounded-md border shadow-md w-fit px-4 hover:bg-blue-700' type='submit'>Register</button>
                </div>
                <p onClick={() => navigate("/login")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pb-5'>If Registered Then Click Here</p>

            </form>
        </div>
    )
}

export default Register