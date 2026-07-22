const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Student image is required"],
    },

    imagePublicId: {
      type: String,
      required: [true, "Image public ID is required"],
    },

    package: {
      type: String,
      required: [true, "Package is required"],
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    batch: {
      type: String,
      required: [true, "Batch is required"],
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    achievement: {
      type: String,
      required: [true, "Achievement is required"],
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Placement = mongoose.model(
  "Placement",
  placementSchema
);

module.exports = Placement