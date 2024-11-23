import express from 'express';
import { deleteUser, getUserProfile, signout, test, updateProfile } from '../controllers/userController.js';
import { upload } from '../middlewares/fileUpload.js';
import { verifyToken } from '../utils/verifyUser.js';


const userRouter = express.Router();

userRouter.get('/test', test)
userRouter.put("/profile/:userId", upload.single("profilePicture"), updateProfile);
userRouter.get('/profile/:userId', getUserProfile);
userRouter.delete('/delete/:userId', verifyToken,deleteUser);
userRouter.post('/signout', signout);


export default userRouter;