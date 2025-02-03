const express = require('express')
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null,'D:/Important/Computer Science/Semester/Mobile Developement/e-shop/server/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now()+"_"+file.originalname)
    }
})

const upload = multer({storage});

router.post('/', upload.single('file', (req, res) => {
    try {
        if(!req.file)
            return res.status(200).send({msg: "No File Uploaded"})
        
        res.status(200).send({msg: 'File successfully uploaded', filename:req.file.filename})
    }
    catch(err) {
        res.status(500).send({msg: 'Error uploading file'});
    }
    
}))

module.exports=router