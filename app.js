const express = require("express");
const itags = require("./constants/itags");
const cors = require("cors");
const ytdl = require("ytdl-core");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get('/',(req,res)=>{
  res.send("Youtube downloader api works!!!!")
})

app.get("/getInfo", (req, res) => {
  let { url } = req.query;
  console.log(url);
  let id = ytdl.getURLVideoID(url);
  ytdl.getInfo(id, (err, info) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      let audioandvideo = ytdl.filterFormats(info.formats, "audioandvideo");
      let videoonly = ytdl.filterFormats(info.formats, "videoonly");
      let video = ytdl.filterFormats(info.formats, "video");
      let audioonly = ytdl.filterFormats(info.formats, "audioonly");

      let thumbnailList = info.videoDetails.thumbnail;

      if (
        thumbnailList &&
        thumbnailList.thumbnails &&
        Array.isArray(thumbnailList.thumbnails)
      ) {
        thumbnailList =
          thumbnailList.thumbnails[thumbnailList.thumbnails.length - 1];
      }

      video = video.filter((video) => {
        if (video.container == "mp4" && itags.includes(video.itag))
          return video;
      });

      let data = {
        audioandvideo,
        videoonly,
        audioonly,
        video,
        title: info.videoDetails.title,
        thumbnail: thumbnailList,
      };
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
});

app.get("/downloadVideo", async (req, res) => {

  let videoURL = req.query.url;

  let itag = req.query.itag;

  let id = ytdl.getURLVideoID(videoURL);

  let info = await ytdl.getInfo(id);
  let videoFormat = ytdl.chooseFormat(info.formats, { quality: String(itag) });

  res.setHeader("Content-Type", "video/mp4");
  res.header(
    "Content-Disposition",
    `attachment; filename="${info.videoDetails.title}.mp4"`
  );
  ytdl(videoURL, {
    format: videoFormat,
  }).pipe(res);
});

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
