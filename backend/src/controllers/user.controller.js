import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, role, password } = req.body;
    if (!fullName || !email || !phoneNumber || !role || !password) {
      return res.status(400).json({
        message: "All fields are require",
        success: false,
      });
    }

    const fileUri = getDataUri(req.file);
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      "profile.profilePhoto" : cloudinaryResponse.secure_url
    });

    return res.status(200).json({
      message: "User registered succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are require",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesnt exist with current role",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User login succesful",
        user,
        success: true,
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.user;
    
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const updateFields = {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
      ...(bio && { "profile.bio": bio }),
      ...(skills && {
        "profile.skills": skills.split(",").map((skill) => skill.trim()),
      }),
    };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);

      if (cloudinaryResponse) {
        updateFields["profile.resume"] = cloudinaryResponse.secure_url;
        updateFields["profile.resumeOriginalName"] = req.file.originalname;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateFields,
      },
      { new: true }
    ).select("-password");

    await updatedUser.save()

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
