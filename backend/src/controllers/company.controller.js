import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }
    const company = await Company.create({
      name,
      userId: req.user,
    });

    return res.status(201).json({
      message: "Company created succesfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.user;
    // console.log(userId);
    const companies = await Company.find({userId});
    if (!companies) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(website && { website }),
      ...(location && { location }),
    };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);

      if (cloudinaryResponse) {
        updateFields.logo = cloudinaryResponse.secure_url;
      }
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
