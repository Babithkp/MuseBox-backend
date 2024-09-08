import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const uploadNewSong = async (req: any, res: any) => {
  const songData = await req.body;
  if (!songData) res.status(400).json({ message: "No data found" });
  console.log(songData);
  
  try {
    const songs = await prisma.song.create({
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
    if(songs) res.status(200).json({ message: "success" });
    else res.status(401).json({ message: "failed to upload" });
  } catch (e) {
    console.log(e);
  }
};

export const getAllSongs = async (req: any, res: any) => {
  try {
    const songs = await prisma.song.findMany();
    if(songs){
      res.status(200).json({ message: "success", data: songs });
    }else{
      res.status(401).json({ message: "failed to upload" });
    }
  } catch (e) {
    console.log(e);
  }
}