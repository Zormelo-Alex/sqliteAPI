import express from "express"
const router = express.Router()
import { addPost, getPosts } from "../controllers/posts.js"
import { middleware } from "../helpers/helpers.js"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ '-' + file.originalname.slice(0, 5)+".png"
        //name of file
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage: storage })


router.get("/", middleware, getPosts)
router.post("/:uid", middleware,upload.single('image'), addPost)

export default router;