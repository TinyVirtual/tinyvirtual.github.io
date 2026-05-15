const dom = {
    setup: ["text","colors","generate","preview","copy"]
    }
    
dom.setup.forEach((a)=>{
    dom[a] = document.getElementById(a);
})

function lerp(a, b, t){
    return a + (b - a) * t
}

let the_text = ""

dom.generate.addEventListener("click",()=>{
    let text = [...dom.text.value], colors = dom.colors.value.split(",");
    colors.forEach((a,i)=>{colors[i]=a.trim()})
    colors.forEach((a,i)=>{
        colors[i] = {
            red : parseInt(a.slice(1,3),16),
            grn : parseInt(a.slice(3,5),16),
            blu : parseInt(a.slice(5,7),16),
        };
        if(Number.isNaN(colors[i].red)||Number.isNaN(colors[i].grn)||Number.isNaN(colors[i].blu)){
        colors[i] = {
            red : 0,
            grn : 0,
            blu : 0,
        };
        }
    })
    
    let pre_result = "$${ $%s0 }$$", pre_result_html = ""
    for(let sub in text){
        let mypos = sub/text.length,
        mycols = [Math.floor(mypos*(colors.length-1)), Math.min( Math.floor(mypos*(colors.length-1))+1,colors.length-1)],
        mystep = (mypos*(colors.length-1))%1
        /* 
        if(text[sub]=="\x20"){
            text[sub] = " \\space "
        }//*/
    
        
        //console.log(`${mypos}; ${JSON.stringify(mycols)}; ${mystep}`)
        
        text[sub] = "\\color{#"
        +Math.round(lerp(colors[mycols[0]].red,colors[mycols[1]].red,mystep)).toString(16).padStart(2,"0")
        +Math.round(lerp(colors[mycols[0]].grn,colors[mycols[1]].grn,mystep)).toString(16).padStart(2,"0")
        +Math.round(lerp(colors[mycols[0]].blu,colors[mycols[1]].blu,mystep)).toString(16).padStart(2,"0")
        +"} \\textsf{"+text[sub]+"}"
        
        pre_result_html += text[sub].replace("\\color{","<a style=\"color: ").replace("} \\textsf{","\">").replace(" \\space "," ").replace("}","")+ "</a>"
    }
    
    the_text = pre_result.replace("$%s0", text.join(""))
    dom.preview.innerHTML = pre_result_html
})

dom.copy.addEventListener("click",()=>{
    navigator.clipboard.writeText(the_text)
})
