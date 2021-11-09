import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../services/api";
import Configuration from "../services/configuration";

export default function Video() {
  const config = new Configuration();
  const api = new Api();
  const { code } = useParams();
  const [media, setMedia] = useState({
    mediaLink: "http://kci.bbid.vn/asset/video.mp4",
    height: null,
    width: null
  });

  useEffect(() => {
    api.get(config.GET_ADVERTISE_POSITION + code).then((media) => {
      setMedia(media);
      console.log(media);
    });
  }, []);


  return (
    <>
        <video
          id="video-player"
          style={{
            width: media.width? media.width+"px" : "800px",
            height: media.height? media.height+"px" : "auto",
          }}
          playsInline
          autoPlay
          muted={true}
          loop
        ><source src={media?.mediaLink} type="video/mp4"/></video>
    </>
  );
}
