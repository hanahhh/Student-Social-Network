import multer from "multer";

const fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error(
        `You have sent ${file.mimetype} file. Accept jpeg and png only.`
      ),
      false
    );
  }
};

const userAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/user-avatar");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "_" +
        uniqueSuffix +
        file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});
const postImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/post-image");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "_" +
        uniqueSuffix +
        file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});
export const avatarStore = multer({
  storage: userAvatar,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});
export const postStore = multer({
  storage: postImage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});
