function hash_key(key=""){
    if (key.length > 52){alert("Key length is too big, maximum alowed is 52"); return 1}
    key = key.split("")
    let vals = []
    key.forEach( (k) => { vals.push(k.charCodeAt(0))})
    let pre_final = 1
    for(i in vals){
      if (i%2 == 0){
        pre_final *= Math.floor(vals[i]/1.5)
      } else {
        pre_final = pre_final ^ vals[i]
      }
    }
    return pre_final % (4096)
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

    for(i in text_array){
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

let elements = {
    encode: {
        text: document.getElementById("encode_text"),
        key: document.getElementById("encode_key"),
        button: document.getElementById("encode_button"),
        res_div: document.getElementById("encode_result_div"),
        result: document.getElementById("encode_result"),
        func: encode_text
    },
    decode: {
        text: document.getElementById("decode_text"),
        key: document.getElementById("decode_key"),
        button: document.getElementById("decode_button"),
        res_div: document.getElementById("decode_result_div"),
        result: document.getElementById("decode_result"),
        func: decode_text
    }
}
function add_logic(encdec) {
    encdec.result.onclick = () => {
        console.log("click")
        var alert_overlay = document.getElementById("alert_thingy")
          navigator.clipboard.writeText(encdec.result.value)
          .then(() => {
            alert_overlay.style.display = "flex"
            setTimeout(()=>{alert_overlay.style.display = "none"},1000)
          })
          .catch(err => {
            alert("Fatar error: "+err.message)
          });
    }
    encdec.button.addEventListener('click',function(e) {
        let key = encdec.key.value
        let text = encdec.text.value

        let encripted = encdec.func(text, key)
        encripted = encripted.replaceAll("\u100a","\n")
        encdec.res_div.style.display = "flex"
        encdec.result.value = encripted
    })
}
add_logic(elements.encode)
add_logic(elements.decode)
