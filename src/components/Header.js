import { Link } from 'react-router-dom'
import { BrandIcon } from '../assets/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { setLogout } from '../features/todos/authSlice'
import { notifier } from '../features/todos/notificationSlice'

const Header = () => {
 
  const logInData = useSelector(store => store.auth.user)
  const auth = getAuth()
  const dispatch = useDispatch()

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(setLogout())
      notifier.info("Logged Out Successfully")
    }).catch((error) => {
      console.log(error)
      notifier.error(error.message)
    });
  }

 

  return (
    <header>
      <div className="px-4 lg:px-6 py-5 bg-gray-800 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={'/'} className="flex items-center gap-x-1 xxs:gap-x-3">
            <div className="w-6 h-6 sm:h-9 flex items-center">
              <BrandIcon color="white" />
            </div>
            <span className='self-center text-md xxs:text-lg font-semibold whitespace-nowrap dark:text-white text-white'>Todo App</span>
          </Link>
          <div className='flex space-x-2 items-center'>
            <p className='text-white'>{logInData && logInData.email}</p>
            {!!logInData && <button onClick={logOut} className='bg-blue-600 p-2 text-base font-semibold rounded-md text-white'>Log Out</button>}

          </div>
          {/* <a href="https://github.com/ravibpibs" target="_blank" rel="noreferrer" className="flex items-center">
            <button className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
              Github Repo
            </button>
          </a> */}
        </div>
      </div>
    </header>
  )
}
export default Header