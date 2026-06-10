try {
(()=>{
let _gradientTemplates = {
    html: {
        textFirst:false,
        precol:"<a style=\"color:#",
        poscol:"\">",
        prechar: "",
        poschar:"</a>",
        sep:"",
        prefix:"",
        suffix:"",
        hex: true
    },
    latex: {
        textFirst:false,
        precol:"\\color{#",
        poscol:"}",
        prechar: "",
        poschar:"",
        sep:"",
        prefix:"",
        suffix:"",
        hex: true
    },
    latexCompat: {
        textFirst:false,
        precol:"\\color{#",
        poscol:"}",
        prechar: "\\textsf{",
        poschar:"}",
        sep:"",
        prefix:"",
        suffix:"",
        hex: true
    },
    minecraftTellraw: {
        textFirst: false,
        precol:"{\"color\":\"#",
        poscol:"\",\"text\":\"",
        prechar: "",
        poschar:"\"}",
        sep:",",
        prefix:"/tellraw @p [",
        suffix:"]",
        hex: true
    },
    ansi: {
        textFirst: false,
        precol: "\x1b[38;2;",
        poscol: "m",
        prechar: "",
        poschar: "\x1b[0m",
        sep: "",
        colorFormatter: u=>u.join(";"),
        prefix: "",
        suffix: "",
        hex: false
    }
}

function lerp(a, b, t){
    return a + (b - a) * t
}

function gradient(_colors,_len,_step){
    if(typeof _colors == 'string'){
        _colors = _colors.split(',')
    }
    _colors=_colors.map(a=>{
        let u = a.replace('#','').trim()
        if(u.length == 3){
            u=u.split('').map(l=>l+l).join("")
        }
        return u
    })
    _colors.forEach((a,i)=>{
        _colors[i] = {
            red : parseInt(a.slice(0,2),16),
            grn : parseInt(a.slice(2,4),16),
            blu : parseInt(a.slice(4,6),16),
        };

        if(Number.isNaN(_colors[i].red+_colors[i].grn+_colors[i].blu)){
        colors[i] = {
            red : 0,
            grn : 0,
            blu : 0,
        };
        }
    })
    
    let mypos = _step/_len,
    mycols = [
        Math.floor(mypos*(_colors.length-1)), 
        Math.min( Math.floor(mypos*(_colors.length-1))+1,_colors.length-1)
    ],
    mystep = (mypos*(_colors.length-1))%1

    return {
        iColors: [
            Math.round(lerp(_colors[mycols[0]].red,_colors[mycols[1]].red,mystep)),
            Math.round(lerp(_colors[mycols[0]].grn,_colors[mycols[1]].grn,mystep)),
            Math.round(lerp(_colors[mycols[0]].blu,_colors[mycols[1]].blu,mystep)),
        ],
        hexColors: 
            Math.round(lerp(_colors[mycols[0]].red,_colors[mycols[1]].red,mystep)).toString(16).padStart(2,"0")+
            Math.round(lerp(_colors[mycols[0]].grn,_colors[mycols[1]].grn,mystep)).toString(16).padStart(2,"0")+
            Math.round(lerp(_colors[mycols[0]].blu,_colors[mycols[1]].blu,mystep)).toString(16).padStart(2,"0"),
    }

}

function textGradient(_colors,_text){
    let grad = []
    for(let i in _text){
        grad.push(gradient(_colors,_text.length,+i))
    }
    
    let raw = [];
    [..._text].forEach((a,i)=>{
        raw.push({
            char: a,
            col: grad[i]
        })
    })
    return raw
}

function formatTextGradient(_colors,_text,_options={}){
    if(typeof _options.precol == "undefined") _options.precol=""
    if(typeof _options.poscol == "undefined") _options.poscol=""

    if(typeof _options.prechar == "undefined") _options.prechar=""
    if(typeof _options.poschar == "undefined") _options.poschar=""

    if(typeof _options.prefix == "undefined") _options.prefix=""
    if(typeof _options.suffix == "undefined") _options.suffix=""

    if(typeof _options.sep == "undefined") _options.sep = ""

    if(typeof _options.hex == "undefined") _options.hex=true
    if(typeof _options.textFirst == "undefined") _options.textFirst=false
    if(typeof _options.colorFormatter == "undefined") _options.colorFormatter= l=>l


    let raw = textGradient(_colors,_text).map(a=>({char:a.char,col: _options.colorFormatter(a.col[_options.hex?"hexColors":"iColors"]) }))
    let res = []
    for(let i in raw){
        let pre = _options.textFirst? "char":"col"
        let pre2 = _options.textFirst? "col":"char"

        res.push(_options["pre"+pre]+(raw[+i][pre])+_options["pos"+pre]+_options["pre"+pre2]+(raw[+i][pre2])+_options["pos"+pre2])
    }
    return _options.prefix+res.join(_options.sep)+_options.suffix
}

function getGradientTemplate(template){
    return _gradientTemplates[template]
}

window.gradient = gradient
window.textGradient = textGradient
window.formatTextGradient = formatTextGradient
window.getGradientTemplate = getGradientTemplate
})()
} catch(e) {
    console.error("Error while loading gradient: "+e.message)
}