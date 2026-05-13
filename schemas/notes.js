const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    category: {
      type: String,
    },

    shortDescription: {
      type: String,
    },

    content: {
      type: String,
    },

    metaTitle: {
      type: String,
    },

    metaDescription: {
      type: String,
    },

    metaKeywords: {
      type: String,
    },

    featuredImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model('notes', NotesSchema);
module.exports = Notes
