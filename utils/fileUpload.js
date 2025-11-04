const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'public/uploads/');
  },
  filename: (req,file,cb)=>{
    const uniqueName = Date.now()+'-'+file.originalname;
    cb(null,uniqueName);
  }
});

const fileFilter = (req,file,cb)=>{
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

module.exports = upload;