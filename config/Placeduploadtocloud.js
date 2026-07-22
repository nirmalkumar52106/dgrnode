const Cloudinary = require("./cloud");
const streamifier = require("streamifier");

const PlaceduploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = Cloudinary.uploader.upload_stream(
      {
        folder: "PlacedStudents",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = PlaceduploadToCloudinary;