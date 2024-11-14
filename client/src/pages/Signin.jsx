import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/User/userSlice'

const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading, error:errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill in all fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
        You can Signin with your email and password or with Google.
      </p>
      </div>
        <div className='flex-1'>
         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='Enter your email' id='email' onChange={handleChange}/>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange}/>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
            {
              loading ? (
                <>
              <Spinner size='sm'/>
              <span className='pl-3'>Loading...</span>
              </>
            ): 'Sign In'
            }
        </Button>
         </form>
         <div className='flex gap-2 text-sm mt-5'>
          <span>Don't have an account</span>
          <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
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

export default Signin;