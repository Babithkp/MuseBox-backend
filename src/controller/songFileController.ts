import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
  } from "@aws-sdk/client-s3";
  import dotenv from "dotenv"
  dotenv.config()
  import { Request, Response } from "express";


  const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS_REGION and AWS_ACCESS_ KEY must be specified");
}

const s3uploadFile = async (files: any) => {
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const params = files.map((file: { originalname: any; buffer: any }) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `museBox/songs/${file.originalname}`,
        Body: file.buffer,
      };
    });
    return await Promise.all(
      params.map((param: PutObjectCommandInput) =>
        s3Client.send(new PutObjectCommand(param))
      )
    );
  };
const s3uploadImageFile = async (files: any) => {
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const params = files.map((file: { originalname: any; buffer: any }) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `museBox/thumbnails/${file.originalname}`,
        Body: file.buffer,
      };
    });
    return await Promise.all(
      params.map((param: PutObjectCommandInput) =>
        s3Client.send(new PutObjectCommand(param))
      )
    );
  };

export const songUploadToS3 = async(req:Request,res:Response) =>{
  try{
    const uploadResponse = await s3uploadFile(req.files);
    if(uploadResponse){
      console.log(uploadResponse);
      res.status(200).json({"message":"success"});
    }else{
      res.status(400).json({"message":"failed"});
    }
  }catch(e){
    console.log(e);
  }
} 
export const thumbnailUploadToS3 = async(req:Request,res:Response) =>{
  try{
    const uploadResponse = await s3uploadImageFile(req.files);
    if(uploadResponse){
      console.log(uploadResponse);
      res.status(200).json({"message":"success"});
    }else{
      res.status(400).json({"message":"failed"});
    }
  }catch(e){
    console.log(e);
  }
} 