import express  from "express";
import cors from "cors"
import multer from "multer";

import { songUploadToS3, thumbnailUploadToS3 } from "./controller/songFileController";
import { getAllSongs, uploadNewSong } from "./controller/songCRUDController";


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });



app.get("/",(req, res) => {
    res.send("Welcome to the Google")
})


app.post("/api/v1/uploadSong",upload.any(),songUploadToS3)
app.post("/api/v1/uploadThumbnail",upload.any(),thumbnailUploadToS3)

app.post("/api/v1/uploadSongData",uploadNewSong)
app.get("/api/v1/getSongData",getAllSongs)



app.listen(3000,()=>{
    console.log("listening on port 3000");
})