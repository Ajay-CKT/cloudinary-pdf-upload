const express = require("express");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.Router());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/api/upload", async (request, response) => {
  try {
    await cloudinary.uploader.upload(
      "./public/sample.pdf",
      {
        asset_folder: process.env.CLOUDINARY_ASSET_FOLDER,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        // if needed or specify those in upload preset
        access_mode: "public",
        resource_type: "raw",
        use_filename: true,
        use_asset_folder_as_public_id_prefix: true,
        use_filename_as_display_name: true,
      },
      (error, result) => console.log(result.secure_url)
    );
    response.status(200).json({ message: "Uploaded" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => console.log("Server running..."));
