import multer from "multer"

// ! multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// ! file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb("Only .jpg and .png files are allowed", false)
    }
}

// ! upload configuration
const upload = multer({
    storage, fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
})

// ! export upload
export default upload