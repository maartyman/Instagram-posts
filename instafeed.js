class Instafeed{
    constructor(settings_JSON) {
        this.settings = settings_JSON;
        this.data = [];
        this.useable_data = [];
        if(!(this.limit = settings_JSON.limit))this.limit = 25;
        if(!(this.sortBy = settings_JSON.sortBy))this.sortBy = 'most-recent';
        if(!(this.template = settings_JSON.template))this.template = '<a class="slide" href="{{link}}" target="_blank"><img src="{{image}}" /><p>{{caption}}</p><p>{{timestamp}}</p><p>{{media_type}}</p></a>';
        if(!(this.elementId = document.getElementById(settings_JSON.elementId)))this.elementId = document.getElementById('instafeed');
        if(!(this.accessToken = settings_JSON.accessToken))this.accessToken = InstagramToken;
        if(!(this.mediaTypes = settings_JSON.mediaTypes))this.mediaTypes = ['IMAGE'];
        if(!(this.carousel = settings_JSON.carousel))this.carousel = 'first';
        if(!(this.DEBUG = settings_JSON.DEBUG))this.DEBUG = false;
        this.afterloadfunction = settings_JSON.afterloadfunction;
        /*
        limit: 21,
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        accessToken: InstagramToken,
        template: '<a class="slide" href="{{link}}" target="_blank"><div><img src="{{image}}" /></div></a>'
        */
    }

    Run(){
        var instafeed = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                if(this.status != 200){
                    if(instafeed.DEBUG)alert(response);
                }
                else {
                    instafeed.username = response.username;
                    instafeed.id = response.id;
                    instafeed.DrawData();
                }
            }
        };
        xhttp.open("GET", "https://graph.instagram.com/me?fields=username,media_count,id&access_token=" + this.accessToken, true);
        xhttp.send();
    }

    GetData(url){
        var instafeed = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                if(this.status != 200){
                    if(instafeed.DEBUG)alert(response);
                }
                else {
                    instafeed.data = [...instafeed.data, ...response.data];
                    instafeed.next = response.paging.next;
                }
            }
        };
        xhttp.open("GET", url, false);
        xhttp.send();
    }

    GetCarouselData(url){
        var instafeed = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                if(this.status != 200){
                    if(instafeed.DEBUG)alert(response);
                }
                else {
                    instafeed.temp_data = response.data;
                }
            }
        };
        xhttp.open("GET", url, false);
        xhttp.send();
    }

    DrawData(){
        this.GetData("https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,caption,permalink,thumbnail_url&access_token=" + this.accessToken);
        var i = 0;
        while(this.useable_data.length != this.limit) {
            if (this.mediaTypes.includes(this.data[i].media_type)){
                if(this.carousel == 'all' && this.data[i].media_type == 'CAROUSEL_ALBUM'){
                    this.GetCarouselData('https://graph.instagram.com/' + this.data[i].id + '/children?fields=id,media_url&access_token=' + this.accessToken);
                    for (var temp_dat of this.temp_data) {
                        if (this.useable_data.length == this.limit) {
                            break;
                        }
                        temp_dat.timestamp = this.data[i].timestamp;
                        temp_dat.media_type = this.data[i].media_type;
                        temp_dat.caption = this.data[i].caption;
                        this.useable_data.push(temp_dat);
                    }
                }
                else {
                    this.useable_data.push(this.data[i]);
                }
            }
            if (i == (this.data.length - 1)){
                this.GetData(this.next);
            }
            i++;
        }
        for (var data_element of this.useable_data) {
            var html = this.template;
            html = html.replaceAll("{{image}}",data_element.media_url);
            html = html.replaceAll("{{link}}",data_element.permalink);
            html = html.replaceAll("{{time}}",data_element.timestamp);
            html = html.replaceAll("{{type}}",data_element.media_type);
            html = html.replaceAll("{{caption}}",data_element.caption);
            this.elementId.innerHTML += html;
        }
        instafeed();
    }
}