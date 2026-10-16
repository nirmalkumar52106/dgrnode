const mongoose = require("mongoose");

const whatsappLogSchema = new mongoose.Schema(
  {
    enquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "enquiry",
      required: true,
      index: true,
    },

    name: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      index: true,
    },

    campaignId: {
      type: String,
      default: null,
      index: true,
    },

    providerMessageId: {
      type: String,
      default: null,
    },

    errorMessage: {
      type: String,
      default: "",
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const WaLogmodel = mongoose.model("WhatsAppLog", whatsappLogSchema);
module.exports = WaLogmodel