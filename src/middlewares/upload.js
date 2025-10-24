import multer from "multer";
import { TEMP_DIR } from "../constants/index.js";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 10 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();

  if (extension === "exe") {
    return cb(createHttpError(400, ".exe is not allow file format"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
