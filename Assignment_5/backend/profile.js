const express = require('express')

const fileUpload = require("express-fileupload")
// const expressFileUpload = require("express-fileupload")
const path = require('path')

const assetsFolder = path.join(__dirname, "assets")

const router = express.Router()
router.use(fileUpload())

router.post('/', (req, res)=>{
    const { file_upload } = req.files
    try{
        file_upload.mv(path.join(assetsFolder, file_upload.name))
        res.status(200).json({message: 'ok'})
    }catch(e) {
        res.status(500).json({message: e.message})
    }
    
    
})

module.exports = router