
import cloudinary from "../lib/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = "connectin";
        if (file.fieldname === "profileImage") folder = "profiles";
        if (file.fieldname === "postImages") folder = "posts";
        if (file.fieldname === "documents") folder = "documents";

        return {
            folder,
            allowedFormats: ["jpg", "jpeg", "png", "pdf", "docx"]
        };
    }
});

const upload = multer({storage})

export default upload