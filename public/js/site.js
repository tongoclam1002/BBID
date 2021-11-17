document.onreadystatechange = function () {
    //Add Event onclick to video
    if (document.readyState == "complete") {
        if (document.getElementById("video-player")) {
            document.getElementById("video-player").addEventListener("click", (function (e) {
                document.getElementById("video-player").muted = !document.getElementById("video-player").muted;
            }));
        };
    }

};
// window.onscroll = function () {
//     if (document.getElementById("checkout-info")) {
//         let container = document.getElementById("main-content");
//         let checkoutInfo = document.getElementById("checkout-info");
//         checkoutInfo.style.cssText += 'position:sticky;height:100%;top:' + (container.offsetTop + 16) + 'px;';
//     }
// };

