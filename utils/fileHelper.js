const fs = require('fs').promises;
const path = require('path');


const deleteImage = async (imagePath) => {
  if (!imagePath || imagePath.trim() === '') {
    return;
  }
  // fetching the filename from the path
  // photoPath might be: '/uploads/1762288272653-house.jpg'
  // We need: '1762288272653-house.jpg'
  const filename = path.basename(imagePath);

  const fullPath = path.join('public','uploads', filename);

  try{
    await fs.access(fullPath);
    await fs.unlink(fullPath);
    console.log("Deleted image:", fullPath);
  }
  catch{
    if(error.code === 'ENOENT'){
      console.log("Image file not found, cannot delete:", fullPath);
    } else {
      console.log("Error deleting image file:", error);
    }
  }
};

module.exports = deleteImage;