import React from 'react'

const FormErrorMessage = ({
  error,
  touched,
}) => {
  if (!error || !touched) {
    return <></>
  }

  return (
    <div className=''>
      {error && touched && typeof error === 'string' && (
        <div role="alert" className="text-red-500">
          {error}
        </div>
      )}
    </div>
  )
}
export default FormErrorMessage
