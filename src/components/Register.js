import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)

            });
    }
    return (
        <div>
            <form className='mx-auto flex flex-col justify-center p-3 px-5 space-y-4 w-full md:w-1/2 h-64 border shadow-md rounded-md mt-10' onSubmit={register}>
                <div className='flex space-x-3'>
                    <label className='w-1/3 font-semibold'>Name :</label>
                    <input type="text"
                        value={values.name}
                        placeholder="Enter Name"
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        className='flex-1'
                        required />
                </div>
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
                    <button className='bg-blue-400 p-2 text-center font-semibold rounded-md border shadow-md w-fit mt-2' type='submit'>Register</button>
                </div>
                <p onClick={() => navigate("/login")} className='cursor-pointer text-center text-blue-400 hover:text-blue-600 pt-3'>If Registered Then Log In</p>

            </form>
        </div>
    )
}

export default Register