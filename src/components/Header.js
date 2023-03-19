import { Link } from 'react-router-dom'
import { BrandIcon } from '../assets/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { setLogout } from '../features/todos/authSlice'
import { notifier } from '../features/todos/notificationSlice'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Header = () => {
  const [open, setOpen] = useState(false)
  const logInData = useSelector(store => store.auth.user)
  const auth = getAuth()
  const dispatch = useDispatch()

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(setLogout())
      setOpen(false)
      notifier.info("Logged Out Successfully")
    }).catch((error) => {
      console.log(error)
      notifier.error(error.message)
    });
  }

  const openSigOutModel = () => {
    setOpen(true)
  }



  return (
    <header>
      <div className="px-4 lg:px-6 py-5 bg-gray-800 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={'/'} className="flex items-center gap-x-1 xxs:gap-x-3">
            <div className="w-6 h-6 sm:h-9 flex items-center">
              <BrandIcon color="white" />
            </div>
            <span className='self-center text-md xxs:text-lg font-semibold whitespace-nowrap dark:text-white text-white'>Team Todo App</span>
          </Link>
          <div className='flex space-x-2 items-center'>
            <p className='text-white font-semibold'>{logInData && logInData?.displayName}</p>
            {!!logInData && <button onClick={openSigOutModel} className='bg-blue-600 p-2 text-base font-semibold rounded-md text-white'>Log Out</button>}

          </div>
          {/* <a href="https://github.com/ravibpibs" target="_blank" rel="noreferrer" className="flex items-center">
            <button className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">
              Github Repo
            </button>
          </a> */}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-3 text-left shadow-xl transition-all sm:w-full sm:max-w-xs">
                  <h1 className='font-bold text-xl text-center'>Do You Want To Log Out ?</h1>
                  <div className='flex justify-evenly items-center mt-4'>

                    <button
                      type="button"
                      className="inline-flex w-fit justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-fit justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={logOut}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  )
}
export default Header