var userFeed = new Instafeed({
    accessToken: InstagramToken,
    limit: 25,
    sortBy: 'most-recent',
    template: '<a class="slide" href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
    elementId: 'instafeed',
    mediaTypes: [
        'IMAGE',
        'CAROUSEL_ALBUM'
        //VIDEO,
    ],
    carousel: 'first', //'all' or 'first'
    DEBUG: false, //false or true
});
userFeed.Run();


window.addEventListener("resize", instafeed);

function instafeed() {
    var width = document.body.offsetWidth;
    var imgs = document.querySelector("#instafeed").childNodes;
    var div = document.querySelector("#instafeed");
    div.style.margin = "0px";
    div.style.width = width + "px";
    div.style.marginLeft =  "-" + div.getBoundingClientRect().left + "px";
    if (width < 500) {
        for (var index in imgs) {
            try {
                if (index < 8) {
                    imgs[index].style.display = "block";
                    imgs[index].style.width = width/4 + "px";
                    imgs[index].style.height = width/4 + "px";
                }
                else {
                    imgs[index].style.display = "none";
                }
            }
            catch (e){
                
            }
        }
    }
    else if (width < 1000) {
        for (var index in imgs) {
            try {
                if (index < 10) {
                    imgs[index].style.display = "block";
                    imgs[index].style.width = width / 5 + "px";
                    imgs[index].style.height = width / 5 + "px";
                } else {
                    imgs[index].style.display = "none";
                }
            }
            catch (e) {
                
            }
        }
    }
    else if (width < 1500) {
        for (var index in imgs) {
            try {
                if (index < 12) {
                    imgs[index].style.display = "block";
                    imgs[index].style.width = width/6 + "px";
                    imgs[index].style.height = width/6 + "px";
                }
                else {
                    imgs[index].style.display = "none";
                }
            }
            catch (e) {

            }
        }
    }
    else {
        for (var index in imgs) {
            try {
                if (index < 14) {
                    imgs[index].style.display = "block";
                    imgs[index].style.width = width / 7 + "px";
                    imgs[index].style.height = width / 7 + "px";
                } else {
                    imgs[index].style.display = "none";
                }
            }
            catch (e) {
                
            }
        }
    }
}