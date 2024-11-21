import express from 'express';
import { getUserProfile, test, updateProfile } from '../controllers/userController.js';
import { upload } from '../middlewares/fileUpload.js';

const userRouter = express.Router();

userRouter.get('/test', test)
userRouter.put("/profile/:userId", upload.single("profilePicture"), updateProfile);
userRouter.get('/profile/:userId', getUserProfile);

export default userRouter;