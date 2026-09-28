const Cloudinary = require("./cloud");
const streamifier = require("streamifier");

const StudentuploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = Cloudinary.uploader.upload_stream(
      {
        folder: "JDBStudents",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        } 
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = StudentuploadToCloudinary;