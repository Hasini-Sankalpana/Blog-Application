import cloudinary from "../utils/cloudinary.js";
import User from "../models/userModel.js";

export const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
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
        username,
        email,
        ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
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