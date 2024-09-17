"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const songFileController_1 = require("./controller/songFileController");
const songCRUDController_1 = require("./controller/songCRUDController");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.get("/", (req, res) => {
    res.send("Welcome to the MuseBox Backend");
});
app.post("/api/v1/uploadSong", upload.any(), songFileController_1.songUploadToS3);
app.post("/api/v1/uploadThumbnail", upload.any(), songFileController_1.thumbnailUploadToS3);
app.post("/api/v1/uploadSongData", songCRUDController_1.uploadNewSong);
app.get("/api/v1/getSongData", songCRUDController_1.getAllSongs);
app.listen(3000, () => {
    console.log("listening on port 3000");
});
