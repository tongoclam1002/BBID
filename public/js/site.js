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

    document.querySelectorAll('.link-showdhide').forEach(function (item, i) {
        item.addEventListener('click', function () {
            var next = this.parentElement.nextElementSibling;
            // this.childElement.classList.toggle('fas fa-angle-right fas fa-angle-down');
            this.querySelector('i').classList.toggle('fa-angle-right');
            this.querySelector('i').classList.toggle('fa-angle-down');
            console.log();
            next.classList.toggle('d-block');
        });
    });

};
