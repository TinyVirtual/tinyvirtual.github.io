

let dom = {},
    dom_ids = [
        "title","cover","canvas",
        "artist","date","time_display",
        "time","pause","music",
        "input", "spd", "rewind", "skip", "audio_el",
        "disable_canvas","backdrop_alert","input_button",
        "rotating_disk", "alert", "folder_change", "about",
        "list_change"
    ],
    covers = [],
    dims = {
        width: 1980/2,
        height: 1280/2,
        step: 150/2,
    }
    dims.aval_w = Math.ceil(dims.width/dims.step)
    dims.aval_h = Math.ceil(dims.height/dims.step)

    let canvas_dat = {
        x: -60,
        y: 0,
        offx: 0,
        offy: 0,
        ysiz: 0
    }


    
let playlist = [],
    other_playlists = [],
    full_list = [],
    total_tracks = [],
    current = 0,
    a = 0;
window.changingTracks = false

for(let i of dom_ids){
    dom[i] = document.getElementById(i)
}

let performanceProfile = {
    milis: -1, //unmeasured
    mobile: !!navigator.userAgent.match(/Android|iPhone|iPad|BlackBerry/),
}

let minidata = {
    canvas_enabled: !performanceProfile.mobile,
    version: "0.0.3",
}
dom.disable_canvas.textContent = minidata.canvas_enabled?"Disable canvas":"Enable canvas"
if(performanceProfile.mobile){
    dom.backdrop_alert.textContent = "Also, this player is more optimized for desktop computers, the canvas is very laggy and disabled by default in mobile, but if you want to re-enable..."
}

let loaded = false

dom.ctx = dom.canvas.getContext("2d")

function loop(){

    dom.ctx.clearRect(0, 0, canvas.width, canvas.height);

    dom.ctx.setTransform(1, 0, 0, 1, 0, 0);

    dom.ctx.translate(0, -250+  Math.sin((Date.now() / 20000)+1) * (dims.height-dom.canvas.height) );
    canvas_dat = {
        x: -60,
        y: 0,
        offx: 0,
        offy: 0,
        ysiz: 0
    }

    if(typeof covers[0] == "undefined"){
        return
    }

    if(covers.length > 0){
        for (let img of covers) {
            dom.ctx.drawImage(img,canvas_dat.x,canvas_dat.y,150/2,150/2)
            canvas_dat.x+=150/2
            if(canvas_dat.x > dims.width+75){
                canvas_dat.x = -60
                canvas_dat.y+=150/2
            }
        }
    }
}

function renderListSelector() {
    let selctor_el = document.getElementById("playlist_selector")
    selctor_el.innerHTML = ""
    let button = `<button class="aero-button">Select</button>`
    other_playlists.forEach((a,i)=>{
        let div = document.createElement("div")
        div.style = `display: flex;width: 100%;justify-content: space-between;`
        let el = document.createElement("span")
        el.textContent = a.listName
        div.appendChild(el)
        let but = (b=>{
            let _b = document.createElement("div")
            _b.innerHTML = b;
            return _b.firstChild
        })(button)
        div.appendChild(but)
        but.addEventListener("click",async ()=>{
            current = i
            window.changingTracks = true
            await new Promise(r=>setTimeout(r,1500))
            playlist = other_playlists[i].files
            window.changingTracks = false
            renderPlaylist()
            playlist_play()
            
            document.getElementById("playlist_selector").setAttribute("-is-active","false")
            document.getElementById("playlist").setAttribute("-is-active","true")
        })
        selctor_el.appendChild(div)
    })
}

playlistEl = document.getElementById("playlist");

function renderPlaylist() {
    playlistEl.innerHTML = "";

    playlist.forEach((music, index) => {
        const item = document.createElement("div");

        item.draggable = true;
        item.classList.add("playlist-item")

        item.innerHTML = `
            <div>
                <button class="play icon"></button>
                <span>${music.tags.title}</span>
            </div>
            <div>
                <button class="up">⬆</button>
                <button class="down">⬇</button>
                <button class="remove">X</button>
            </div>
        `;
        
        // Play
        item.querySelector(".play").onclick = () => {
            a = index-1;
            if(document.querySelector("#music audio")){
                let u = document.querySelector("#music audio")
                u.currentTime = document.querySelector("#music audio").duration
                setTimeout(()=>u?.remove(),2000)
            }
        };

        // Remove
        item.querySelector(".remove").onclick = () => {
            playlist.splice(index, 1);
            renderPlaylist();
        };

        // Move up
        item.querySelector(".up").onclick = () => {
            if (index > 0) {
                [playlist[index], playlist[index - 1]] =
                [playlist[index - 1], playlist[index]];
                renderPlaylist();
            }
        };

        // Move down
        item.querySelector(".down").onclick = () => {
            if (index < playlist.length - 1) {
                [playlist[index], playlist[index + 1]] =
                [playlist[index + 1], playlist[index]];
                renderPlaylist();
            }
        };

        // Drag start
        item.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", index);
        });

        // Drag over
        item.addEventListener("dragover", e => {
            e.preventDefault();
        });

        // Drop reorder
        item.addEventListener("drop", e => {
            e.preventDefault();

            const from = +e.dataTransfer.getData("text/plain");
            const to = index;

            const moved = playlist.splice(from, 1)[0];
            playlist.splice(to, 0, moved);

            renderPlaylist();
        });

        playlistEl.appendChild(item);


    });
    /*
    javascript:
    let order2 = ["YonKaGor - Memory Merge.mp3",
    "YonKaGor - You'll Be Gone.mp3",
    "YonKaGor - Trash Talkin'.mp3",
    "YonKaGor - Linger in the Rain.mp3",
    "YonKaGor - So Long.ogg",
    "YonKaGor - Circus Hop.mp3",
    "YonKaGor - Another Mistake.mp3",
    "YonKaGor - I Still Create.mp3"]; 
    playlist.sort((a, b) => { 
        return order2.indexOf(a.name) - order2.indexOf(b.name) 
        }); 
        renderPlaylist();
    */  
    let export_button = document.createElement("button")
    export_button.classList.add("export")
    export_button.textContent = "Export Playlist"
    playlistEl.appendChild(export_button)
    export_button.addEventListener("click",(async()=>{
        
        let handle = await window.showSaveFilePicker({
            suggestedName: "list.json",
            types: [{
                description: "JSON Files",
                accept: { "application/json": [".json"] }
            }]
        });

        let data = {
            listName : prompt("Name the playlist...")||"New Playlist",
            tuampVersion : minidata.version,
            tracks : playlist.map(a=>a.name)
        },
        blob = new Blob([data], { type: "application/json" });
        other_playlists[current].listName = data.listName
        renderListSelector()

        let writable = await handle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
        //let stg = JSON.parse(localStorage.getItem("tuamp_data")||'{ "playlists":[], "version":"'+minidata.version+'" }')
        //stg.playlists.push(data)
        //localStorage.setItem("tuamp_data",JSON.stringify(stg))
    }))
}


async function playlist_play() {
    renderPlaylist()
    for(a = 0; a < playlist.length; a++){
        let audio = playlist[a]

        document.querySelectorAll("audio").forEach((a)=>{
            if(a.ended || a.error){
                a.pause()
                a.src = ""
                a.remove()
            }
        })
        let au_el = new Audio(audio.url)
        document.title = "TUAMP: "+audio.tags.title
        au_el.play()
        rotating_disk.setAttribute("spinning",(!au_el.paused))
        dom.music.appendChild(au_el)
        au_el.preservesPitch = !1
        au_el.playbackRate = dom.spd.value
        dom.pause.textContent = au_el.paused?"\uE00D":"\uE00C"

        
        let handlers = {
            spd: ()=>{
                    au_el.playbackRate = dom.spd.value
                },
            time: ()=>{
                    au_el.currentTime = (dom.time.value/100)*au_el.duration
                },
            pause: ()=>{
                    au_el.paused? au_el.play(): au_el.pause()
                    dom.pause.textContent = au_el.paused?"\uE00D":"\uE00C"
                    rotating_disk.setAttribute("spinning",(!au_el.paused))
                },
            skip: ()=>{
                    au_el.currentTime = au_el.duration
                },
            rewind: ()=>{
                    if(a-1>=0){
                        au_el.currentTime = au_el.duration
                        a-= 2
                    } else {
                        au_el.currentTime = au_el.duration
                        a = playlist.length-1;
                    }
                }
        }


        dom.spd.addEventListener("change",handlers.spd)
        dom.time.addEventListener("change",handlers.time)

        dom.pause.addEventListener("click",handlers.pause)
        dom.skip.addEventListener("click",handlers.skip)
        dom.rewind.addEventListener("click",handlers.rewind)

        

        dom.cover.src = audio.cover || "./assets/music_placeholder.jpg"
        dom.title.textContent = audio.tags.title || audio.name
        dom.artist.textContent = audio.tags.artist + " - " + audio.tags.album
        dom.date.textContent = audio.tags.year + " - " + audio.tags.genre

        await new Promise(r => setTimeout(r,2000))
        console.log(au_el.duration)
        let t = dom.time, tv = dom.time_display
        while(au_el && au_el.currentTime < (au_el.duration-0.5)){
            if(window.changingTracks){
                au_el.pause()
                au_el.remove()
                dom.skip.removeEventListener("click",handlers.skip)
                dom.spd.removeEventListener("change",handlers.spd)
                dom.time.removeEventListener("change",handlers.time)
                dom.pause.removeEventListener("click",handlers.pause)
                dom.rewind.removeEventListener("click",handlers.rewind)
                return
            }

            await new Promise(r => setTimeout(r,1000))
            t.value = (au_el.currentTime / au_el.duration)*100
            tv.textContent = String(Math.floor(au_el.currentTime / 60)).padStart(2, "0") +":"+ String(Math.round(au_el.currentTime %60)).padStart(2, "0")
        }

        dom.skip.removeEventListener("click",handlers.skip)
        dom.spd.removeEventListener("change",handlers.spd)
        dom.time.removeEventListener("change",handlers.time)
        dom.pause.removeEventListener("click",handlers.pause)
        dom.rewind.removeEventListener("click",handlers.rewind)

        if(a+1==playlist.length){
            a=0
        } 
    }
}

dom.disable_canvas.addEventListener("click",()=>{
    console.log(minidata)
    minidata.canvas_enabled = !minidata.canvas_enabled
    dom.disable_canvas.textContent = minidata.canvas_enabled?"Disable canvas":"Enable canvas"
})

dom.folder_change.addEventListener("click",()=>{
    playlist_el.setAttribute("-is-active","false");
    document.getElementById("playlist_selector").setAttribute("-is-active","false");
    dom.input.click();
})

dom.input_button.addEventListener("click",()=>{dom.input.click()})

dom.input.addEventListener("change", async (e) => {
    if(e.target.files.length <=0){
        return
    }

    window.changingTracks = true
    dom.alert.setAttribute("--show","true")
    dom.alert.textContent = "Loading..."

    dom.input.parentNode.hidden = true
    playlist = [];
    total_tracks = [];
    renderPlaylist()

    dom.cover.src = "./assets/music_placeholder.jpg"
    dom.title.textContent = "Loading..."
    dom.artist.textContent = "Loading..."
    dom.date.textContent = "Also Loadign..."; //this is a purposely mispeled, and this coment too lol XD
    

    (["skip", "spd", "time", "pause"]).forEach(id => {
        let _el = dom[id];
        let _clone = _el.cloneNode(true);
        _el.replaceWith(_clone);
        dom[id] = _clone;
    });

    let jsons = [...e.target.files].filter(f =>
        f.type.endsWith("json")
    );
    jsons.forEach(async(j,i)=>{
        try {
            let _j = await j.text()
            other_playlists[other_playlists.length+i] = JSON.parse(_j)
        } catch(e) {
            console.alert("JSON Error: "+e.message);
            console.alert(e)
        }
    });
    dom.alert.textContent = "Parsing JSONs: "+(!!other_playlists.length)?"Found "+other_playlists.length:"None found, skipping..."

    await new Promise(r => setTimeout(r,jsons.length*(10+(performanceProfile.mobile*100))))
    other_playlists = other_playlists.filter(a=>!!a.tuampVersion)
    console.log(other_playlists)
    
    other_playlists.forEach(a=>{total_tracks.push(...a.tracks)})

    let files = [...e.target.files].filter(f =>
        f.type.startsWith("audio")
    );


    if(files.length > 200){
        if(other_playlists.length){
            dom.alert.textContent =("⚠️ Too many tracks, but a valid playlist json was found")
            files = files.filter(a=>!!(total_tracks.find(b=>b==a.name) ))
        } else {
            dom.alert.textContent =("⚠️ Too many tracks, limiting to the first 200")
            files = files.slice(0, 200);
        }
        await new Promise(r => setTimeout(r,jsons.length*(1000+(performanceProfile.mobile*100))))
    }

    other_playlists.push(
        {
            tuampVersion: minidata.version,
            listName: "All files",
            tracks: files.map(_=>_.name)
        }
    )
    //console.log(e.target.files)
    let load = false

    files = files.sort((a)=>(0.5 - Math.random()));

    (()=>{ let decode_begin = Date.now()
    for(let u=0;u<1e7;u++){ Math.sin(Math.sqrt(u**(2+(0.00176))));  }
    performanceProfile.milis = Date.now() - decode_begin;
    dom.alert.textContent = "Measured performance profile: "+performanceProfile.milis+"ms, "
    +(ms=>{
        if(ms<20) return "Excelent!"
        if(ms<50) return "Okay"
        if(ms<90) return "Decent"
        if(ms<120) return "Meh"
        if(ms<180) return "Bad"
        if(ms<240) return "Horrible"
        if(ms<350) return "Nasty"
        if(ms<450) return "Toaster"
        if(ms<700) return "Commodore (it's bad)"
        return "I have very unfortunate news: this device is very obsolete"
    })(performanceProfile.milis)})();

    await new Promise(r=>setTimeout(r,3000))
  
    for (let file of files) {
        window.jsmediatags.read(file, {
            onSuccess: async tag => {
            dom.alert.textContent = "Reading "+(tag.tags.title||file.name)+"..."
                let pic = tag.tags.picture;
                console.log(tag)

                if (!pic){ 
                    pic = "none"
                    dom.alert.textContent += " Cover not found!"  //pic = "https://static.vecteezy.com/system/resources/previews/000/421/044/original/music-note-icon-vector-illustration.jpg"
                }

                const base64 = btoa(
                new Uint8Array(pic.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), "")
                );

                let mg = (pic!="none")?`data:${pic.format};base64,${base64}`:`./assets/music_placeholder.jpg`
                let img = new Image()
                img.src = mg

                await img.decode()
                dom.alert.textContent += " Decoding image..."

                if(minidata.canvas_enabled){
                covers.push(img);
                }

                
                let pl_url = URL.createObjectURL(file)
                full_list.push({
                    url: pl_url,
                    name: file.name,
                    tags: {
                        title: tag.tags.title || file.name,
                        artist: tag.tags.artist || "Unknown Artist",
                        album: tag.tags.album || "Unknown Album",
                        year: tag.tags.year || "Unknown Year",
                        genre: tag.tags.genre || "Unknown Genre"
                    },
                    cover: mg,
                })
                dom.alert.textContent += " Inserting to playlist..."

                canvas_dat.x+=150
                if(canvas_dat.x > dims.width+75){
                    canvas_dat.x = -60
                    canvas_dat.y+=150
                }
            },
            onError: err => {
            dom.alert.textContent = "Reading "+(file.name)+"... Metadata not found..."
                let pl_url = URL.createObjectURL(file)
                full_list.push({
                    url: pl_url,
                    name: file.name,
                    tags:{
                        title: file.name,
                        artist: "Unknown Artist",
                        album: "Unknown Album",
                        year: "Unknown Year",
                        genre: "Unknown Genre"
                    },
                    cover: "",
                })

                dom.alert.textContent += " Inserting to playlist..."
                
                canvas_dat.x+=150
                if(canvas_dat.x > dims.width+75){
                    canvas_dat.x = -60
                    canvas_dat.y+=150
                }

                console.warn(err)
            }
        })
        await new Promise(r=>setTimeout(r,performanceProfile.milis))
    }

    await new Promise(r=>setTimeout(r,performanceProfile.milis*50))
    //console.log(performanceProfile)

    await new Promise(r=>setTimeout(r,2000+(performanceProfile.milis*5*files.length)))

    for(let u in other_playlists){
        other_playlists[u].files = []
        other_playlists[u].tracks.forEach((a,i)=>{
            other_playlists[u].files[i] = full_list.find(_=>{if(_.name==a){return _}})
        })
        other_playlists[u].files.filter(_=>typeof _!="undefined")
    }

    if(minidata.canvas_enabled && covers.length < 5){
        dom.alert.textContent = "Not enough covers, filling with placeholders...."
        covers = await (async ()=>{
            let templates = ["./assets/vinil.png","./assets/music_placeholder.jpg","./assets/red.png","./assets/cyan.png","./assets/green.png"]
            let c = []
            for(let t of templates){
                let i = new Image()
                i.src = t
                await i.decode()
                c.push(i)
            }
            return c
        })()
        
    }

    if(minidata.canvas_enabled){
        setInterval(()=>{
            loop()
        },40+(performanceProfile.mobile*100))
    };

    await new Promise(r=>setTimeout(r,5)+(performanceProfile.mobile*500))

    try {
        playlist.sort((a, b) =>
            a.tags.title?.localeCompare(b.tags.title)
        );
    } catch {}

    if(minidata.canvas_enabled && covers.length > 0){
        dom.alert.textContent = "Still not enough covers! Repeating covers...."
        let original_covers = [...covers]
        while(canvas_dat.y<(dims.height+150+(150*3))){
            let img = original_covers[
                Math.floor(Math.random()*(original_covers.length))
            ]

            covers[covers.length] = img

            canvas_dat.x+=150
            if(canvas_dat.x > dims.width+75){
                canvas_dat.x = -60
                canvas_dat.y+=150
            }
            await new Promise(r=>setTimeout(r,2))
        };
    }

    covers = covers.sort((a)=>(0.5 - Math.random()));

    dom.alert.textContent = "All set :D, Starting playback..."
    setTimeout(()=>{
    dom.alert.setAttribute("--show","false")},3000)
    
    renderListSelector()
    playlist = other_playlists[0].files

    dom.rotating_disk.setAttribute("playing","")
    window.changingTracks = false
    playlist_play()
    
    document.getElementById("playlist_selector").setAttribute("-is-active","true")
    dom.pause.addEventListener("click",()=>{
        if(document.querySelector("audio") == null){
            playlist_play()
        }
    })

});

document.getElementById("show").addEventListener("click",()=>{
  playlist_el = document.getElementById("playlist")
  playlist_el.setAttribute("-is-active",playlist_el.getAttribute("-is-active")=="false")
  document.getElementById("playlist_selector").setAttribute("-is-active","false")
})

document.getElementById("list_change").addEventListener("click",()=>{
  playlist_el = document.getElementById("playlist_selector")
  playlist_el.setAttribute("-is-active",playlist_el.getAttribute("-is-active")=="false")
  document.getElementById("playlist").setAttribute("-is-active","false")
})

dom.about.addEventListener("click",()=>{
    let div = document.getElementById("about_div")
    div.setAttribute("-is-active",div.getAttribute("-is-active")=="false")
})