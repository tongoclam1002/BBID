document.onreadystatechange = function () {
    //Add Event onclick to video
    if (document.readyState == "complete") {
        if (document.getElementById("video-player")) {
            console.log(document.getElementById("video-player"));
            document.getElementById("video-player").addEventListener("click", (function (e) {
                document.getElementById("video-player").muted = !document.getElementById("video-player").muted;
            }));
        }
    }

};
