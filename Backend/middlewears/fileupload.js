import multer from "multer";

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/vnd.ms-excel' || // For older Excel files (xls)
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // For newer Excel files (xlsx)
    ) {
        cb(null, true);
    } else {
        cb("Please upload only Excel ", false);
    }
};

const storage = multer.diskStorage({
    destination(req, file, callback) {
        if (
            file.mimetype === 'application/vnd.ms-excel' || // For older Excel files (xls)
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // For newer Excel files (xlsx)
        ) {
            // Save Excel files in the excel folder
            callback(null, '../backend/public');
        } else {
            // Reject unsupported file types
            callback("Unsupported file type", null);
        }
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadFile = multer({ storage, fileFilter, limits: { fileSize: 100 * 1024 * 1024 } });

export default uploadFile;
