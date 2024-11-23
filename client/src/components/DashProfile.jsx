import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import axios from 'axios';
import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteUserSuccess, deleteUserStart,deleteUserFailure,signInSuccess,signoutSuccess } from '../redux/User/userSlice';

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser,error  } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.profilePicture || null);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Uploading state
  const filePickerRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/profile/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const userData = response.data;
      dispatch(signInSuccess(userData));

      setUsername(userData.username);
      setEmail(userData.email);
      setImageFileUrl(userData.profilePicture);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    setIsUpdating(true); 
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (password) formData.append('password', password);
  
    // Check if a new image is being uploaded
    const isImageUpload = !!imageFile;
    if (isImageUpload) {
      formData.append('profilePicture', imageFile);
      setIsUploadingImage(true); // Trigger the progress bar
      setUploadProgress(0); // Reset progress
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/profile/${currentUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          onUploadProgress: isImageUpload
            ? (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted); // Update progress bar only for image upload
              }
            : null, // No upload progress tracking if no image
        }
      );
  
      // Update Redux and local state
      dispatch(signInSuccess(response.data.user));
      setUsername(response.data.user.username);
      setEmail(response.data.user.email);
      setPassword(''); 

      setImageFileUrl(response.data.user.profilePicture);
     
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setIsUpdating(false);
      if (isImageUpload) setIsUploadingImage(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUsername((prev) => prev || currentUser.username);
      setEmail((prev) => prev || currentUser.email);
      setImageFileUrl((prev) => prev || currentUser.profilePicture);
    }
  }, [currentUser]);

  
  const handleSignOut = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/signout', {
        method: 'POST',
      });
     const data = await res.json();
     if (!res.ok){
      console.log(data.message)
     }else{
         dispatch(signoutSuccess());
     }
    }catch (error) {
      console.error(error.message);
    }
  }
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
  className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
  onClick={() => filePickerRef.current.click()}
>
  <img
    src={imageFileUrl || '/default-profile.png'}
    alt="user"
    className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
  />
  {isUploadingImage && (
    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <CircularProgressbar
        value={uploadProgress}
        text={`${uploadProgress}%`}
        styles={{
          path: { stroke: `rgba(62, 152, 199, ${uploadProgress / 100})` },
          text: { fill: '#fff', fontSize: '16px' },
        }}
      />
    </div>
  )}
</div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <TextInput 
         type='password'
        id='password' 
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
         />


        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
  <span className="cursor-pointer" onClick={() => setShowModal(true)}>Delete Account</span>
  <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
</div>
{error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
