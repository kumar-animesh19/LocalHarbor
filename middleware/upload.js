const multer = require('multer')

const Storage = multer.diskStorage({
    destination: './src/uploads',
    filename: (req, file, cb) => {
      cb(null,Date.now()+file.originalname);
    },
});

const upload = multer({ 
      storage: Storage,
      fileFilter:(req, file, cb)=>{
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif'){
            cb(null, true)
        }
        else{
          req.filevalidationerror = "forbidden extension";
          return cb(null, false, req.filevalidationerror);
        }
      }
});

module.exports = upload