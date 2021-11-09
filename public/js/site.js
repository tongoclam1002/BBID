$(document).ready(function () {

    $('.link-showdhide').click(function (event) {
        console.log('document ready');
        event.preventDefault();
        $(this).parent().next('.box-display').slideToggle();
        $("i", this).toggleClass("fas fa-angle-right fas fa-angle-down");
    })
    document.getElementById("video-player").addEventListener("click", (function (e) {
        document.getElementById("video-player").muted = !document.getElementById("video-player").muted;
    }));
});
