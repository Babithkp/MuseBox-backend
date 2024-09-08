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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnailUploadToS3 = exports.songUploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("AWS_REGION and AWS_ACCESS_ KEY must be specified");
}
const s3uploadFile = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const s3Client = new client_s3_1.S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `museBox/songs/${file.originalname}`,
            Body: file.buffer,
        };
    });
    return yield Promise.all(params.map((param) => s3Client.send(new client_s3_1.PutObjectCommand(param))));
});
const s3uploadImageFile = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const s3Client = new client_s3_1.S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `museBox/thumbnails/${file.originalname}`,
            Body: file.buffer,
        };
    });
    return yield Promise.all(params.map((param) => s3Client.send(new client_s3_1.PutObjectCommand(param))));
});
const songUploadToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResponse = yield s3uploadFile(req.files);
        if (uploadResponse) {
            console.log(uploadResponse);
            res.status(200).json({ "message": "success" });
        }
        else {
            res.status(400).json({ "message": "failed" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.songUploadToS3 = songUploadToS3;
const thumbnailUploadToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResponse = yield s3uploadImageFile(req.files);
        if (uploadResponse) {
            console.log(uploadResponse);
            res.status(200).json({ "message": "success" });
        }
        else {
            res.status(400).json({ "message": "failed" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.thumbnailUploadToS3 = thumbnailUploadToS3;
