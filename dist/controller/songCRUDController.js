"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSongs = exports.uploadNewSong = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const uploadNewSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songData = yield req.body;
    if (!songData)
        res.status(400).json({ message: "No data found" });
    console.log(songData);
    try {
        const songs = yield prisma.song.create({
            data: {
                name: songData.songName,
                artist: songData.artist,
                album: songData.albumName,
                audioType: songData.audioType,
                language: songData.language,
                duration: songData.duration,
                releaseDate: songData.releaseDate,
                thunbnailUrl: songData.thunbnailUrl,
                songUrl: songData.songUrl,
            },
        });
        if (songs)
            res.status(200).json({ message: "success" });
        else
            res.status(401).json({ message: "failed to upload" });
    }
    catch (e) {
        console.log(e);
    }
});
exports.uploadNewSong = uploadNewSong;
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield prisma.song.findMany();
        if (songs) {
            res.status(200).json({ message: "success", data: songs });
        }
        else {
            res.status(401).json({ message: "failed to upload" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.getAllSongs = getAllSongs;
