//*
let _json;

fetch("./contents.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        _json = data
        console.log(_json)
    })
    .catch((e) => {
        document.body.innerHTML = `
            <h1>Error loading the page!</h1>
            <p>Couldn't load contents.json!</p>
            <p>Error message: ${e.message}</p>
            <p>Please refresh the page! If you're the one making the page, please verify if the JSON is valid or exists!</p>
        `
    })
// */


let containers = {
    header : document.querySelector("header"),
    header_buttons: document.getElementsByClassName("header-nav"),
    aboutme : document.getElementById("text_container_overall"),
    socials : document.getElementsByClassName("socials-box")[0],
    stack : document.getElementsByClassName("stack-boxes")[0],
    creations : document.getElementById("creations").children[0],
    likes : document.getElementsByClassName("likes-boxes")[0],
    need2know : document.getElementById("need2know").children[0].children[0],
    dreams : document.getElementById("dreams").children[0].children[0],
    flags : document.getElementsByClassName("flags-box")[0]
}

let socials_samples = {
    "Youtube": "<a href=\"$SOURCE\" class=\"social-button\" id=\"youtube_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473495/youtube.svg\"><span class=\"social-label\">YouTube</span></a>",
    "Tiktok": "<a href=\"$SOURCE\" class=\"social-button\" id=\"tiktok_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473806/tiktok.svg\"><span class=\"social-label\">TikTok</span></a>",
    "Instagram": "<a href=\"$SOURCE\" class=\"social-button\" id=\"instagram_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473664/instagram.svg\"><span class=\"social-label\">Instagram</span></a>",
    "Facebook": "<a href=\"$SOURCE\" class=\"social-button\" id=\"facebook_card\" style=\"\n    display: none;\n\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473600/facebook.svg\"><span class=\"social-label\">Facebook</span></a>",
    "Gmail": "<a href=\"$SOURCE\" class=\"social-button\" id=\"gmail_card\" style=\"\n    background: #ff0000a0;\n\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473621/gmail.svg\"><span class=\"social-label\">Gmail</span></a>",
    "Linkedin": "<a href=\"$SOURCE\" class=\"social-button\" id=\"linkedin_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473701/linkedin.svg\"><span class=\"social-label\">Linkedin</span></a>",
    "Playstation": "<a href=\"$SOURCE\" class=\"social-button\" id=\"playstation_card\" style=\"\n    background: linear-gradient(45deg, #0074c5a0, #000a29a0);\n\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473754/playstation.svg\"><span class=\"social-label\">PlayStation</span></a>",
    "Spotify": "<a href=\"$SOURCE\" class=\"social-button\" id=\"spotify_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473795/spotify.svg\"><span class=\"social-label\">Spotify</span></a>",
    "Nintendo": "<a href=\"$SOURCE\" class=\"social-button\" id=\"nintendo_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/342069/nintendo-switch.svg\"><span class=\"social-label\">Nintendo\n</span></a>",
    "Github": "<a href=\"$SOURCE\" class=\"social-button\" id=\"github_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473620/github.svg\"><span class=\"social-label\">GitHub</span></a>",
    "Twitch": "<a href=\"$SOURCE\" class=\"social-button\" id=\"twitch_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473814/twitch.svg\"><span class=\"social-label\">Twitch</span></a>",
    "Discord": "<a href=\"$SOURCE\" class=\"social-button\" id=\"discord_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473585/discord.svg\"><span class=\"social-label\">Discord</span></a>",
    "Roblox": "<a href=\"$SOURCE\" class=\"social-button\" id=\"roblox_card\"><svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0.16 0 23.68 24\"><path fill=\"white\" d=\"M5.164 0L.16 18.928L18.836 24L23.84 5.072Zm8.747 15.354l-5.219-1.417l1.399-5.29l5.22 1.418l-1.4 5.29z\"></path></svg><span class=\"social-label\">Roblox</span></a>",
    "Xbox": "<a href=\"$SOURCE\" class=\"social-button\" id=\"xbox_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473838/xbox.svg\"><span class=\"social-label\">Xbox</span></a>",
    "Steam": "<a href=\"$SOURCE\" class=\"social-button\" id=\"steam_card\"><img class=\"social-icon\" src=\"https://www.svgrepo.com/show/473800/steam.svg\"><span class=\"social-label\">Steam</span></a>",
    "NameMC": "<a href=\"$SOURCE\" class=\"social-button\" id=\"namemc_card\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0 0 24 24\"><path fill=\"white\" d=\"M0 0v24h24V0Zm4.8 4.8H16V8h3.2v11.2H16V8H8v11.2H4.8V8Z\"></path></svg><span class=\"social-label\">NameMC</span></a>",
    "X": "<a href=\"$SOURCE\" class=\"social-button\" id=\"x_card\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0 0 130 130\"><path d=\"M100.9,6.2h19.6l-42.8,48.9,50.4,66.6h-39.4l-30.9-40.4-35.3,40.4H2.8l45.8-52.3L.2,6.2h40.4l27.9,36.9L100.9,6.2ZM94,110h10.9L34.8,17.3h-11.7l70.9,92.7Z\" fill=\"white\"></path>\n</svg><span class=\"social-label\">X</span></a>",
    "unknown": `<a href="$SOURCE" class="social-button" id="$ID"><img class="social-icon" src="https://www.svgrepo.com/show/509124/globe.svg"><span class="social-label">$NAME</span></a>`
}

let samples = {
    flag : `<img class="flag" src="$SOURCE"></img>`,
    
    card : `<div class="stack-box $COLOR">
                            <p class="stack-box-title">$TITLE</p>
                            $CONTENT
                        </div>`,
    card_content : `<p class="stack-box-content">$CONTENT</p>`,


    creation : `<div class="creation-sample">
        <img src="$SOURCE_IMG" class="creations-img">
        $MEDIA
        <span class="creation-label">$NAME $LINK
        </span>
    <span class="date">$DATE</span></div>`,
    creation_media : `<video controls="auto" name="media" class="music-preview" loop="">
    <source src="$SOURCE" type="audio/ogg">
    </video>`,
    creation_link : `- 
            <a class="white-link" href="$LINK">Link</a>`,
    creation_div : `<div class="creations-div">
                    <h2>$TITLE</h2>
                    <div class="creations-box">
                        $CREATIONS
                    </div><a href="$SEEMORE" class="a-button">See More</a>
                    </div>`,
    header_button: `<a href="$LINK" class="header-a">$NAME</a>`,
}

let colors = ["purplish","greenish","bluish","redish","goldish","orangish","cyanish"]

function elementFromXml(xml_string){
    var ret = document.createElement("base")
    ret.innerHTML = xml_string
    return ret.firstChild
}

function idToString(id){
    a = id.replaceAll("_card"," ").split("_");
     for(i in a){
        a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1)
    }; 
    a = a.join(" ")

}
/* 
*
*       Headers
*        
*/
document.title = _json.name + "'s Bio"
containers.header.children[0].children[0].innerText = _json.name + "'s Bio"
let meta = {}

meta.title = document.createElement("meta")
meta.title.setAttribute("property","og:title")
meta.title.setAttribute("content",_json.name + "s Bio")
document.head.appendChild(meta.title)

meta.name = document.createElement("meta")
meta.name.setAttribute("property","og:site_name")
meta.name.setAttribute("content",_json.name + "s Bio")
document.head.appendChild(meta.name)

containers.header_buttons.innerHTML = ""
for(i of _json.header_buttons){
    containers.header_buttons.appendChild(elementFromXml(samples.header_button.replaceAll("$LINK",i.adress).replaceAll("$NAME",i.name) ))
}

/* 
*
*       About me
*        
*/
containers.aboutme.innerHTML = "<h1>About Me:</h1>"
for(i of _json.sections.about_me){
    var p = document.createElement("p")
    p.innerText = i
    containers.aboutme.appendChild(p)
}
containers.flags.innerHTML = ""
for(i of _json.sections.flags){
    containers.flags.appendChild(elementFromXml(samples.flag.replaceAll("$SOURCE",i)))
}


/* 
*
*       Socials
*        
*/
containers.socials.innerHTML=""
if (_json.sections.socials){
    for(i of _json.sections.socials){
        if (typeof i === "object"){
            if(typeof i.name === "string"){
                if(typeof socials_samples[i.name] === "string"){
                    containers.socials.appendChild(elementFromXml(socials_samples[i.name].replaceAll("$SOURCE",i.link)))
                } else {
                    containers.socials.appendChild(elementFromXml(socials_samples["unknown"].replaceAll("$SOURCE",i.link).replaceAll("$ID",i.name.toLowerCase().replaceAll(" ","_")).replaceAll("$NAME",i.name) ) )
                }
            }
        }
    }
} else {
    document.getElementById("socials").remove()
}
/* 
*
*       Stack
*        
*/
var minitrack = 0
containers.stack.innerHTML = ""
if(_json.sections.stack){
    for(i of _json.sections.stack){
        if (typeof i === "object"){
            var mini = samples.card.replaceAll("$TITLE",i.name)
            var mini2 = ""
            for(j of i.contents){
                mini2+=samples.card_content.replaceAll("$CONTENT",j)
            }

            mini = mini.replaceAll("$CONTENT",mini2).replaceAll("$COLOR",colors[minitrack%colors.length])
            minitrack++
            var _card = elementFromXml(mini)
            containers.stack.appendChild(_card)
        }
    }
} else {
    document.getElementById("stack").remove()
}
/* 
*
*       Creations
*        
*/
// fuuuck this one will be hard 😭😭 ;-;
containers.creations.innerHTML = ""

if(_json.sections.creations){
    for(i of _json.sections.creations){
        if (typeof i === "object"){
            var aaa = samples.creation_div.replaceAll("$TITLE",i.name).replaceAll("$SEEMORE",i.see_more)

            // if else statements bad
            // use (true)?true:false please
            var creations = []
            for(j of i.contents){
                creations[creations.length]  = samples.creation.replaceAll("$SOURCE_IMG",j.adress)
                .replaceAll("$NAME",
                    (typeof j.name === "string")?j.name:"")
                .replaceAll("$DATE",
                    (typeof j.date === "string")?j.date:"")
                .replaceAll("$LINK",(typeof j.link === "string")?
                    samples.creation_link.replaceAll("$LINK",j.link):"")
                .replaceAll("$MEDIA",(typeof j.media === "string")?
                    samples.creation_media.replaceAll("$SOURCE",j.media):"")
            }
            creations = creations.join("\n")

            aaa = aaa.replaceAll("$CREATIONS",creations)
            containers.creations.appendChild(elementFromXml(aaa))
        }
    }
    
} else {
    document.getElementById("creations").remove()
}
// well, wasn't that hard lol

/* 
*
*       Likes
*        
*/
// yes, this was cloned from stack
var minitrack = 0
containers.likes.innerHTML = ""

if(_json.sections.likes){
    for(i of _json.sections.likes){
        if (typeof i === "object"){
            var mini = samples.card.replaceAll("$TITLE",i.name)
            var mini2 = ""
            for(j of i.contents){
                mini2+=samples.card_content.replaceAll("$CONTENT",j)
            }

            mini = mini.replaceAll("$CONTENT",mini2).replaceAll("$COLOR",colors[minitrack%colors.length])
            minitrack++
            var _card = elementFromXml(mini)
            containers.likes.appendChild(_card)
        }
    }
} else {
    document.getElementById("likes").remove()
}
/* 
*
*       Need to know & Dreams
*        
*/

if(_json.sections.need_to_know){
    containers.need2know.innerHTML = "<h1>Need to know about me:</h1>"
    for(i of _json.sections.need_to_know){
        var p = document.createElement("p")
        p.innerText = i
        containers.need2know.appendChild(p)
    }
} else {
    document.getElementById("need2know").remove()
}


if(_json.sections.dreams){
    containers.dreams.innerHTML = "<h1>My Dreams and goals:</h1>"
    for(i of _json.sections.dreams){
        var p = document.createElement("p")
        p.innerText = i
        containers.dreams.appendChild(p)
    }
} else {
    document.getElementById("dreams").remove()
}

