import cloudinary from "../utils/cloudinary.js";
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email,password  } = req.body;

  try {

    if (password) {
      if (password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    // Validate username
    if (username) {
      if (username.length < 5 || username.length > 20) {
        return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
      }
      if (username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
    }

    let profilePictureUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "images",
      });
      profilePictureUrl = result.secure_url; // Get the Cloudinary URL
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(username && { username }),
        ...(email && { email }),
        ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
        ...(password && { password: req.body.password }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};



export const test = (req,res) => {
    res.json({message:'API working !'});
};

export const deleteUser = async(req,res,next) => {
  if (req.user.id !== req.params.userId) {
    return next (errorHandler(403,'You are not allowedto delete this user !'))
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({message:'User deleted successfully !'});
  } catch (error) {
    next(error);
  }
}