import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'> 
          <Link to="/" className="text-sm sm:text-xl font-bold dark:text-white text-4xl">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Hasi's
        </span>
        Blog
      </Link>
      <p className='text-sm mt-5'>
        You can Signup with your email and password or with Google.
      </p>
      </div>
        <div className='flex-1'>
         <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Enter your username' id='username'/>
            <Label value='Your Email'/>
            <TextInput type='text' placeholder='Enter your email' id='email'/>
            <Label value='Your Password'/>
            <TextInput type='text' placeholder='Enter your password' id='password'/>
          </div>
          <Button gradientDuoTone='purpleToPink'>
            Sign Up 
            </Button>
         </form>
         <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account</span>
          <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
         </div>
       </div>
    </div>
    </div>
  )
}

export default Signup;