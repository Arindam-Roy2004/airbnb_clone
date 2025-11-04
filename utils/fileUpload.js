const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req,res,next)=>{
    cb(null,'public/uploads/');
  },
  filename: (req,res,next)=>{
    const uniqueName = Date.now()+'-'+file.originalname;
    cb(null,uniqueName);
  }
});