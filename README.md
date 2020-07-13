# yt_downloader_backend

This project provide api service to download youtube video, audio and playlist.

## Installation
 
### Run below commands
1. git bash <strong>git bash https://github.com/hemantnigam/yt_downloader_backend.git</strong>
2. run <strong>npm install</strong>
3. run <strong>npm start</strong>

## API Endpoints

### GET /getInfo
This endpoint will provide video information in json format.
##### query params 
{
 url: String
}


### GET /playlistInfo
This endpoint will provide playlist information in json format.
##### query params 
{
 playListID: String
}


### GET /downloadVideo
This endpoint will download video.
##### query params 
{
 url: String
 itag: String(quality label)
}


### GET /downloadAudio
This endpoint will download audio for a youtube video.
##### query params 
{
 url: String
}
