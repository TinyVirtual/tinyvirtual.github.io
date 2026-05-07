let dom = {},
    dom_ids = [
        "title","cover","canvas",
        "artist","date","time_display",
        "time","pause","music",
        "input", "spd", "rewind", "skip"
    ],
    covers = [],
    dims = {
        width: document.documentElement.getBoundingClientRect().width+50,
        height: document.documentElement.getBoundingClientRect().height+50,
        step: 150,
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
    
let playlist = []

for(let i of dom_ids){
    dom[i] = document.getElementById(i)
}

let loaded = false

dom.ctx = dom.canvas.getContext("2d")

function loop(){

    dom.ctx.clearRect(0, 0, canvas.width, canvas.height);

    dom.ctx.setTransform(1, 0, 0, 1, 0, 0);

    dom.ctx.translate(0, -170+  Math.sin((Date.now() / 20000)+1) * (dims.height-dom.canvas.height) );
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
            dom.ctx.drawImage(img,canvas_dat.x,canvas_dat.y,150,150)
            canvas_dat.x+=150
            if(canvas_dat.x > dims.width+75){
                canvas_dat.x = -60
                canvas_dat.y+=150
            }
        }
    }
}

playlistEl = document.getElementById("playlist");

function renderPlaylist() {
    playlistEl.innerHTML = "";

    playlist.forEach((music, index) => {
        const item = document.createElement("div");

        item.draggable = true;
        item.classList.add("playlist-item")

        item.innerHTML = `
            <span>${music.tags.title}</span>
            <div>
                <button class="up">⬆</button>
                <button class="down">⬇</button>
                <button class="remove">X</button>
            </div>
        `;

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
}


async function playlist_play() {
    renderPlaylist()
    for(let a = 0; a < playlist.length; a++){
        let audio = playlist[a]

        let au_el = new Audio(audio.url)
        au_el.play()
        dom.music.appendChild(au_el)
        au_el.preservesPitch = !1
        au_el.playbackRate = dom.spd.value
        dom.pause.textContent = au_el.paused?"▶":"❙❙"

        
        let handlers = {
            spd: ()=>{
                    au_el.playbackRate = dom.spd.value
                },
            time: ()=>{
                    au_el.currentTime = (dom.time.value/100)*au_el.duration
                },
            pause: ()=>{
                    au_el.paused? au_el.play(): au_el.pause()
                    dom.pause.textContent = au_el.paused?"▶":"❙❙"
                },
            skip: ()=>{
                    au_el.currentTime = au_el.duration
                },
            rewind: ()=>{
                    au_el.currentTime = au_el.duration
                    a-= 2
                }
        }


        dom.spd.addEventListener("change",handlers.spd)
        dom.time.addEventListener("change",handlers.time)

        dom.pause.addEventListener("click",handlers.pause)
        dom.skip.addEventListener("click",handlers.skip)
        dom.rewind.addEventListener("click",handlers.rewind)

        

        dom.cover.src = audio.cover || "https://static.vecteezy.com/system/resources/previews/000/421/044/original/music-note-icon-vector-illustration.jpg"
        dom.title.textContent = audio.tags.title || audio.name
        dom.artist.textContent = audio.tags.artist + " - " + audio.tags.album
        dom.date.textContent = audio.tags.year + " - " + audio.tags.genre

        await new Promise(r => setTimeout(r,2000))
        console.log(au_el.duration)
        let t = dom.time, tv = dom.time_display
        while(au_el && au_el.currentTime < (au_el.duration-0.5)){
            await new Promise(r => setTimeout(r,1000))
            t.value = (au_el.currentTime / au_el.duration)*100
            tv.textContent = String(Math.floor(au_el.currentTime / 60)).padStart(2, "0") +":"+ String(Math.round(au_el.currentTime %60)).padStart(2, "0")
        }

        setTimeout(au_el.remove,100)
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

dom.input.addEventListener("change", async (e) => {

    dom.input.parentNode.hidden = true
    covers = [];
    playlist = [];
    

    (["skip", "spd", "time", "pause"]).forEach(id => {
        let _el = dom[id];
        let _clone = _el.cloneNode(true);
        _el.replaceWith(_clone);
        dom[id] = _clone;
    });


    let files = [...e.target.files].filter(f =>
        f.type.startsWith("audio")
    );

    console.log(e.target.files)
    let load = false

    files = files.sort((a)=>(0.5 - Math.random()))
  
    for (let file of files) {


        window.jsmediatags.read(file, {
            onSuccess: async tag => {
                let pic = tag.tags.picture;
                console.log(tag)


                if (!pic){ 
                    console.log(tag)
                    return //pic = "https://static.vecteezy.com/system/resources/previews/000/421/044/original/music-note-icon-vector-illustration.jpg"
                }

                const base64 = btoa(
                new Uint8Array(pic.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), "")
                );

                let mg = `data:${pic.format};base64,${base64}`
                let img = new Image()
                img.src = mg

                await img.decode()

                covers[covers.length] = img;

                
                let pl_url = URL.createObjectURL(file)
                playlist.push({
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

                canvas_dat.x+=150
                if(canvas_dat.x > dims.width+75){
                    canvas_dat.x = -60
                    canvas_dat.y+=150
                }
            },
            onError: err => {
                let pl_url = URL.createObjectURL(file)
                playlist.push({
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
                
                canvas_dat.x+=150
                if(canvas_dat.x > dims.width+75){
                    canvas_dat.x = -60
                    canvas_dat.y+=150
                }

                console.warn(err)
            }
        })
        await new Promise(r=>setTimeout(r,500))
    }

    if(!navigator.appVersion.includes("Android")){
        setInterval(()=>{
            loop()
        },100)
    } else {
        document.querySelector("canvas")?.remove()
    };
    await new Promise(r=>setTimeout(r,5))

    try {
        playlist.sort((a, b) =>
            a.tags.title?.localeCompare(b.tags.title)
        );
    } catch {}

    if(covers.length > 0){
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
            await new Promise(r=>setTimeout(r,50))
        };
    }

    playlist_play()
    dom.pause.addEventListener("click",()=>{
        if(document.querySelector("audio") == null){
            playlist_play()
        }
    })

});

document.getElementById("show").addEventListener("click",()=>{
  document.getElementById("playlist").hidden = !document.getElementById("playlist").hidden
})
