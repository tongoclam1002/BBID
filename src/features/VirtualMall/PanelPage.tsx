import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../app/api/api";

export default function Video() {
  const videoExtension = ["WEBM", "MPG", "MP2", "MPEG", "MPE", "MPV", "OGG", "MP4", "M4P", "M4V", "AVI", "WMV", "MOV", "QT", "FLV", "SWF", "AVCHD"];
  // const imageExtension = ["JPG", "JPEG", "PNG", "GIF"]
  const { code }: any = useParams();
  const [media, setMedia] = useState({
    mediaLink: "http://kci.bbid.vn/asset/video.mp4",
    height: null,
    width: null
  });
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    api.Advertisement.details(code).then((response) => {
      setMedia(response.data);
      setFileType(media.mediaLink.split('.').pop());
    });
  }, [code, media.mediaLink]);

  return (
    <>{videoExtension.indexOf(fileType?.toUpperCase()) > -1 ?
      <video
        id="video-player"
        style={{
          width: media.width ? media.width + "px" : "800px",
          height: media.height ? media.height + "px" : "auto",
        }}
        playsInline
        autoPlay
        muted={true}
        loop
      ><source src={media?.mediaLink} type="video/mp4" />
      </video> :
      <img id="image-player" style={{
        width: media.width ? media.width + "px" : "800px",
        height: media.height ? media.height + "px" : "auto",
      }}
        src={media?.mediaLink}
        alt="Panel" />}
    </>
  );
}
