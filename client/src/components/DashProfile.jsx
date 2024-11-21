import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { signInSuccess } from '../redux/User/userSlice';

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.profilePicture || null);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Uploading state
  const filePickerRef = useRef();

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
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
