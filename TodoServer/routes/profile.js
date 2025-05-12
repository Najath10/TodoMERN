const multer = require("multer");
const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null ,"public/images");
    },
    filename: function(req,file, cb){
        const uniqueSuffix = uuidv4() + "-" + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split(".").pop();
        cb(null,file.fieldname + "-" + uniqueSuffix + "." + extension) 
    }
})

const upload = multer({ storage : storage})


router.get('/',(req,res)=>{
    res.json({
        message:"public/images/uploadfile-8f0ef166-db88-49af-8555-21b377621b00-967552108.jpeg"
    })
});

router.post("/upload",upload.single("upload_file"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.json({
        message:"image uploaded"
    });
})



module.exports = router;