
console.log("cipher")
let title =`
   _______       __             _  __
  / ____(_)___  / /_  ___  ____| |/ /
 / /   / / __ \\/ __ \\/ _ \\/ ___/   / 
/ /___/ / /_/ / / / /  __/ /  /   |  
\\____/_/ .___/_/ /_/\\___/_/  /_/|_|  
      /_/                             <noglow>by <a href="https://tinyvirtual.github.io/">TinyVirtual</a></noglow>`

let loadin_slow = [
    "<yellow>[WARN]: /dev/cpl_cph.dll Can not be loaded in a remote session!</yellow>",
    "<p>Authentication Not Valid!</p>",
    `<p>Remote OS: ${navigator.platform}</p>`,
    "<p>Loading remote modules...</p>",
    "<red>[ERROR]: Couldn't access /mnt/bin/manifest.json: No such file or directory!</red>",
    "<p>Fetching remote modules...</p>",
]
, loading_fast = [
    "Loaded rem_kernel",
    "Loaded rem_os",
    "Loaded sh_loader",
    "Connection Configured at <yellow>192.168.312.8</yellow>",
    "Loaded Network Provider",
    "Loaded rem_cnx",
    "Loaded rx_tx_v4",
    "Loaded rx_tx_v6",
    "Initializing kryp_kl...",
    "<white>KRYP_KR V: </white><blue>8.3</blue> - <yellow>Secure Mode</yellow>",
    "Loaded kryp_kl",
    "Initializing entropy_collector...",
    "Loaded entropy_collector",
    "Initializing nonce_generator...",
    "Loaded nonce_generator",
    "Initializing cipher_registry...",
    "Loaded cipher_registry",
    "Initializing hash_integrity_check...",
    "Loaded hash_integrity_check",
    "Initializing secure_channel...",
    "Loaded secure_channel",
    "Initializing anomaly_detector...",
    "Loaded anomaly_detector",
    "Initializing pattern_core...",
    "Loaded pattern_core",
    "Initializing signal_decoder...",
    "Loaded signal_decoder",
    "Initializing echo_trace...",
    "Loaded echo_trace",
    "Initializing memory_sanitizer...",
    "Loaded memory_sanitizer",
    "Initializing io_obfuscation...",
    "Loaded io_obfuscation",
    "Initializing packet_scrambler...",
    "Loaded packet_scrambler",
    "Initializing observer_sync...",
    "<red>observer_sync mismatch</red>",
    "Retrying observer_sync...",
    "Loaded observer_sync",
    "Initializing legacy_protocol...",
    "Loaded legacy_protocol",
    "Initializing archive_index...",
    "Loaded archive_index",
    "Initializing keybrd_kernel",
    "Loaded keybrd_kernel",
    "Initializing..."
];

let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
alphabet = "abcdefghijklmnopqrstuvwxyz";
function from_binary(bits,conf={}){ 
    bits = bits.replaceAll(",","").split(" ");
    //bits = bits.replace(/[_-■●]|⬛️/gmu,"1").replace(/[.□○]|⬜️/gmu,"0").replace(/[.\;,]?\s+|\s+[.\;,]?/gmu," "); /* fallback for emoji, binary morse and phone symbols */
    if(Object.keys(conf).length){
        bits = bits.replaceAll(conf.high,"1").replaceAll(conf.low,"0").replaceAll(conf.sep," ")
    }
    bits.forEach((a,i)=>{
        bits[i] = String.fromCharCode(parseInt(a,2))
    });
    bits = bits.join(""); 
    return bits
}

function to_binary(bits,conf={}){ 
    bits = bits.split("");
    bits.forEach((a,i)=>{
        bits[i] = a.charCodeAt(0).toString(2).padStart(8,"0")
    }); 
    bits = bits.join(" "); 
    if(Object.keys(conf).length){
        bits = bits.replaceAll(!!conf.high?conf.high:"1").replaceAll(!!conf.low?conf.low:"0").replaceAll(!!conf.sep?conf.sep:" ")
    };
    return bits
}
function hash_key(key=""){
    if (key.length > 52){alert("Key length is too big, maximum alowed is 52"); return 1}
    key = key.split("")
    let vals = []
    key.forEach( (k) => { vals.push(k.charCodeAt(0))})
    let pre_final = 1
    for(let i in vals){
      if (i%2 == 0){
        pre_final *= Math.floor(vals[i]/1.5)
      } else {
        pre_final = pre_final ^ vals[i]
      }
    }
    return pre_final % (4096)
}

function mod(n, m) {
    return ((n % m) + m) % m
}

function num_to_char(number) {
    var chars = ("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=").split("")
    let upper = (number & 0b1111_1100_0000)>>6
    let lower = number & 0b11_1111
    return chars[upper] + chars[lower]
}
function char_to_num(char) {
    if(char.length != 2){
        alert("Fatar error: Unable to convert char to num: Args length incompatible"); 
        throw new SyntaxError("Fatar error: Unable to convert char to num: Args length incompatible")
    }
    var chars = ("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=").split("")
    let upper = char[0]
    let lower = char[1]
    upper = chars.findIndex((a)=>(a==upper))
    lower = chars.findIndex((a)=>(a==lower))
    if(upper == -1||lower ==-1){
        alert("Fatar error: Unable to convert char to num: Could not find especified character!"); 
        throw new SyntaxError("Fatar error: Unable to convert char to num: Could not find especified character!")
    }
    return (upper<<6)|lower
}

function encode_text(text, key) {
    let text_array = text.split("")
    let hashed = hash_key(key)

    for(let i in text_array){
        text_array[i] = text_array[i].charCodeAt(0) - 15 //-15 because first 15 chars are invalid
        text_array[i] ^= hashed
        text_array[i] = num_to_char(text_array[i])
    }
    
    return text_array.join("")
}

function decode_text(text, key) {
    let text_array = text.split("")
    let hashed = hash_key(key)
    if (text_array.length % 2 != 0){
        alert("Fatar error: Invalid string: Odd string value"); 
        throw new SyntaxError("Fatar error: Invalid string: Odd string value")
    }

    for(let i = 0; i < text_array.length; i+=2){
        text_array[i] += text_array[i+1]
        text_array[i+1] = ""
        text_array[i] = char_to_num(text_array[i])
        text_array[i] ^= hashed
        text_array[i] = String.fromCharCode(text_array[i]+15)
    }

    return text_array.join("")
}

function atbash(text){
    let ut = [...text]
    for(let u = 0; u < ut.length; u++){
        if([...alphabet].find(_=>_==ut[u])){
            ut[u] = alphabet[(alphabet.length-1)-[...alphabet].findIndex(_=>_==ut[u])]
        }
        if([...ALPHABET].find(_=>_==ut[u])){
            ut[u] = ALPHABET[(ALPHABET.length-1)-[...ALPHABET].findIndex(_=>_==ut[u])]
        }
    }
    return ut.join("")
}


function caesar_encode(text, key){
    let ut = [...text]
    let shift = Number(key)
    if(isNaN(shift)){shift = 0}
    shift = Math.round(shift)

    for(let u = 0; u < ut.length; u++){
        if([...alphabet].find(_=>_==ut[u])){
            ut[u] = alphabet[mod([...alphabet].findIndex(_=>_==ut[u])+shift,alphabet.length)]
        }
        if([...ALPHABET].find(_=>_==ut[u])){
            ut[u] = ALPHABET[mod([...ALPHABET].findIndex(_=>_==ut[u])+shift,ALPHABET.length)]
        }
    }
    return ut.join("")
}
function caesar_decode(text, key){
    let ut = [...text]
    let shift = Number(key)
    if(isNaN(shift)){shift = 0}
    shift = Math.round(shift)
    shift*=-1

    for(let u = 0; u < ut.length; u++){
        if([...alphabet].find(_=>_==ut[u])){
            ut[u] = alphabet[mod([...alphabet].findIndex(_=>_==ut[u])+shift,alphabet.length)]
        }
        if([...ALPHABET].find(_=>_==ut[u])){
            ut[u] = ALPHABET[mod([...ALPHABET].findIndex(_=>_==ut[u])+shift,ALPHABET.length)]
        }
    }
    return ut.join("")
}

function to_morse(text){
    let dictionary = {
        "0":"-----", "1":".----", "2":"..---", "3":"...--", "4":"....-", "5":".....",
        "6":"-....", "7":"--...", "8":"---..", "9":"----.", "a":".-", "b":"-...",
        "c":"-.-.", "d":"-..", "e":".", "f":"..-.", "g":"--.", "h":"....",
        "i":"..", "j":".---", "k":"-.-", "l":".-..", "m":"--", "n":"-.",
        "o":"---", "p":".--.", "q":"--.-", "r":".-.", "s":"...", "t":"-",
        "u":"..-", "v":"...-", "w":".--", "x":"-..-", "y":"-.--", "z":"--..",
        "!":"-.-.--", ".":".-.-.-", "?":"..--..", ",":"--..--", " ":"/", "-": "-....-",
        ":":"---...", "/":"-..-.", "&":".-...", "=":"-...-", "%":"----- -..-. -----" 
    };

    let u = [...(text.toLowerCase())]
    u.forEach((a,i)=>{
        u[i] = dictionary[a] || "..--.."
    })
    return u.join(" ")
}

function from_morse(text){
    let dictionary = {
        "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4", ".....": "5",
        "-....": "6", "--...": "7", "---..": "8", "----.": "9", ".-": "a", "-...": "b",
        "-.-.": "c", "-..": "d", ".": "e", "..-.": "f", "--.": "g", "....": "h",
        "..": "i", ".---": "j", "-.-": "k", ".-..": "l", "--": "m", "-.": "n",
        "---": "o", ".--.": "p", "--.-": "q", ".-.": "r", "...": "s", "-": "t",
        "..-": "u", "...-": "v", ".--": "w", "-..-": "x", "-.--": "y", "--..": "z",
        "-.-.--": "!", ".-.-.-": ".", "--..--": ",", "..--..": "?", "/": " ", "-....-": "-",
        "---...":":", "-..-.":"/", ".-...":"&", "-...-":"=" 
    };
    let u = text.split(" ")
    u.forEach((a,i)=>{
        u[i] = dictionary[a] || a
    })
    return u.join("").replaceAll("0/0","%")
}

function atocjk(text){
    let ret = []
    let realRet = []
    for(let t of [...text]){
        let code = t.codePointAt(0)
        if(code > 0xFF){ console.error("invalid char"); return "Invalid char!"}
        ret.push(code)
    }
    if(ret.length%2!=0){ret.push("20")}
    for(let t = 0; t < ret.length; t+=2){
        realRet.push( String.fromCodePoint((ret[t]<<8)| ret[t+1] ) )
    }
    return realRet.join("")
}

function cjktoa(cjk){
    let ret = []
    for(let c of [...cjk]){
        ret.push( String.fromCodePoint(c.codePointAt(0)>>8) )
        ret.push( String.fromCodePoint(c.codePointAt(0)&0xff) )
    }
    return ret.join("")
}

//let 
window.options = [
    {
        name: "Tiny's XOR Cipher",
        useKey: !0,
        encode: encode_text,
        decode: decode_text
    },
    {
        name: "Binary",
        useKey: !1,
        encode: to_binary,
        decode: from_binary
    },
    {
        name: "Atbash",
        useKey: !1,
        encode: atbash,
        decode: atbash
    },
    {
        name: "Caesar",
        useKey: !0,
        encode: caesar_encode,
        decode: caesar_decode
    },
    {
        name: "Base64",
        useKey: !1,
        encode: a=>btoa(a),
        decode: a=>atob(a)
    },
    {
        name: "Morse",
        useKey: !1,
        encode: to_morse,
        decode: from_morse
    },
    {
        name: "ASCII to UTF16",
        useKey: !1,
        encode: atocjk,
        decode: cjktoa,
    }
]; 
let currently_active = 0, operation = 0

function string_to_element(str){
    let u = document.createElement("div")
    u.innerHTML = str
    return u.firstChild
}

document.body.style.overflow = "hidden"

let param = new URLSearchParams(window.location.search)
if(param.has("cyan")){
    document.documentElement.style.filter = "hue-rotate(91deg)"
}
if(!param.has("fast")){
    await new Promise(r=>setTimeout(r,100));
    let loading_div = document.getElementById("loading_div")
    for(let o of loadin_slow){
        await new Promise(r=>setTimeout(r,400));
        loading_div.appendChild(string_to_element(o))
    }
    await new Promise(r=>setTimeout(r,300));
    for(let o of loading_fast){
        await new Promise(r=>setTimeout(r,20));
        window.scrollTo(0, document.body.scrollHeight);
        loading_div.appendChild(string_to_element("<p>"+o+"</p>"))
    }
}


document.body.style = ""

document.getElementById("title_div").innerHTML = "<cur>▂</cur>"
await new Promise(r=>setTimeout(r,300));
document.getElementById("title_div").innerHTML = title
document.getElementById("title_div").setAttribute("glow","")
let main_div = document.getElementById("main")
main_div.innerHTML= "<cur>▂</cur>"
title = "";
await new Promise(r=>setTimeout(r,1000));
main_div.innerHTML= ""

let els = {}

document.querySelector(".navigation").hidden = false

els.input = document.createElement("textarea")
els.input.id = "input"
els.input.placeholder = "Ciphered text here."
main_div.appendChild(els.input)

els.out = document.createElement("div")
els.out.id = "output"
els.out.classList.add("output-box")
main_div.appendChild(els.out)
els.out.addEventListener("click",()=>{
    navigator.clipboard.writeText(els.out.innerHTML)
    document.getElementById("info").textContent = "Copied!"
    setTimeout(()=>{document.getElementById("info").textContent = ""},3000)
})

els.key = document.createElement("textarea")
els.key.id = "key"
els.key.placeholder = "Key here."
main_div.appendChild(els.key)

els.but = document.createElement("button")
els.but.id = "convert"
els.but.innerText = "[ Execute ]"
document.getElementById("button_position").appendChild(els.but)

els.copy = document.createElement("button")
els.copy.id = "copy"
els.copy.innerText = "[ Copy ]"
document.getElementById("button_position").appendChild(els.copy)
els.copy.addEventListener("click",()=>{
    navigator.clipboard.writeText(els.out.innerHTML)
    document.getElementById("info").textContent = "Copied!"
    setTimeout(()=>{document.getElementById("info").textContent = ""},3000)
})

document.getElementById("current_selection").textContent = "Currently Selected: Tiny's XOR Cipher [Encode]"

els.oper = document.getElementById("operation")

els.oper_enc = document.createElement("button")
els.oper_enc.textContent = "[ Encode ]"
els.oper_enc.addEventListener("click",()=>{
    operation = 0
    document.getElementById("current_selection").textContent =document.getElementById("current_selection").textContent.replace("Decode","Encode")
})
els.oper.appendChild(els.oper_enc)

els.oper_dec = document.createElement("button")
els.oper_dec.textContent = "[ Decode ]"
els.oper_dec.addEventListener("click",()=>{
    operation = 1
    document.getElementById("current_selection").textContent =document.getElementById("current_selection").textContent.replace("Encode","Decode")
})
els.oper.appendChild(els.oper_dec);
[document.getElementById("choose"),document.getElementById("operation")].forEach((a)=>{
    a.setAttribute("on","")
});

/*     
Remove reason: doesn't make any sense this tool have music


let mus = new Audio()
mus.src = "https://lambda.vgmtreasurechest.com/soundtracks/earthbound-snes/rzalasyymt/119%20Kraken%20of%20the%20Sea.mp3"
mus.loop = true
document.getElementById("music").hidden = false

document.getElementById("music").addEventListener("click",()=>{
    (mus.paused)?mus.play():mus.pause()
    document.getElementById("music").textContent = "♪ Music: "+((mus.paused)?"Off":"On")
    
    document.getElementById("info").textContent = ((mus.paused)?"":"♪ EarthBound (SNES) - Kraken of the Sea")
    setTimeout(()=>{document.getElementById("info").textContent = ""},3000)
})

//setTimeout(()=>{document.getElementById("music").click()},200)
*/
document.getElementById("music")?.remove();


for(let type in options){
    let option = options[type]
    let op = document.createElement("button")
    op.textContent = option.name
    op.addEventListener("click",()=>{
        currently_active = type
        document.getElementById("current_selection").textContent = "Currently Selected: "+option.name+((!!operation)?" [Decode]":" [Encode]")
        els.key.hidden = !option.useKey
    })
    document.getElementById("choose").appendChild(op)
       
}



els.but.addEventListener("click",()=>{
    if(options[currently_active].useKey){
        els.out.textContent = options[currently_active][(!!operation)?"decode":"encode"](els.input.value,els.key.value)
    } else {
        els.out.textContent = options[currently_active][(!!operation)?"decode":"encode"](els.input.value)
    }
});

(()=>{
    let canvas = document.querySelector("canvas#rain")
    , ctx = canvas.getContext("2d")
    , FONT_SIZE = 16
    , chars = "01"

    let columns = Math.floor(canvas.width / FONT_SIZE)
    let drops = Array(columns).fill(0)

    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.08)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#00ff00"
        ctx.font = `${FONT_SIZE}px FixedSYS`

        for (let i = 0; i < drops.length; i++) {
            let text = chars[Math.floor(Math.random() * chars.length)]

            let x = i * FONT_SIZE
            let y = drops[i] * FONT_SIZE

            ctx.fillText(text, x, y)

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0
            }

            drops[i]++
        }

        setTimeout(draw,30)
    }

    document.fonts.ready.then(draw)
})()
