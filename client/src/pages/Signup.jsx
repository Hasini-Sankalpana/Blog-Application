import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { set } from 'mongoose'
import OAuth from '../components/OAuth'

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all the fields');;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

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
         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Enter your username' id='username' onChange={handleChange}/>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='Enter your email' id='email' onChange={handleChange}/>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='Enter your password' id='password' onChange={handleChange}/>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
            {
              loading ? (
                <>
              <Spinner size='sm'/>
              <span className='pl-3'>Loading...</span>
              </>
            ): 'Sign Up'
            }
        </Button>
        <OAuth/>
         </form>
         <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account</span>
          <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
         </div>
         {
         errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
         )
        }
       </div>
    </div>
    </div>
  )
}

export default Signup;