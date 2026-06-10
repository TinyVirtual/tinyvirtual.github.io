let div = document.getElementById("div");
let out = document.getElementById("out");
let prev = document.getElementById("preview")
let fields = [];
let alignments = [];
let table = null;
let first = true;
let addbut = null;
let label = document.querySelector("#a_label")

function tableMDtoHTML(md){
    let text = md.join("\n")
    let table = marked.parse(text)
    let div = document.createElement("div")
    div.innerHTML = table;
    
    if(div.querySelector('table') && div.querySelector('table').querySelector('tbody') ){
        [...div.querySelector('table').querySelector('tbody').children].forEach((a,i)=>{

                [...a.children].forEach((c,__i)=>{
                    c.addEventListener('dblclick',ev=>{
                        c.contentEditable = true
                    })
                    c.addEventListener('blur',e=>{
                        c.removeAttribute('contenteditable')
                        
                    })
                })

                
                let delButton = document.createElement("button")
                delButton.classList.add("trash","bg-transparent")

                delButton.addEventListener('click',()=>{
                    a.remove()
                })
                a.appendChild(delButton)


        })
    }
    return div
}

function tableHTMLtoMD(tableNode){
    if(!tableNode){ return ''}

    let head = tableNode.querySelector('thead')
    let body = tableNode.querySelector('tbody')

    let md_head = ''
    let md_sep = ''
    let md_body = ''

    if(head){
        md_head = "| "+[...head.children][0].innerText.replaceAll('\t',' | ')+" |";

        md_sep += '| ';
        [...head.children[0].children].forEach(a=>{
            let alignments = {
                'left':':---',
                'right':'---:',
                'center':'---'
            }
            md_sep += alignments[(a.align || 'center')]+ " | "
        })
    }
    if(body){
        for(let tr of [...body.children]){
            md_body += "| "+[...tr.cells].map(l=>l.innerText).filter(l=>l.trim()).map(l=>l.replaceAll('|','\\|')).join(' | ')+" |\n"
        }
    }

    return md_head+'\n'+md_sep+'\n'+md_body
}


function notify(message){
    alert(message)
}

document.getElementById("copy").addEventListener("click",()=>{
    if(typeof navigator.clipboard === 'undefined'){
        out.innerHTML = tableHTMLtoMD(table)
        out.select()
        out.setSelectionRange(0, 0xFFFF_FFFF)
        document.execCommand("copy")
    } else { 
        navigator.clipboard.writeText(tableHTMLtoMD(table)) 
    }
})




document.getElementById("gen").addEventListener("click",()=>{
    let column_amount = Number(document.querySelector('input#qnt').value)
    if(column_amount > 100){
        notify("ARE YOU CRAZY?!?! "+column_amount+" COLUMNS?!?!?! ARE YOU TRYING TO CRASH YOUR DEVICE??!?!")
        document.querySelector('input[type="number"]').value = "5"
        return
    }
    if(column_amount > 25){
        notify("Note: "+column_amount+" is too much columns! This will affect your performance and make things more complicated, if you are making a database, please use SQL instead!")
    }
    for(let i = 0; i < (column_amount||2); i++){
        let d = document.createElement("div")
        d.classList.add("input-wrapper","direction-vertical","align-center")

        let e = document.createElement("input");
        e.type = "text";
        e.placeholder = i+1

        let s = document.createElement("select")
        s.innerHTML = '<option value="center">Center</option><option value="left">Left</option><option value="right">Right</option>'

        let my_i = i
        e.addEventListener('keydown',ev=>{
            if(ev.code == "Backspace" && !e.value){
                ev.preventDefault()
                fields[(my_i+fields.length-1)%fields.length].e.focus()
            };
            if(ev.code == "Tab" && !ev.shiftKey){
                ev.preventDefault()
                fields[(my_i+1)%fields.length].e.focus()
            }
        })

        fields.push({
            e: e,
            d: d,
            s: s
        });
        d.appendChild(e)
        d.appendChild(s)
        div.appendChild(d)
    }
    if(label){ label.textContent = "Create the header"}

    table = document.createElement('table')
    table.innerHTML='<thead></thead><tbody></tbody>';
    [...prev.children].forEach(a=>a.remove())
    prev.appendChild(table)

    addbut = document.createElement("button");
    addbut.innerText = "Add";


    addbut.addEventListener("click",()=>{
        let tr = document.createElement('tr')
        let __i = 0
        for(let f of fields){
            let th
            if(first){ 
                if(!f.e.value){
                    notify("Table head cannot be empty!")
                    return
                }
                f.e.placeholder = f.e.value
                th = document.createElement('th')
                alignments.push(f.s.value)
                th.align = f.s.value
            } else {
                th = document.createElement('td')
                th.align = alignments[__i]
            }



            th.textContent = f.e.value || "null"
            tr.appendChild(th)
            f.e.value = ""

            __i++
        };

        [...tr.children].forEach((c,__i)=>{
            c.addEventListener('dblclick',ev=>{
                c.contentEditable = true
            })
            c.addEventListener('blur',e=>{
                c.removeAttribute('contenteditable')
            })
        })
        
        
        if(first){
            first = false
            fields.forEach(a=>a.s.remove())
            table.querySelector('thead').appendChild(tr)
            
            if(label){ label.textContent = "Now you can fill the table with data"}
        } else {
            table.querySelector('tbody').appendChild(tr)

            
            let delButton = document.createElement("button")
            delButton.classList.add("trash","bg-transparent")

            delButton.addEventListener('click',()=>{
                tr.remove()
            })
            tr.appendChild(delButton)
        }
    })
    div.appendChild(addbut)
    document.querySelector("div#starter_div").hidden = true
    
})


document.getElementById("import-button").addEventListener("click",()=>{
    let _table = document.getElementById("import").value.split('\n')

    let head = _table[0].split(/(?<!\\)\|/g).filter(l=>!!l.trim())
    alignments = _table[1].split(/(?<!\\)\|/g).map(l=>{
        let u = l.trim()
        if(!u) return
        if (u.startsWith(':') && u.endsWith(':')) return 'center'
        if (u.startsWith(':')) return 'left'
        if (u.endsWith(':')) return 'right'
        return 'center'
    }).filter(l=>l)

    
    for(let i = 0; i < head.length; i++){
        let d = document.createElement("div")
        d.classList.add("input-wrapper","direction-vertical","align-center")

        let e = document.createElement("input");
        e.type = "text";
        e.placeholder = head[i].trim()

        let my_i = i
        e.addEventListener('keydown',ev=>{
            if(ev.code == "Backspace" && !e.value){
                ev.preventDefault()
                fields[(my_i+fields.length-1)%fields.length].e.focus()
            };
            if(ev.code == "Tab" && !ev.shiftKey){
                ev.preventDefault()
                fields[(my_i+1)%fields.length].e.focus()
            }
        })

        fields.push({
            e: e,
            d: d,
            s: null
        });
        d.appendChild(e)
        div.appendChild(d)
    }
    
    [...prev.children].forEach(a=>a.remove())
    table = tableMDtoHTML(_table)
    prev.appendChild(table)

    addbut = document.createElement("button");
    addbut.innerText = "Add";
    addbut.addEventListener("click",()=>{
        let tr = document.createElement('tr')
        let __i = 0
        for(let f of fields){
            let th = document.createElement('td')
            th.textContent = f.e.value || "null"
            tr.appendChild(th)
            f.e.value = ""
            th.align = alignments[__i]
            __i++
        };

        [...tr.children].forEach((c,__i)=>{
            c.addEventListener('dblclick',ev=>{
                c.contentEditable = true
            })
            c.addEventListener('blur',e=>{
                c.removeAttribute('contenteditable')
                
            })
        })
        
        
        table.querySelector('tbody').appendChild(tr)

        
        let delButton = document.createElement("button")
        delButton.classList.add("trash","bg-transparent")

        delButton.addEventListener('click',()=>{
            tr.remove()
        })
        tr.appendChild(delButton)
        
    })
    div.appendChild(addbut)
    if(first){
        document.querySelector("div#starter_div").hidden = true
        if(label){ label.textContent = "Now you can fill the table with data"}
    }
    first = false
})


document.getElementById("reset").addEventListener("click",()=>window.location.reload())

document.addEventListener('keydown',e=>{
    if (e.code == "Enter"){
        if(!document.querySelector('*[contenteditable]')){
            if(addbut){
                addbut.click()
                if(fields[0]){
                    fields[0].e.focus()
                }
            } else if(first && !div.hidden){
                e.preventDefault()
                document.getElementById("gen").click()
            }
        } else {
            document.querySelector('*[contenteditable]').contentEditable = false
        }
    }
})
