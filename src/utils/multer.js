// import multer
const multer = require("multer");

// // specify the storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toString() + "-" + file.originalname);
//   },
// });

// // file validation (jpg/png only)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     // orevent te upload
//     cb({ message: "Unsuported file format" }, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 },
//   fileFilter: fileFilter,
// });

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      // You can always pass an error if something goes wrong:
      cb(new Error("File does not support"), false);
      return;
    }

    // To accept the file pass `true`, like so:
    cb(null, true);
  },
});
